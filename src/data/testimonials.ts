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
export const TESTIMONIALS: Testimonial[] = [];
