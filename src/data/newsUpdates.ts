import type { NewsEntry } from '../utils/releases';

export type { NewsCategory, NewsEntry as NewsUpdate } from '../utils/releases';

/**
 * Static fallback feed for /news, baked into the prerendered HTML for SEO and
 * offline use. The page replaces this at runtime with live GitHub releases from
 * the public Chordly-release repository, so new changelogs appear automatically.
 */
export const NEWS_UPDATES: NewsEntry[] = [
  {
    id: 'release-v1-9-5',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'November 25, 2026',
    versionTag: 'v1.9.5',
    platformScope: 'Android · Wear OS · Android TV',
    title: 'Chordly v1.9.5',
    summary:
      'Chordly v1.9.5 delivers a broad feature wave — Replay Year and Best Part, Google Drive backup with cross-device Replay sync, a dedicated Radio tab, higher-quality YouTube Premium audio, richer queue and playlist management, and a lighter on-demand Automix model — together with polish to scrolling, glass performance, and player theming.',
    highlights: [
      'Replay & Best Part: Replay Year and Best Part highlights.',
      'Google Drive backup: back up your library and sync Replay across devices.',
      'Radio tab: a dedicated Radio tab for endless listening.',
      'Audio quality: YouTube Premium ~256 kbps audio, plus an option to keep liked songs downloaded.',
      'Automix: on-demand separation model for a smaller APK, with artwork transitions and on-demand loading.',
      'Lyrics & credits: animated lyrics share, YouTube Music timed lyrics, and song credits.',
      'Player: Apple Music–style player button animations, theme translucency, and ambient tint.',
      'Queue management: swipe to remove, undo, and multi-select in the queue.',
      'Quick Settings tile: control playback straight from the notification shade.',
      'Sleep timer: audio gently fades out before stopping.',
    ],
    url: 'https://github.com/Callmerev95/Chordly-release/releases/tag/v1.9.5',
  },
  {
    id: 'release-v1-9-4',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'November 10, 2026',
    versionTag: 'v1.9.4',
    platformScope: 'Android',
    title: 'Chordly v1.9.4',
    summary:
      'Chordly v1.9.4 brings new customization options, audio playback enhancements, interface refinements, and overall performance improvements. It also resolves community addon warnings, and introduces background downloads for app updates.',
    highlights: [
      'Content Preferences: hide Recents, Videos, Top Picks, and Moods from Home, plus square music video thumbnails.',
      'Automix Overview: preview transition waveform, BPM, key, and beat markers from the song actions menu.',
      'Player Themes: choose Default, Simple, or Legacy player themes with adaptive blend effects.',
      'Full-Screen Artwork: full-screen album and playlist covers with toggleable blend effects.',
      'Performance Glass Mode: optimized blur rendering with reduced GPU/CPU overhead.',
      'Bit-Perfect Improvements: DAC idle-release with suspend/resume and dropout prevention.',
      'Background Update Downloads: APK downloads run via native DownloadManager with notifications.',
    ],
    url: 'https://github.com/Callmerev95/Chordly-release/releases/tag/v1.9.4',
  },
  {
    id: 'release-v1-9-3',
    category: 'release',
    categoryLabel: 'Release',
    dateLabel: 'November 10, 2026',
    versionTag: 'v1.9.3',
    platformScope: 'Android',
    title: 'Chordly v1.9.3',
    summary:
      'Chordly v1.9.3 is a hotfix release that resolves community addon warnings, fixes leftover branding text across all languages, introduces background downloads for app updates, and migrates the in-app updater to a dedicated public releases repository.',
    highlights: [
      'Community Addon Fix: disabled false-positive "Outdated addon" warnings for community plugins.',
      'Background Update Downloads: APK downloads via native DownloadManager with system notifications.',
      'Public Release Updater: in-app updater fetches updates from the public Chordly-release repository.',
    ],
    url: 'https://github.com/Callmerev95/Chordly-release/releases/tag/v1.9.3',
  },
];
