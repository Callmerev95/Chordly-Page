export type FeatureCategoryId = 'playback' | 'connectivity' | 'experience' | 'controls';

export type FeatureFilterId = 'all' | FeatureCategoryId;

export interface FeatureBullet {
  id: string;
  label: string;
  detail: string;
  credit?: string;
}

export interface FeatureCategory {
  id: FeatureCategoryId;
  indexLabel: string;
  title: string;
  subtitle: string;
  accent: string;
  colSpan: string;
  expandedDesc: string;
  specs: { label: string; value: string }[];
  items: FeatureBullet[];
}

export const LYRICS_PROVIDERS = [
  'lrc.red',
  'BiniLyrics',
  'BetterLyrics',
  'PaxSenix',
  'LyricsPlus',
  'SimpMusic',
  'Unison',
  'Megalobiz',
  'KuGou',
  'LRCLIB',
  'Musixmatch',
  'Genius',
] as const;

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: 'playback',
    indexLabel: '01',
    title: 'Playback',
    subtitle: 'Lossless streams, gapless crossfade, offline metadata, and fluid lyric motion.',
    accent: '#FF2D55',
    colSpan: 'col-span-1 lg:col-span-7',
    expandedDesc:
      'Chordly handles full YouTube Music search and browsing while prioritizing Hi-Res FLAC and ALAC streams from configured module sources, with YouTube Music as seamless fallback. Local audio libraries, embedded-tag offline downloads, foreground media sessions, gapless transitions, and beat-matched Automix work together in a unified playback engine.',
    specs: [
      { label: 'Lossless Formats', value: 'FLAC / ALAC' },
      { label: 'True Crossfade', value: '0–12s Adjustable' },
      { label: 'Catalog Fallback', value: 'YouTube Music' },
      { label: 'Session Layer', value: 'Foreground Media' },
    ],
    items: [
      {
        id: 'ytm-catalog',
        label: 'YouTube Music catalog',
        detail: 'Search, browse and play anything available on YouTube Music.',
      },
      {
        id: 'hires-lossless',
        label: 'Hi-Res lossless audio',
        detail: 'FLAC/ALAC from a configured module source, with YouTube Music as fallback.',
      },
      {
        id: 'gapless-crossfade',
        label: 'Gapless playback',
        detail: 'Gapless playback with true crossfade, adjustable 0–12s.',
      },
      {
        id: 'automix-beta',
        label: 'Automix [Beta]',
        detail: 'DJ-style transitions with beat-matching and tempo-stretching.',
      },
      {
        id: 'offline-downloads',
        label: 'Offline downloads',
        detail: 'Save tracks with embedded metadata.',
      },
      {
        id: 'local-library',
        label: 'Local music library',
        detail: 'Local music library integration.',
      },
      {
        id: 'background-playback',
        label: 'Background playback',
        detail: 'Background playback via a proper foreground media session.',
      },
      {
        id: 'apple-lyrics-motion',
        label: 'Apple-like lyrics animation',
        detail: 'Fluid line and word phrasing motion across the lyrics stage.',
        credit: 'Credit to binimum',
      },
    ],
  },
  {
    id: 'connectivity',
    indexLabel: '02',
    title: 'Connectivity & Accounts',
    subtitle: 'Your Google library, Spotify playlists, live Discord status, scrobbling, and modular sources.',
    accent: '#7C5CFF',
    colSpan: 'col-span-1 lg:col-span-5',
    expandedDesc:
      'Connect your listening ecosystem without locking into a single provider. Sign in with Google for personalized YouTube Music shelves, link Spotify to stream your playlists and Liked Songs, broadcast live track progress via Discord Rich Presence, scrobble plays to Last.fm and ListenBrainz, and manage module sources with built-in health checks.',
    specs: [
      { label: 'Personalization', value: 'Google Account' },
      { label: 'Library Bridge', value: 'Spotify Playlists' },
      { label: 'Live Status', value: 'Discord RPC' },
      { label: 'Scrobblers', value: 'Last.fm & ListenBrainz' },
    ],
    items: [
      {
        id: 'google-signin',
        label: 'Google account sign-in',
        detail: 'Sign in with your Google account for personalized content.',
      },
      {
        id: 'spotify-integration',
        label: 'Spotify integration',
        detail: 'Connect your account to play your playlists and Liked Songs.',
      },
      {
        id: 'discord-rpc',
        label: 'Discord Rich Presence',
        detail: 'In-app login, live track/artist/album and progress.',
      },
      {
        id: 'scrobbling',
        label: 'Scrobbling',
        detail: 'Scrobbling to Last.fm and ListenBrainz.',
      },
      {
        id: 'pluggable-sources',
        label: 'Pluggable sources',
        detail: 'Add, edit, test and health-check module sources.',
      },
    ],
  },
  {
    id: 'experience',
    indexLabel: '03',
    title: 'Experience',
    subtitle: 'Motion album canvases, 12+ word-synced lyric providers, and Haze frosted-glass Material 3.',
    accent: '#FF9A62',
    colSpan: 'col-span-1 lg:col-span-5',
    expandedDesc:
      'Every screen responds to what is playing. Animated album canvases bring motion artwork to the now-playing view, word- and syllable-synced lyrics pull from twelve community and catalog providers, and Haze powers Telegram-style frosted translucent bars tinted by a Material 3 palette extracted directly from cover art.',
    specs: [
      { label: 'Now Playing', value: 'Animated Canvas' },
      { label: 'Lyrics Sync', value: 'Word & Syllable' },
      { label: 'Providers', value: `${LYRICS_PROVIDERS.length} Sources` },
      { label: 'Surface Engine', value: 'Haze + Material 3' },
    ],
    items: [
      {
        id: 'animated-canvas',
        label: 'Animated album canvas',
        detail: 'Motion artwork on the now-playing screen.',
      },
      {
        id: 'word-synced-lyrics',
        label: 'Word-synced lyrics',
        detail: 'Word/syllable-level highlighting from multiple sources.',
      },
      {
        id: 'lyrics-providers',
        label: 'Lyrics providers',
        detail: `Multi-source sync across ${LYRICS_PROVIDERS.slice(0, -1).join(', ')} and ${LYRICS_PROVIDERS[LYRICS_PROVIDERS.length - 1]}.`,
        credit: 'Credit to all 12 provider maintainers',
      },
      {
        id: 'dynamic-theming',
        label: 'Dynamic, artwork-driven theming',
        detail: 'Material palette extracted from album art.',
      },
      {
        id: 'frosted-glass-ui',
        label: 'Frosted-glass UI',
        detail: 'Telegram-style translucent bars via Haze, Material 3 theming.',
      },
    ],
  },
  {
    id: 'controls',
    indexLabel: '04',
    title: 'Controls & Tweaks',
    subtitle: 'Per-network quality ceilings, variable speed, bit-perfect USB DAC output, and live stream stats.',
    accent: '#4ADE80',
    colSpan: 'col-span-1 lg:col-span-7',
    expandedDesc:
      'Built for listeners who inspect every stage of the signal path. Set independent bandwidth ceilings for Wi-Fi and mobile data, dial playback speed from 0.5× to 2.0× with skip silence, configure sleep timers, hook into the system equalizer, route bit-perfect audio directly to a USB DAC, and inspect real-time codec telemetry.',
    specs: [
      { label: 'Playback Speed', value: '0.5×–2.0×' },
      { label: 'USB Output', value: 'Bit-Perfect DAC' },
      { label: 'Network Rules', value: 'Wi-Fi / Cellular' },
      { label: 'Diagnostics', value: 'Stats for Nerds' },
    ],
    items: [
      {
        id: 'per-network-quality',
        label: 'Per-network audio quality',
        detail: 'Separate quality ceilings for Wi-Fi and mobile data.',
      },
      {
        id: 'speed-skip-silence',
        label: 'Playback speed & skip silence',
        detail: 'Playback speed control (0.5×–2.0×) and skip silence.',
      },
      {
        id: 'sleep-timer',
        label: 'Sleep timer',
        detail: 'Fixed presets or "stop after this track".',
      },
      {
        id: 'system-equalizer',
        label: 'System equalizer integration',
        detail: 'Native routing to the Android system equalizer panel.',
      },
      {
        id: 'bit-perfect-usb',
        label: 'Bit-Perfect USB exclusive output',
        detail: "Sends lossless tracks to a USB DAC unchanged, at each track's own rate and bit depth.",
        credit: 'Thanks to Mornye for the reference',
      },
      {
        id: 'stats-for-nerds',
        label: 'Stats for nerds',
        detail: 'Codec, bit depth, sample rate, and more on the now-playing screen.',
      },
    ],
  },
];

export const FEATURE_FILTERS: { id: FeatureFilterId; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'playback', label: 'Playback' },
  { id: 'connectivity', label: 'Connectivity & Accounts' },
  { id: 'experience', label: 'Experience' },
  { id: 'controls', label: 'Controls & Tweaks' },
];

export function filterFeatureCategories(
  categories: FeatureCategory[],
  filter: FeatureFilterId
): FeatureCategory[] {
  if (filter === 'all') {
    return categories;
  }
  return categories.filter((category) => category.id === filter);
}

export function getTotalFeatureCount(categories: FeatureCategory[]): number {
  return categories.reduce((sum, category) => sum + category.items.length, 0);
}
