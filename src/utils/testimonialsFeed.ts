import type { Testimonial } from '../data/testimonials';

const ISSUES_URL =
  'https://api.github.com/repos/Callmerev95/Chordly-Page/issues?labels=published&state=open&per_page=100';
const CACHE_TTL_MS = 10 * 60 * 1000;
const SESSION_KEY = 'chordly:published-testimonials:v1';

export interface PublishedIssueInput {
  number: number;
  body: string | null;
  html_url: string;
}

let memoryCache: { at: number; data: Testimonial[] } | null = null;
let inflight: Promise<Testimonial[]> | null = null;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function cleanValue(raw?: string): string {
  if (!raw) return '';
  const value = raw.trim();
  if (!value || /^_?no response_?$/i.test(value)) return '';
  return value.replace(/\s+/g, ' ').trim();
}

function splitSections(body: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let current: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (current !== null) {
      sections[current.toLowerCase()] = buffer.join('\n').trim();
    }
    buffer = [];
  };

  for (const line of lines) {
    const heading = /^#{2,6}\s+(.*)$/.exec(line.trim());
    if (heading) {
      flush();
      current = heading[1].trim();
      continue;
    }
    if (current !== null) buffer.push(line);
  }
  flush();
  return sections;
}

function rawSection(sections: Record<string, string>, needle: string): string {
  const key = Object.keys(sections).find((name) => name.includes(needle));
  return key ? sections[key] : '';
}

function deriveInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

export function mapIssueToTestimonial(issue: PublishedIssueInput): Testimonial | null {
  const sections = splitSections(issue.body ?? '');

  const name = cleanValue(rawSection(sections, 'display name'));
  const role = cleanValue(rawSection(sections, 'platform')) || 'Listener';
  const quote = cleanValue(rawSection(sections, 'your review'));
  const profileRaw = cleanValue(rawSection(sections, 'profile link'));
  const consent = /\[x\]/i.test(rawSection(sections, 'consent'));

  if (!name || !quote || !consent) return null;

  const profileUrl = profileRaw && isHttpUrl(profileRaw) ? profileRaw : undefined;

  return {
    id: `gh-${issue.number}`,
    quote,
    name,
    role,
    initials: deriveInitials(name),
    profileUrl,
    sourceUrl: issue.html_url,
    verified: true,
  };
}

export function mergeTestimonials(
  staticList: Testimonial[],
  liveList: Testimonial[]
): Testimonial[] {
  const seen = new Set<string>();
  const merged: Testimonial[] = [];

  for (const item of [...liveList, ...staticList]) {
    const key = (item.sourceUrl || item.name).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function readSessionCache(): { at: number; data: Testimonial[] } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at?: unknown; data?: unknown };
    if (
      typeof parsed?.at === 'number' &&
      Array.isArray(parsed.data) &&
      Date.now() - parsed.at < CACHE_TTL_MS
    ) {
      return { at: parsed.at, data: parsed.data as Testimonial[] };
    }
  } catch {
    // sessionStorage unavailable or malformed cache — ignore.
  }
  return null;
}

function writeSessionCache(value: { at: number; data: Testimonial[] }): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } catch {
    // Quota or private-mode restrictions — memory cache still applies.
  }
}

export async function fetchPublishedTestimonials(signal?: AbortSignal): Promise<Testimonial[]> {
  if (memoryCache && Date.now() - memoryCache.at < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  const cached = readSessionCache();
  if (cached) {
    memoryCache = cached;
    return cached.data;
  }

  if (inflight) {
    return inflight;
  }

  inflight = (async () => {
    const response = await fetch(ISSUES_URL, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) {
      throw new Error(`GitHub issues request failed (${response.status})`);
    }

    const json: unknown = await response.json();
    if (!Array.isArray(json)) {
      throw new Error('Unexpected GitHub issues payload');
    }

    const data = json
      .filter((item) => {
        return (
          item &&
          typeof item === 'object' &&
          !(item as { pull_request?: unknown }).pull_request &&
          typeof (item as { number?: unknown }).number === 'number' &&
          typeof (item as { html_url?: unknown }).html_url === 'string'
        );
      })
      .map((item) => {
        const issue = item as {
          number: number;
          html_url: string;
          body?: unknown;
        };
        return mapIssueToTestimonial({
          number: issue.number,
          html_url: issue.html_url,
          body: typeof issue.body === 'string' ? issue.body : '',
        });
      })
      .filter((testimonial): testimonial is Testimonial => testimonial !== null);

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
