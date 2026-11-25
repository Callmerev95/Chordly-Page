import React, { useState } from 'react';
import { Mic2, Check, ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PhoneFrame, BrowserFrame } from './DeviceFrames';
import { AUDIO_EASE, ScrollReveal } from './MotionPrimitives';
import { FocusLyricStage } from './FocusLyricStage';

export const LyricsDeepDive: React.FC = () => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.12] mb-7 max-w-full">
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors whitespace-nowrap ${
                  viewMode === 'mobile'
                    ? 'bg-white text-[#070708] font-semibold'
                    : 'text-white/55 hover:text-white font-normal'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>Mobile Android</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors whitespace-nowrap ${
                  viewMode === 'desktop'
                    ? 'bg-white text-[#070708] font-semibold'
                    : 'text-white/55 hover:text-white font-normal'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 shrink-0" />
                <span>Desktop Split</span>
              </button>
            </div>

            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                {viewMode === 'mobile' ? (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: AUDIO_EASE }}
                    className="w-full max-w-[300px] sm:max-w-[320px]"
                  >
                    <PhoneFrame
                      src="/assets/aistudio/assets-mobile-lyrics.webp"
                      trackTitle="ILYSB (STRIPPED)"
                      artistName="LANY"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: AUDIO_EASE }}
                    className="w-full max-w-xl"
                  >
                    <BrowserFrame
                      src="/assets/aistudio/assets-desktop-lyrics-split.webp"
                      alt="Chordly Desktop Live Synced Lyrics"
                      url="web-player.chordly.my.id/lyrics"
                    />
                    <div className="text-center mt-3 font-mono text-[11px] text-white/40">
                      Full-screen synchronized lyrics view with ambient blur in desktop browser
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
