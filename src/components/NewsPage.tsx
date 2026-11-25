import React, { useState } from 'react';
import { NEWS_UPDATES, type NewsCategory } from '../data/newsUpdates';

interface NewsPageProps {
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type FilterOption = 'all' | NewsCategory;

const FILTER_TABS: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'release', label: 'Releases' },
  { id: 'announcement', label: 'Announcements' },
];

export const NewsPage: React.FC<NewsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('all');

  const filteredUpdates =
    selectedCategory === 'all'
      ? NEWS_UPDATES
      : NEWS_UPDATES.filter((item) => item.category === selectedCategory);

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
              <span className="tabular-nums text-white/85">Current release: v1.9.5</span>
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

            <p className="font-mono text-[12px] text-white/45 tabular-nums">
              Showing {filteredUpdates.length}{' '}
              {filteredUpdates.length === 1 ? 'update' : 'updates'}
            </p>
          </div>

          {/* Chronological Article List */}
          <div className="divide-y divide-white/[0.08]">
            {filteredUpdates.map((entry) => (
              <article key={entry.id} className="py-10 first:pt-10 last:pb-2 space-y-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11.5px] text-white/45">
                  <span className="uppercase tracking-[0.16em] text-[#ff2d55]">
                    {entry.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-white/65">{entry.dateLabel}</span>
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

                <p className="max-w-[740px] text-[15.5px] leading-[1.68] text-white/65">
                  {entry.summary}
                </p>

                <ul className="list-disc space-y-2 pl-5 pt-1 text-[15px] leading-[1.65] text-white/80 marker:text-[#ff2d55]/75">
                  {entry.highlights.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
