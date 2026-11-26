import React, { useState } from 'react';
import { Mic2, Check, ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PhoneFrame, BrowserFrame } from './DeviceFrames';
import { AUDIO_EASE, PILL_SPRING, ScrollReveal } from './MotionPrimitives';
import { FocusLyricStage } from './FocusLyricStage';

export const LyricsDeepDive: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const stageTransition = {
    duration: prefersReducedMotion ? 0 : 0.2,
    ease: AUDIO_EASE,
  };

  const bullets = [
    'Beat-reactive soft-white glow tracking synced smoothly to vocal phrasing',
    'One-tap bilingual translation toggle directly beneath every active lyric line',
    'Real-time synced LRC fetching from LRCLIB paired with official preview audio',
    'Click-to-seek: tap any lyric line to jump audio immediately',
    'Fine-grained ±0.25s sync offset calibration with instant default reset',
  ];

  return (
    <section id="lyrics" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center lg:items-start">
          {/* Left Column: Text, FocusLyricStage & Bullets */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Mic2 className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Lyrics Engine · 12 Providers</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Read, sing, <span className="italic">romanize</span>, and translate every line.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Chordly queries 12 synced lyrics providers—including LRCLIB, Musixmatch, and Genius—and pairs word-level highlights with depth-of-field focus blur, automatic romanization, and instant bilingual translations beneath every line.
            </p>

            {/* Interactive Focus Lyric Stage */}
            <div className="p-5 sm:p-6 rounded-[24px] v29-glass-card">
              <FocusLyricStage />
            </div>

            {/* Bullets */}
            <div className="space-y-2.5 pt-1">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#ff2d55]">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-[14px] leading-[1.5] text-white/60">{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a href="#install" className="btn-primary">
                <span>Download for Android</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Platform Screen Switcher */}
          <ScrollReveal delay={0.08} className="lg:col-span-6 relative flex flex-col items-center">
            <div
              role="tablist"
              aria-label="Lyrics preview device"
              className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.12] mb-7 max-w-full"
            >
              {(
                [
                  { id: 'mobile', label: 'Mobile Android', icon: Smartphone },
                  { id: 'desktop', label: 'Desktop Split', icon: Monitor },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = viewMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setViewMode(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors whitespace-nowrap min-h-[40px] ${
                      isActive
                        ? 'text-[#070708] font-semibold'
                        : 'text-white/55 hover:text-white font-normal'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="lyrics-view-indicator"
                        transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                        className="absolute inset-0 rounded-full bg-white"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 grid-rows-1 w-full place-items-center">
              <motion.div
                initial={false}
                animate={{
                  opacity: viewMode === 'mobile' ? 1 : 0,
                  scale: viewMode === 'mobile' || prefersReducedMotion ? 1 : 0.985,
                }}
                transition={stageTransition}
                aria-hidden={viewMode !== 'mobile'}
                className={`col-start-1 row-start-1 w-full max-w-[300px] sm:max-w-[320px] will-change-[opacity,transform] ${
                  viewMode === 'mobile'
                    ? 'relative z-10 pointer-events-auto'
                    : 'z-0 pointer-events-none select-none'
                }`}
              >
                <PhoneFrame
                  eager
                  src="/assets/aistudio/assets-mobile-lyrics.webp"
                  trackTitle="ILYSB (STRIPPED)"
                  artistName="LANY"
                />
              </motion.div>

              <motion.div
                initial={false}
                animate={{
                  opacity: viewMode === 'desktop' ? 1 : 0,
                  scale: viewMode === 'desktop' || prefersReducedMotion ? 1 : 0.985,
                }}
                transition={stageTransition}
                aria-hidden={viewMode !== 'desktop'}
                className={`col-start-1 row-start-1 w-full max-w-xl will-change-[opacity,transform] ${
                  viewMode === 'desktop'
                    ? 'relative z-10 pointer-events-auto'
                    : 'z-0 pointer-events-none select-none'
                }`}
              >
                <BrowserFrame
                  eager
                  src="/assets/aistudio/assets-desktop-lyrics-split.webp"
                  alt="Chordly Desktop Live Synced Lyrics"
                  url="web-player.chordly.my.id/lyrics"
                />
                <div className="text-center mt-3 font-mono text-[11px] text-white/40">
                  Full-screen synchronized lyrics view with ambient blur in desktop browser
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
