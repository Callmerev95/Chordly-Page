import test from 'node:test';
import assert from 'node:assert/strict';
import { mapIssueToTestimonial, mergeTestimonials } from './testimonialsFeed.ts';
import type { Testimonial } from '../data/testimonials.ts';

const ISSUE_BODY = `### Display name / handle

RegalChivas

### Platform

Android TV

### Your review

Akhirnya ada pemutar YouTube Music yang beneran nyaman dipakai di Android TV!

### Profile link (optional)

_No response_

### Consent

- [x] I agree to have this review featured on chordly.my.id with attribution.
`;

test('mapIssueToTestimonial parses a published issue form body', () => {
  const entry = mapIssueToTestimonial({
    number: 1,
    body: ISSUE_BODY,
    html_url: 'https://github.com/Callmerev95/Chordly-Page/issues/1',
  });

  assert.ok(entry);
  assert.equal(entry!.id, 'gh-1');
  assert.equal(entry!.name, 'RegalChivas');
  assert.equal(entry!.role, 'Android TV');
  assert.match(entry!.quote, /Android TV/);
  assert.equal(entry!.sourceUrl, 'https://github.com/Callmerev95/Chordly-Page/issues/1');
  assert.equal(entry!.verified, true);
  assert.equal(entry!.profileUrl, undefined);
});

test('mapIssueToTestimonial keeps a valid profile url and drops unsafe ones', () => {
  const withUrl = ISSUE_BODY.replace('_No response_', 'https://instagram.com/someone');
  assert.equal(
    mapIssueToTestimonial({ number: 2, body: withUrl, html_url: 'x' })?.profileUrl,
    'https://instagram.com/someone'
  );

  const unsafe = ISSUE_BODY.replace('_No response_', 'javascript:alert(1)');
  assert.equal(
    mapIssueToTestimonial({ number: 3, body: unsafe, html_url: 'x' })?.profileUrl,
    undefined
  );
});

test('mapIssueToTestimonial requires consent', () => {
  const noConsent = ISSUE_BODY.replace('- [x]', '- [ ]');
  assert.equal(mapIssueToTestimonial({ number: 4, body: noConsent, html_url: 'x' }), null);
});

test('mergeTestimonials dedupes live vs static by source/name', () => {
  const staticList: Testimonial[] = [
    { id: 'a', quote: 'q1', name: 'Venusbeyy', role: 'Android' },
    {
      id: 'b',
      quote: 'q2',
      name: 'RegalChivas',
      role: 'Android TV',
      sourceUrl: 'https://github.com/x/1',
    },
  ];
  const liveList: Testimonial[] = [
    {
      id: 'gh-1',
      quote: 'q2',
      name: 'RegalChivas',
      role: 'Android TV',
      sourceUrl: 'https://github.com/x/1',
      verified: true,
    },
  ];

  const merged = mergeTestimonials(staticList, liveList);
  assert.equal(merged.length, 2);
  assert.equal(merged[0].id, 'gh-1');
  assert.ok(merged.some((entry) => entry.name === 'Venusbeyy'));
});
