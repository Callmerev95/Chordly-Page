import test from 'node:test';
import assert from 'node:assert/strict';
import {
  derivePlatformScope,
  extractChangelogHighlights,
  extractSummary,
  formatReleaseDate,
  latestReleaseTag,
  mapReleaseToNewsEntry,
  mapReleasesToNews,
  sumDownloadCounts,
  type ReleaseAsset,
  type ReleaseInfo,
} from './releases.ts';

const BODY = `## Release v9.9.9

First paragraph summary line.

## Changelog

- **Bold label**: did a thing.
- Plain bullet.
- Another \`code\` bullet.

## Install

- **Android**: install this (should be excluded).
`;

const ASSETS: ReleaseAsset[] = [
  { name: 'app-prod-universal-release.apk', size: 1, downloadCount: 0, downloadUrl: 'x' },
  { name: 'ChordlyWear-prod-release.apk', size: 1, downloadCount: 0, downloadUrl: 'x' },
  { name: 'tv-prod-universal-release.apk', size: 1, downloadCount: 0, downloadUrl: 'x' },
];

test('extractChangelogHighlights keeps changelog bullets only and strips markdown', () => {
  assert.deepEqual(extractChangelogHighlights(BODY), [
    'Bold label: did a thing.',
    'Plain bullet.',
    'Another code bullet.',
  ]);
});

test('extractSummary returns the first non-heading paragraph', () => {
  assert.equal(extractSummary(BODY, 'Chordly v9.9.9'), 'First paragraph summary line.');
});

test('derivePlatformScope detects platforms from asset names', () => {
  assert.equal(derivePlatformScope(ASSETS), 'Android · Wear OS · Android TV');
  assert.equal(derivePlatformScope([]), 'All Platforms');
});

test('mapReleaseToNewsEntry derives category, metadata, and platform scope', () => {
  const release: ReleaseInfo = {
    tag: 'v9.9.9',
    name: 'Chordly v9.9.9',
    body: BODY,
    publishedAt: '2026-11-25T09:57:17Z',
    htmlUrl: 'https://example.com/release',
    assets: ASSETS,
  };

  const entry = mapReleaseToNewsEntry(release);
  assert.equal(entry.category, 'release');
  assert.equal(entry.versionTag, 'v9.9.9');
  assert.equal(entry.platformScope, 'Android · Wear OS · Android TV');
  assert.equal(entry.dateLabel, 'November 25, 2026');
  assert.equal(entry.highlights.length, 3);
  assert.equal(entry.url, 'https://example.com/release');

  const announcement = mapReleaseToNewsEntry({ ...release, assets: [] });
  assert.equal(announcement.category, 'announcement');
  assert.equal(announcement.versionTag, undefined);
  assert.equal(announcement.platformScope, 'All Platforms');
});

test('latestReleaseTag and sumDownloadCounts aggregate releases', () => {
  const releases: ReleaseInfo[] = [
    {
      tag: 'v2',
      name: '2',
      body: '',
      publishedAt: '',
      htmlUrl: '',
      assets: [{ name: 'a.apk', size: 1, downloadCount: 3, downloadUrl: 'x' }],
    },
    {
      tag: 'v1',
      name: '1',
      body: '',
      publishedAt: '',
      htmlUrl: '',
      assets: [{ name: 'b.apk', size: 1, downloadCount: 4, downloadUrl: 'x' }],
    },
  ];

  assert.equal(latestReleaseTag(releases), 'v2');
  assert.equal(sumDownloadCounts(releases), 7);
  assert.equal(mapReleasesToNews(releases).length, 2);
});

test('formatReleaseDate formats ISO dates in UTC and tolerates invalid input', () => {
  assert.equal(formatReleaseDate('2026-11-25T09:57:17Z'), 'November 25, 2026');
  assert.equal(formatReleaseDate(''), '');
  assert.equal(formatReleaseDate('not-a-date'), '');
});
