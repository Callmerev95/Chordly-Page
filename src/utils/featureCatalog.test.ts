import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FEATURE_CATEGORIES,
  FEATURE_FILTERS,
  LYRICS_PROVIDERS,
  filterFeatureCategories,
  getTotalFeatureCount,
} from './featureCatalog.ts';

test('FEATURE_CATEGORIES defines all 4 categories with 31 total features', () => {
  assert.equal(FEATURE_CATEGORIES.length, 4);
  assert.deepEqual(
    FEATURE_CATEGORIES.map((c) => c.id),
    ['playback', 'connectivity', 'experience', 'controls']
  );

  assert.equal(FEATURE_CATEGORIES[0].items.length, 10);
  assert.equal(FEATURE_CATEGORIES[1].items.length, 6);
  assert.equal(FEATURE_CATEGORIES[2].items.length, 7);
  assert.equal(FEATURE_CATEGORIES[3].items.length, 8);
  assert.equal(getTotalFeatureCount(FEATURE_CATEGORIES), 31);
});

test('filterFeatureCategories filters accurately by category id and all', () => {
  assert.equal(filterFeatureCategories(FEATURE_CATEGORIES, 'all').length, 4);

  for (const filter of FEATURE_FILTERS) {
    if (filter.id === 'all') continue;
    const filtered = filterFeatureCategories(FEATURE_CATEGORIES, filter.id);
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].id, filter.id);
  }
});

test('includes required credits and all 12 lyrics providers', () => {
  const playback = FEATURE_CATEGORIES.find((c) => c.id === 'playback')!;
  const appleLyrics = playback.items.find((i) => i.id === 'apple-lyrics-motion')!;
  assert.match(appleLyrics.credit ?? '', /binimum/i);

  const controls = FEATURE_CATEGORIES.find((c) => c.id === 'controls')!;
  const usbExclusive = controls.items.find((i) => i.id === 'bit-perfect-usb')!;
  assert.match(usbExclusive.credit ?? '', /Mornye/i);

  const experience = FEATURE_CATEGORIES.find((c) => c.id === 'experience')!;
  const providersItem = experience.items.find((i) => i.id === 'lyrics-providers')!;
  assert.equal(LYRICS_PROVIDERS.length, 12);
  for (const provider of LYRICS_PROVIDERS) {
    assert.ok(
      providersItem.detail.includes(provider),
      `Expected lyrics provider "${provider}" in detail text`
    );
  }
});
