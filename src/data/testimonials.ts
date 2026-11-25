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
 * template. Tally responses are mirrored to GitHub issues by the Apps Script
 * bridge. A maintainer adds the `published` label to approve; the site then
 * fetches those issues live (see src/utils/testimonialsFeed.ts).
 */
export const TESTIMONIAL_FORM_URL = 'https://tally.so/r/Gelv5k';

export const TESTIMONIAL_ISSUE_URL =
  'https://github.com/Callmerev95/Chordly-Page/issues/new?template=testimonial.yml';

/**
 * Optional static seed shown before the live GitHub fetch resolves (prerender /
 * offline). Keep empty now that published issues are the single source of truth,
 * so unpublished reviews can never leak through a stale seed.
 */
export const TESTIMONIALS: Testimonial[] = [];
