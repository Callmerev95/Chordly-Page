export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials?: string;
  avatarUrl?: string;
  profileUrl?: string;
  sourceUrl?: string;
  verified?: boolean;
}

/**
 * Intake: respondents submit via the Tally form (no login) or the GitHub issue
 * template. A maintainer reviews consent, then curates the approved entry here
 * with `profileUrl` (attribution) and/or `sourceUrl` (proof, e.g. the GitHub
 * issue) and `verified: true` when a verifiable source exists.
 */
export const TESTIMONIAL_FORM_URL = 'https://tally.so/r/Gelv5k';

export const TESTIMONIAL_ISSUE_URL =
  'https://github.com/Callmerev95/Chordly-Page/issues/new?template=testimonial.yml';

/**
 * Curated, real listener stories. Empty until the first submissions are
 * approved so the section shows an honest call-to-action instead of fake quotes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'venusbeyy',
    quote:
      'Finally a music player that nails synced lyrics! The word-by-word animation and instant bilingual translations make singing along to foreign tracks effortless. Plus, the frosted-glass Material 3 UI looks super clean and smooth on my phone.',
    name: 'Venusbeyy',
    role: 'Android',
    initials: 'VE',
    profileUrl: 'https://www.instagram.com/hnaafifah',
  },
  {
    id: 'regalchivas',
    quote:
      'Akhirnya ada pemutar YouTube Music yang beneran nyaman dipakai di Android TV! Navigasi pakai remot lancar jaya, tampilan antarmukanya bersih banget di layar besar, dan lirik sinkron layar penuhnya bikin ruang tamu serasa karaoke pribadi.',
    name: 'RegalChivas',
    role: 'Android TV',
    initials: 'RC',
    sourceUrl: 'https://github.com/Callmerev95/Chordly-Page/issues/1',
    verified: true,
  },
];
