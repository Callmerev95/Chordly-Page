export type NewsCategory = 'release' | 'announcement';

export interface NewsUpdate {
  id: string;
  category: NewsCategory;
  categoryLabel: string;
  dateLabel: string;
  versionTag?: string;
  platformScope: string;
  title: string;
  summary: string;
  highlights: string[];
}

/**
 * Placeholder editorial feed for /news.
 * Replace or extend these entries as new Chordly builds and milestones ship.
 */
export const NEWS_UPDATES: NewsUpdate[] = [
  {
    id: 'release-v1-9-5-sample',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'November 25, 2026',
    versionTag: 'v1.9.5',
    platformScope: 'Android · Wear OS',
    title: 'Sample release notes: USB DAC clock stabilization and lyrics timing refinements.',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This placeholder release entry outlines hypothetical audio routing fixes, reduced seek latency on external DACs, and smoother syllable-synced lyric transitions.',
    highlights: [
      'Refined exclusive USB Audio Class 2.0 handshake to prevent sample-rate drops across 96 kHz and 192 kHz tracks.',
      'Improved line-by-line romanization alignment across LRCLIB, Musixmatch, and KuGou fallback providers.',
      'Reduced cold-start queue hydration overhead when syncing recently played playlists with Wear OS.',
    ],
  },
  {
    id: 'announcement-web-player-bridge',
    category: 'announcement',
    categoryLabel: 'Announcement',
    dateLabel: 'November 14, 2026',
    platformScope: 'Web Player',
    title: 'Sample announcement: Web Player extension bridge and cross-device playback roadmap.',
    summary:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This temporary announcement summarizes upcoming browser extension bridge updates and faster queue handoffs between desktop and mobile sessions.',
    highlights: [
      'Streamlined pairing flow for Chromium and Firefox bridges on web-player.chordly.my.id.',
      'Added lightweight session recovery for Listen Together rooms following temporary network drops.',
      'Planned preview of keyboard-first media shortcuts and compact mini-player controls in upcoming builds.',
    ],
  },
  {
    id: 'release-v1-9-4-sample',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'October 28, 2026',
    versionTag: 'v1.9.4',
    platformScope: 'Android 8.0+ · Wear OS',
    title: 'Sample release notes: 7-band equalizer presets, Wear OS speaker playback, and frosted UI.',
    summary:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Placeholder notes highlighting hardware audio controls, lightweight watch streaming, and adaptive now-playing artwork rendering.',
    highlights: [
      'Introduced per-output 7-band parametric EQ profiles saved automatically per wired or Bluetooth device.',
      'Trimmed the standalone Wear OS companion package to ~4.5 MB with direct watch speaker fallback.',
      'Polished frosted blur surfaces and low-power OLED dark rendering during extended lyrics sessions.',
    ],
  },
  {
    id: 'announcement-lyrics-providers',
    category: 'announcement',
    categoryLabel: 'Announcement',
    dateLabel: 'October 09, 2026',
    platformScope: 'All Platforms',
    title: 'Sample announcement: Expanding synced lyrics coverage across twelve independent providers.',
    summary:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Dummy update detailing provider fallback ordering, manual millisecond offset tuning, and multilingual script detection.',
    highlights: [
      'Unified caching layer prioritizes word-level and syllable-timed lyric tracks before plain-text fallbacks.',
      'Exposed manual +/- millisecond sync offsets stored locally per track for live recording mismatches.',
      'Documented open-source provider interfaces in the public repository for community contributors.',
    ],
  },
  {
    id: 'release-v1-9-0-sample',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'September 18, 2026',
    versionTag: 'v1.9.0',
    platformScope: 'Android',
    title: 'Sample release notes: Direct USB DAC passthrough and local Replay metrics milestone.',
    summary:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. Early milestone placeholder covering lossless local FLAC playback, encrypted Google Drive backup, and on-device Replay summaries.',
    highlights: [
      'Added direct PCM passthrough bypassing Android system resamplers on supported external DAC dongles.',
      'Added optional private app-folder backup export and local JSON archive portability.',
      'Launched privacy-preserving on-device Replay listening breakdowns with zero external analytics.',
    ],
  },
];
