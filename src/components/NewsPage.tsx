import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { NEWS_UPDATES } from '../data/newsUpdates';
import {
  fetchReleases,
  latestReleaseTag,
  mapReleasesToNews,
  type NewsCategory,
  type NewsEntry,
} from '../utils/releases';

interface NewsPageProps {
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type FilterOption = 'all' | NewsCategory;
type FeedSource = 'loading' | 'live' | 'fallback';

const FILTER_TABS: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'release', label: 'Releases' },
  { id: 'announcement', label: 'Announcements' },
];

const FALLBACK_RELEASE =
  NEWS_UPDATES.find((entry) => entry.versionTag)?.versionTag ?? 'v1.9.5';

const SOURCE_LABEL: Record<FeedSource, string> = {
  loading: 'Loading latest releases…',
  live: 'Updated live from GitHub Releases',
  fallback: 'Showing cached release notes',
};

export const NewsPage: React.FC<NewsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('all');
  const [entries, setEntries] = useState<NewsEntry[]>(NEWS_UPDATES);
  const [currentRelease, setCurrentRelease] = useState<string>(FALLBACK_RELEASE);
  const [source, setSource] = useState<FeedSource>('loading');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchReleases(controller.signal)
      .then((releases) => {
        if (!active) return;
        const mapped = mapReleasesToNews(releases);
        if (mapped.length > 0) {
          setEntries(mapped);
          setCurrentRelease(latestReleaseTag(releases) || FALLBACK_RELEASE);
          setSource('live');
        } else {
          setSource('fallback');
        }
      })
      .catch(() => {
        if (active) setSource('fallback');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filteredUpdates =
    selectedCategory === 'all'
      ? entries
      : entries.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex-1 bg-[#070708]">
      {/* Editorial Header */}
      <section className="pt-32 sm:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-[4vw] sm:px-6 lg:px-8">
          <div className="max-w-[760px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]">
              News &amp; Releases
            </p>
            <h1 className="mt-3 font-serif font-normal text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-[-0.035em] text-white text-balance">
              Updates, releases, and announcements.
            </h1>
            <p className="mt-6 max-w-[580px] text-[17px] leading-[1.6] text-white/60">
              Follow release notes, playback engine refinements, and platform milestones for Chordly across Android, Wear OS, and the web.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] text-white/45">
              <span className="tabular-nums text-white/85">Current release: {currentRelease}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feed Column */}
      <section className="border-t border-b border-white/[0.08] py-16 lg:py-20">
        <div className="mx-auto max-w-[920px] px-[4vw] sm:px-6 lg:px-8">
          {/* Category Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div
              role="group"
              aria-label="Filter updates by category"
              className="inline-flex items-center gap-1 rounded-[10px] border border-white/[0.12] bg-white/[0.03] p-1"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-[7px] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-150 ${
                      isActive
                        ? 'bg-white text-[#070708] font-semibold'
                        : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="text-right">
              <p className="font-mono text-[12px] text-white/45 tabular-nums">
                Showing {filteredUpdates.length}{' '}
                {filteredUpdates.length === 1 ? 'update' : 'updates'}
              </p>
              <p className="font-mono text-[10.5px] text-white/30">{SOURCE_LABEL[source]}</p>
            </div>
          </div>

          {/* Chronological Article List */}
          <div className="divide-y divide-white/[0.08]">
            {filteredUpdates.map((entry) => (
              <article key={entry.id} className="py-10 first:pt-10 last:pb-2 space-y-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11.5px] text-white/45">
                  <span className="uppercase tracking-[0.16em] text-[#ff2d55]">
                    {entry.categoryLabel}
                  </span>
                  {entry.dateLabel && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums text-white/65">{entry.dateLabel}</span>
                    </>
                  )}
                  {entry.versionTag && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums text-white/90">{entry.versionTag}</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="text-white/55">{entry.platformScope}</span>
                </div>

                <h2 className="font-serif font-normal text-[26px] sm:text-[30px] leading-[1.2] tracking-[-0.02em] text-white">
                  {entry.title}
                </h2>

                {entry.summary && (
                  <p className="max-w-[740px] text-[15.5px] leading-[1.68] text-white/65">
                    {entry.summary}
                  </p>
                )}

                {entry.highlights.length > 0 && (
                  <ul className="list-disc space-y-2 pl-5 pt-1 text-[15px] leading-[1.65] text-white/80 marker:text-[#ff2d55]/75">
                    {entry.highlights.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#ff2d55] hover:underline underline-offset-4"
                  >
                    {entry.versionTag ? 'View release on GitHub' : 'View on GitHub'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
