import React, { useState } from 'react';
import { PlayCircle, Link2, Palette, Sliders } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AUDIO_EASE, ScrollReveal, VIEWPORT_CONFIG } from './MotionPrimitives';
import {
  FEATURE_CATEGORIES,
  FEATURE_FILTERS,
  filterFeatureCategories,
  getTotalFeatureCount,
  type FeatureCategoryId,
  type FeatureFilterId,
} from '../utils/featureCatalog';

const CATEGORY_ICONS: Record<FeatureCategoryId, React.ComponentType<{ className?: string }>> = {
  playback: PlayCircle,
  connectivity: Link2,
  experience: Palette,
  controls: Sliders,
};

export const FeatureBento: React.FC = () => {
  const [filter, setFilter] = useState<FeatureFilterId>('all');
  const prefersReducedMotion = useReducedMotion();

  const visibleCategories = filterFeatureCategories(FEATURE_CATEGORIES, filter);
  const totalFeatures = getTotalFeatureCount(FEATURE_CATEGORIES);

  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-14 space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 tabular-nums">
            <span className="text-[#ff2d55]">Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>4 Core Pillars</span>
            <span aria-hidden="true">·</span>
            <span>{totalFeatures} Features</span>
          </div>
          <h2 className="font-serif font-normal text-[36px] sm:text-[48px] text-white tracking-[-0.03em] leading-[1.05] text-balance">
            Built for people who <span className="italic">actually listen.</span>
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/50 text-balance">
            From Bit-Perfect USB DAC output and pluggable lossless sources to Haze frosted-glass UI and 12 synced lyrics providers.
          </p>

          {/* Interactive Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter feature categories"
            className="flex flex-wrap items-center gap-2 pt-3"
          >
            {FEATURE_FILTERS.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150 whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-white text-[#070708] border-white font-semibold'
                      : 'bg-white/[0.03] text-white/55 border-white/[0.12] hover:text-white hover:border-white/25'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 12-Column Asymmetric Category Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, idx) => {
              const Icon = CATEGORY_ICONS[category.id];
              const isExpandedView = filter !== 'all';
              const isWideCard = isExpandedView || category.colSpan.includes('lg:col-span-7');
              const gridSpanClass = isExpandedView ? 'col-span-1 lg:col-span-12' : category.colSpan;

              return (
                <motion.article
                  key={category.id}
                  layout
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.25,
                    delay: idx * 0.03,
                    ease: AUDIO_EASE,
                    layout: { duration: 0.22, ease: AUDIO_EASE },
                  }}
                  className={`${gridSpanClass} flex`}
                >
                  <div className="w-full p-6 sm:p-7 rounded-[24px] v29-glass-card hover:border-white/25 transition-colors flex flex-col gap-5">
                    {/* Card Header */}
                    <div className="flex items-start gap-3.5 pb-4 border-b border-white/[0.08]">
                      <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff2d55] shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif italic text-[24px] sm:text-[26px] font-normal text-white tracking-[-0.02em] leading-[1.15]">
                          {category.title}
                        </h3>
                        <p className="text-[14px] text-white/50 mt-1.5 leading-[1.55] max-w-xl">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Feature Items List */}
                    <ul
                      className={
                        isWideCard
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'
                          : 'divide-y divide-white/[0.08]'
                      }
                    >
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          className={
                            isWideCard
                              ? 'pb-3 border-b border-white/[0.08] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-last-child(-n+2)]:pb-0'
                              : 'py-3 first:pt-0 last:pb-0'
                          }
                        >
                          <div className="min-w-0 space-y-0.5">
                            <div className="text-[14px] font-semibold text-white">
                              {item.label}
                            </div>
                            <p className="text-[13px] text-white/45 leading-[1.55]">
                              {item.detail}
                              {item.credit ? (
                                <span className="text-white/70"> ({item.credit})</span>
                              ) : null}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
