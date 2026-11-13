import React, { useState } from 'react';
import { PlayCircle, Link2, Palette, Sliders } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AUDIO_EASE, PILL_SPRING, ScrollReveal, VIEWPORT_CONFIG } from './MotionPrimitives';
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
    <section id="features" className="scroll-mt-14 sm:scroll-mt-16 py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 tabular-nums">
            <span className="text-[#FF2D55] font-semibold">Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>4 Core Pillars</span>
            <span aria-hidden="true">·</span>
            <span>{totalFeatures} Features</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
            Built for people who actually listen.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 text-balance">
            From Bit-Perfect USB DAC output and pluggable lossless sources to Haze frosted-glass UI and 12 synced lyrics providers.
          </p>

          {/* Interactive Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter feature categories"
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3"
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
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 border whitespace-nowrap shrink-0 min-h-[40px] ${
                    isActive
                      ? 'text-black font-bold border-transparent'
                      : 'bg-white/[0.045] text-zinc-300 hover:text-white hover:bg-white/[0.08] border-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bento-filter-pill"
                      transition={PILL_SPRING}
                      className="absolute inset-0 rounded-xl bg-white shadow-lg"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 12-Column Asymmetric Category Bento */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
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
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: AUDIO_EASE,
                    layout: { duration: 0.28, ease: AUDIO_EASE },
                  }}
                  className={`${gridSpanClass} flex`}
                >
                  <div className="w-full rounded-2xl sm:rounded-[28px] p-5 sm:p-7 liquid-glass border border-white/10 hover:border-white/20 transition-colors flex flex-col gap-5">
                    {/* Card Header */}
                    <div className="flex items-start gap-3.5 pb-4 border-b border-white/[0.08]">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${category.accent}1A`,
                          borderColor: `${category.accent}38`,
                          color: category.accent,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed max-w-xl">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Feature Items List */}
                    <ul
                      className={
                        isWideCard
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4'
                          : 'divide-y divide-white/[0.06]'
                      }
                    >
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          className={
                            isWideCard
                              ? 'pb-3.5 border-b border-white/[0.06] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-last-child(-n+2)]:pb-0'
                              : 'py-3 first:pt-0 last:pb-0'
                          }
                        >
                          <div className="min-w-0 space-y-0.5">
                            <div className="text-sm font-semibold text-white">
                              {item.label}
                            </div>
                            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                              {item.detail}
                              {item.credit ? (
                                <span className="text-zinc-400"> ({item.credit})</span>
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
