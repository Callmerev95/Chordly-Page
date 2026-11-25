export type NewsCategory = 'release' | 'announcement';

export interface NewsEntry {
  id: string;
  category: NewsCategory;
  categoryLabel: string;
  dateLabel: string;
  versionTag?: string;
  platformScope: string;
  title: string;
  summary: string;
  highlights: string[];
  url?: string;
}

export interface ReleaseAsset {
  name: string;
  size: number;
  downloadCount: number;
  downloadUrl: string;
}

export interface ReleaseInfo {
  tag: string;
  name: string;
  body: string;
  publishedAt: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
}

const RELEASES_API_URL =
  'https://api.github.com/repos/Callmerev95/Chordly-release/releases?per_page=100';
const CACHE_TTL_MS = 10 * 60 * 1000;
const SESSION_KEY = 'chordly:releases:v1';

let memoryCache: { at: number; data: ReleaseInfo[] } | null = null;
let inflight: Promise<ReleaseInfo[]> | null = null;

function normalizeTag(raw: string): string {
  const tag = raw.trim();
  return tag.startsWith('v') || tag.startsWith('V') ? tag : `v${tag}`;
}

function coerceAsset(item: unknown): ReleaseAsset | null {
  if (!item || typeof item !== 'object') return null;
  const asset = item as {
    name?: unknown;
    size?: unknown;
    download_count?: unknown;
    browser_download_url?: unknown;
  };
  if (typeof asset.name !== 'string' || typeof asset.browser_download_url !== 'string') {
    return null;
  }
  return {
    name: asset.name,
    size: typeof asset.size === 'number' && Number.isFinite(asset.size) ? asset.size : 0,
    downloadCount:
      typeof asset.download_count === 'number' && Number.isFinite(asset.download_count)
        ? asset.download_count
        : 0,
    downloadUrl: asset.browser_download_url,
  };
}

function coerceRelease(item: unknown): ReleaseInfo | null {
  if (!item || typeof item !== 'object') return null;
  const release = item as {
    tag_name?: unknown;
    name?: unknown;
    body?: unknown;
    published_at?: unknown;
    html_url?: unknown;
    draft?: unknown;
    prerelease?: unknown;
    assets?: unknown;
  };
  if (release.draft === true || release.prerelease === true) return null;
  if (typeof release.tag_name !== 'string' || !release.tag_name.trim()) return null;

  const tag = normalizeTag(release.tag_name);
  const assets = Array.isArray(release.assets) ? release.assets : [];

  return {
    tag,
    name:
      typeof release.name === 'string' && release.name.trim()
        ? release.name.trim()
        : `Chordly ${tag}`,
    body: typeof release.body === 'string' ? release.body : '',
    publishedAt: typeof release.published_at === 'string' ? release.published_at : '',
    htmlUrl: typeof release.html_url === 'string' ? release.html_url : '',
    assets: assets
      .map(coerceAsset)
      .filter((asset): asset is ReleaseAsset => asset !== null),
  };
}

function readSessionCache(): { at: number; data: ReleaseInfo[] } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at?: unknown; data?: unknown };
    if (
      typeof parsed?.at === 'number' &&
      Array.isArray(parsed.data) &&
      Date.now() - parsed.at < CACHE_TTL_MS
    ) {
      return { at: parsed.at, data: parsed.data as ReleaseInfo[] };
    }
  } catch {
    // sessionStorage unavailable or malformed cache — ignore.
  }
  return null;
}

function writeSessionCache(value: { at: number; data: ReleaseInfo[] }): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } catch {
    // Quota or private-mode restrictions — memory cache still applies.
  }
}

export async function fetchReleases(signal?: AbortSignal): Promise<ReleaseInfo[]> {
  if (memoryCache && Date.now() - memoryCache.at < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  const cached = readSessionCache();
  if (cached) {
    memoryCache = cached;
    return cached.data;
  }

  // Dedupe concurrent callers (e.g. install + open-source sections on the home
  // page) so a single request reaches GitHub and populates the shared cache.
  if (inflight) {
    return inflight;
  }

  inflight = (async () => {
    const response = await fetch(RELEASES_API_URL, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) {
      throw new Error(`GitHub releases request failed (${response.status})`);
    }

    const json: unknown = await response.json();
    if (!Array.isArray(json)) {
      throw new Error('Unexpected GitHub releases payload');
    }

    const data = json
      .map(coerceRelease)
      .filter((release): release is ReleaseInfo => release !== null)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

    memoryCache = { at: Date.now(), data };
    writeSessionCache(memoryCache);
    return data;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

function stripMarkdownInline(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractChangelogHighlights(body: string): string[] {
  const lines = body.split(/\r?\n/);
  const highlights: string[] = [];
  let inChangelog = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const heading = /^#{2,6}\s+(.*)$/.exec(line);
    if (heading) {
      inChangelog = heading[1].toLowerCase().includes('changelog');
      continue;
    }
    if (!inChangelog) continue;
    const bullet = /^[-*+]\s+(.*)$/.exec(line);
    if (!bullet) continue;
    const text = stripMarkdownInline(bullet[1]);
    if (text) highlights.push(text);
  }

  if (highlights.length > 0) return highlights;

  for (const rawLine of lines) {
    const bullet = /^[-*+]\s+(.*)$/.exec(rawLine.trim());
    if (!bullet) continue;
    const text = stripMarkdownInline(bullet[1]);
    if (text) highlights.push(text);
  }
  return highlights;
}

export function extractSummary(body: string, title: string): string {
  const blocks = body
    .replace(/<[^>]+>/g, '')
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (/^#{1,6}\s/.test(block)) continue;
    if (/^!\[/.test(block)) continue;
    if (/^[-*+]\s/.test(block)) continue;
    const text = stripMarkdownInline(block);
    if (!text) continue;
    if (text.toLowerCase() === title.toLowerCase()) continue;
    return text;
  }
  return '';
}

export function derivePlatformScope(assets: ReleaseAsset[]): string {
  const names = assets.map((asset) => asset.name.toLowerCase());
  const scopes: string[] = [];

  if (names.some((name) => /^app-.*\.apk$/.test(name))) scopes.push('Android');
  if (names.some((name) => name.includes('wear') && name.endsWith('.apk'))) scopes.push('Wear OS');
  if (names.some((name) => name.startsWith('tv-') && name.endsWith('.apk'))) {
    scopes.push('Android TV');
  }

  return scopes.length > 0 ? scopes.join(' · ') : 'All Platforms';
}

export function formatReleaseDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatMegabytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function findAndroidApk(assets: ReleaseAsset[]): ReleaseAsset | undefined {
  return (
    assets.find((asset) => /^app-.*universal.*\.apk$/i.test(asset.name)) ||
    assets.find((asset) => /^app-.*\.apk$/i.test(asset.name))
  );
}

export function findWearApk(assets: ReleaseAsset[]): ReleaseAsset | undefined {
  return assets.find((asset) => /wear.*\.apk$/i.test(asset.name));
}

export function findTvApk(assets: ReleaseAsset[]): ReleaseAsset | undefined {
  return (
    assets.find((asset) => /^tv-.*universal.*\.apk$/i.test(asset.name)) ||
    assets.find((asset) => /^tv-.*\.apk$/i.test(asset.name) || /android-?tv.*\.apk$/i.test(asset.name))
  );
}

export function mapReleaseToNewsEntry(release: ReleaseInfo): NewsEntry {
  const apkAssets = release.assets.filter((asset) => asset.name.toLowerCase().endsWith('.apk'));
  const isRelease = apkAssets.length > 0;
  const title = release.name || `Chordly ${release.tag}`;
  const summary =
    extractSummary(release.body, title) ||
    `${title} — read the full release notes on GitHub.`;

  return {
    id: `release-${release.tag.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`,
    category: isRelease ? 'release' : 'announcement',
    categoryLabel: isRelease ? 'Release' : 'Announcement',
    dateLabel: formatReleaseDate(release.publishedAt),
    versionTag: isRelease ? release.tag : undefined,
    platformScope: derivePlatformScope(release.assets),
    title,
    summary,
    highlights: extractChangelogHighlights(release.body),
    url: release.htmlUrl || undefined,
  };
}

export function mapReleasesToNews(releases: ReleaseInfo[]): NewsEntry[] {
  return releases.map(mapReleaseToNewsEntry);
}

export function latestReleaseTag(releases: ReleaseInfo[]): string {
  return releases.length > 0 ? releases[0].tag : '';
}

export function sumDownloadCounts(releases: ReleaseInfo[]): number {
  return releases.reduce(
    (total, release) =>
      total + release.assets.reduce((sum, asset) => sum + asset.downloadCount, 0),
    0
  );
}
