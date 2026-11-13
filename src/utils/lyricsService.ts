import { Lrc } from 'lrc-kit';

export interface SyncedLyricLine {
  startSec: number;
  minGateWaitSec: number;
  vocalDelaySec: number;
  maxGateWaitSec: number;
  vocalEndSec: number;
  endSec: number;
  text: string;
  translation: string;
}

export interface LrclibResult {
  lines: SyncedLyricLine[];
  origin: 'lrclib' | 'fallback';
  trackName: string;
  artistName: string;
  durationSec: number;
}

export interface ItunesPreviewResult {
  previewUrl: string;
  trackName: string;
  artistName: string;
  artworkUrl: string;
  origin: 'itunes-api' | 'fallback';
}

export const CHORUS_WINDOW = {
  startSec: 39.0,
  endSec: 58.6,
} as const;

const FALLBACK_ILYSB_LRC = `[00:00.74] Ain't never felt this way
[00:05.89] Can't get enough so stay with me
[00:10.13] It's not like we got big plans
[00:15.38] Let's drive around town holding hands
[00:18.81] And you need to know
[00:20.96] You're the only one, alright, alright
[00:28.25] And you need to know
[00:30.86] That you keep me up all night, all night
[00:39.42] Oh, my heart hurts so good
[00:41.95] I love you, babe, so bad, so bad, oh
[00:48.93] Oh, my heart hurts so good
[00:51.32] I love you, babe, so bad, so bad
[00:58.44] Mad cool in all my clothes
[01:03.40] Mad warm when you get close to me
[01:08.10] Slow dance these summer nights
[01:13.01] Our disco ball's my kitchen light
[01:16.22] Yeah and you need to know
[01:18.54] That nobody could take your place, your place
[01:26.09] And you need to know
[01:28.38] That I'm hella obsessed with your face, your face
[01:36.57] Oh, my heart hurts so good
[01:39.35] I love you, babe, so bad, so bad, oh
[01:46.60] Oh, my heart hurts so good
[01:48.83] I love you, babe, so bad, so bad, oh
[01:56.24] Oh, my heart hurts so good
[01:58.56] I love you, babe, so bad, so bad, oh
[02:23.49] And you need to know
[02:25.78] You're the only one, alright, alright
[02:33.40] And you need to know
[02:35.70] That you keep me up all night, all night
[02:44.16] Oh, my heart hurts so good
[02:46.64] I love you, babe, so bad, so bad, oh
[02:53.69] Oh, my heart hurts so good
[02:56.29] I love you, babe, so bad, so bad, oh
[03:07.73] So bad, oh
[03:12.90] Oh, my heart hurt
[03:15.26] Oh, my heart hurt
[03:17.99] Oh, my heart hurt
[03:19.67] So bad, oh`;

const FALLBACK_ITUNES_PREVIEW: ItunesPreviewResult = {
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/87/fe/27/87fe27f9-dede-252c-634f-2f1724b87d61/mzaf_5316985452056668443.plus.aac.p.m4a',
  trackName: 'ILYSB',
  artistName: 'LANY',
  artworkUrl:
    'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/74/23/52/74235205-45aa-e94a-c1a6-cfd2fa495726/00602557074499.rgb.jpg/100x100bb.jpg',
  origin: 'fallback',
};

const INDONESIAN_TRANSLATION_MAP: Record<string, string> = {
  "Ain't never felt this way": 'Tak pernah kurasakan perasaan seperti ini',
  "Can't get enough so stay with me": 'Tak pernah cukup, jadi tetaplah bersamaku',
  "It's not like we got big plans": 'Bukannya kita punya rencana besar',
  "Let's drive around town holding hands": 'Ayo berkendara keliling kota sambil bergandengan tangan',
  'And you need to know': 'Dan kamu perlu tahu',
  "You're the only one, alright, alright": 'Kamulah satu-satunya, sungguh, sungguh',
  'That you keep me up all night, all night': 'Bahwa kamu membuatku terjaga sepanjang malam',
  'Oh, my heart hurts so good': 'Oh, hatiku terasa sakit yang begitu indah',
  'I love you, babe, so bad, so bad, oh': 'Aku mencintaimu, sayang, begitu dalam, begitu dalam, oh',
  'I love you, babe, so bad, so bad': 'Aku mencintaimu, sayang, begitu dalam, begitu dalam',
  'Mad cool in all my clothes': 'Tampak keren dengan semua pakaianku',
  'Mad warm when you get close to me': 'Terasa hangat saat kamu mendekat padaku',
  'Slow dance these summer nights': 'Menari pelan di malam-malam musim panas ini',
  "Our disco ball's my kitchen light": 'Bola disko kita hanyalah lampu dapurku',
  'Yeah and you need to know': 'Ya, dan kamu perlu tahu',
  'That nobody could take your place, your place': 'Tak ada yang bisa menggantikan posisimu',
  "That I'm hella obsessed with your face, your face": 'Bahwa aku benar-benar terobsesi dengan wajahmu',
  'So bad, oh': 'Begitu dalam, oh',
  'Oh, my heart hurt': 'Oh, hatiku terasa sakit',
};

export interface WordTimingSlot {
  word: string;
  start: number;
  end: number;
  emphasis: number;
}

const SUSTAINED_WORDS = new Set([
  'oh',
  'so',
  'good',
  'bad',
  'love',
  'babe',
  'heart',
  'hurts',
  'know',
  'alright',
  'night',
  'stay',
  'way',
  'face',
  'place',
]);

export function buildDynamicWordSlots(text: string): WordTimingSlot[] {
  const rawWords = text.trim().split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return [];

  const units = rawWords.map((word, index) => {
    const clean = word.toLowerCase().replace(/[^a-z']/g, '');
    const isLast = index === rawWords.length - 1;
    const hasComma = word.endsWith(',');
    const isSustain = SUSTAINED_WORDS.has(clean);

    // Base weight scales softly with phonetic length rather than rigid linear char count
    let speakWeight = 0.75 + Math.sqrt(Math.max(1, clean.length)) * 0.48;
    if (isSustain) speakWeight *= 1.24;
    if (isLast && clean === 'oh') speakWeight *= 1.45;
    if (clean === 'good' || clean === 'bad') speakWeight *= 1.22;

    // Natural breath/phrasing gap after punctuation commas (e.g., "Oh,", "you,", "babe,")
    const pauseAfter = hasComma ? (clean === 'oh' ? 0.22 : 0.14) : 0.02;

    const emphasis = isSustain ? 1 : 0.45;
    return { word, speakWeight, pauseAfter, emphasis };
  });

  const totalUnits = units.reduce(
    (sum, item, idx) => sum + item.speakWeight + (idx < units.length - 1 ? item.pauseAfter : 0),
    0
  );

  let cursor = 0;
  return units.map((item, idx) => {
    const start = cursor / totalUnits;
    const end = (cursor + item.speakWeight) / totalUnits;
    cursor += item.speakWeight + (idx < units.length - 1 ? item.pauseAfter : 0);
    return {
      word: item.word,
      start,
      end: Math.min(1, end),
      emphasis: item.emphasis,
    };
  });
}

export function parseLrcWithKit(
  lrcText: string,
  totalDurationSec = 211
): SyncedLyricLine[] {
  const parsed = Lrc.parse(lrcText);
  const nonEmpty = parsed.lyrics.filter((item) => item.content.trim().length > 0);

  return nonEmpty.map((item, idx) => {
    const startSec = item.timestamp;
    const nextStart = nonEmpty[idx + 1]?.timestamp ?? totalDurationSec;
    const endSec = Math.max(startSec + 0.8, nextStart);
    const gap = endSec - startSec;
    const cleanText = item.content.trim();
    const wordCount = cleanText.split(/\s+/).length;
    const commaCount = (cleanText.match(/,/g) ?? []).length;

    // Lines like "I love you, babe, so bad, so bad, oh" have a brief instrumental breath after "so good"
    const hasInstrumentalLeadIn = /^i love you/i.test(cleanText) && gap >= 5.0;
    const minGateWaitSec = hasInstrumentalLeadIn ? 0.42 : 0.0;
    const vocalDelaySec = hasInstrumentalLeadIn ? 0.92 : 0.0;
    const maxGateWaitSec = hasInstrumentalLeadIn ? 1.25 : 0.22;

    // Estimate realistic sung phrasing duration including comma breaths and chorus sustain
    const baseVocal = Math.max(1.5, wordCount * 0.4 + commaCount * 0.14);
    const estimatedVocalDuration = Math.min(gap * 0.9, vocalDelaySec + baseVocal);
    const vocalEndSec = startSec + estimatedVocalDuration;

    return {
      startSec,
      minGateWaitSec,
      vocalDelaySec,
      maxGateWaitSec,
      vocalEndSec,
      endSec,
      text: cleanText,
      translation: INDONESIAN_TRANSLATION_MAP[cleanText] ?? '',
    };
  });
}

export async function fetchIlysbFromLrclib(
  signal?: AbortSignal
): Promise<LrclibResult> {
  try {
    const url =
      'https://lrclib.net/api/get?artist_name=LANY&track_name=ILYSB&duration=211';
    const response = await fetch(url, {
      signal,
      headers: {
        'Lrclib-Client': 'Chordly-Landing/1.0 (https://chordly.callmerev.my.id)',
      },
    });

    if (!response.ok) {
      throw new Error(`LRCLIB returned ${response.status}`);
    }

    const data = (await response.json()) as {
      trackName?: string;
      artistName?: string;
      duration?: number;
      syncedLyrics?: string | null;
    };

    if (!data.syncedLyrics) {
      throw new Error('LRCLIB response missing syncedLyrics');
    }

    const durationSec = typeof data.duration === 'number' ? data.duration : 211;
    const lines = parseLrcWithKit(data.syncedLyrics, durationSec);

    if (lines.length === 0) {
      throw new Error('Parsed LRCLIB lines empty');
    }

    return {
      lines,
      origin: 'lrclib',
      trackName: data.trackName ?? 'ILYSB',
      artistName: data.artistName ?? 'LANY',
      durationSec,
    };
  } catch {
    return {
      lines: parseLrcWithKit(FALLBACK_ILYSB_LRC, 211),
      origin: 'fallback',
      trackName: 'ILYSB',
      artistName: 'LANY',
      durationSec: 211,
    };
  }
}

export async function fetchIlysbItunesPreview(
  signal?: AbortSignal
): Promise<ItunesPreviewResult> {
  try {
    const url =
      'https://itunes.apple.com/search?term=LANY+ILYSB&entity=song&limit=1';
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`iTunes API returned ${response.status}`);
    }
    const payload = (await response.json()) as {
      results?: Array<{
        previewUrl?: string;
        trackName?: string;
        artistName?: string;
        artworkUrl100?: string;
      }>;
    };

    const first = payload.results?.[0];
    if (!first?.previewUrl) {
      throw new Error('iTunes API missing previewUrl');
    }

    return {
      previewUrl: first.previewUrl,
      trackName: first.trackName ?? 'ILYSB',
      artistName: first.artistName ?? 'LANY',
      artworkUrl: first.artworkUrl100 ?? FALLBACK_ITUNES_PREVIEW.artworkUrl,
      origin: 'itunes-api',
    };
  } catch {
    return FALLBACK_ITUNES_PREVIEW;
  }
}
