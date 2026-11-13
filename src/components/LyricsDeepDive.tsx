import React, { useState } from 'react';
import { Mic2, Check, ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PhoneFrame, BrowserFrame } from './DeviceFrames';
import { AUDIO_EASE, PILL_SPRING, ScrollReveal } from './MotionPrimitives';
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
    <section id="lyrics" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Text & Bullets */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
              <Mic2 className="w-3.5 h-3.5" />
              <span>Lyrics Engine</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              Read, sing, romanize, and translate every line.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Chordly queries 12 synced lyrics providers—including LRCLIB, Musixmatch, and Genius—and pairs word-level highlights with depth-of-field focus blur, automatic romanization, and instant bilingual translations beneath every line.
            </p>

            {/* Interactive Focus Lyric Stage */}
            <div className="p-3.5 sm:p-5 rounded-2xl liquid-glass border border-white/10">
              <FocusLyricStage />
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-1">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF2D55]/20 border border-[#FF2D55]/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#FF2D55]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm sm:text-base text-zinc-200">{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#install"
                className="btn-primary"
              >
                <span>Download for Android</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Platform Screen Switcher & Real Assets */}
          <ScrollReveal delay={0.1} className="lg:col-span-6 relative flex flex-col items-center">
            {/* View Mode Toggle */}
            <div className="inline-flex flex-wrap justify-center p-1 rounded-2xl bg-white/[0.06] border border-white/10 mb-6 z-20 max-w-full">
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'mobile'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {viewMode === 'mobile' && (
                  <motion.span
                    layoutId="lyrics-view-pill"
                    transition={PILL_SPRING}
                    className="absolute inset-0 rounded-xl bg-[#FF2D55] shadow-lg"
                  />
                )}
                <Smartphone className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10">Mobile Android View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'desktop'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {viewMode === 'desktop' && (
                  <motion.span
                    layoutId="lyrics-view-pill"
                    transition={PILL_SPRING}
                    className="absolute inset-0 rounded-xl bg-[#FF2D55] shadow-lg"
                  />
                )}
                <Monitor className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10">Desktop Split View</span>
              </button>
            </div>

            {/* Ambient Pink Glow behind frames */}
            <div className="absolute inset-0 bg-[#FF2D55]/20 rounded-full blur-3xl pointer-events-none transform scale-90" />
            
            <div className="relative z-10 w-full flex justify-center">
              <AnimatePresence mode="wait">
                {viewMode === 'mobile' ? (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: AUDIO_EASE }}
                    className="w-full max-w-[320px] sm:max-w-[340px]"
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
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: AUDIO_EASE }}
                    className="w-full max-w-xl"
                  >
                    <BrowserFrame 
                      src="/assets/aistudio/assets-desktop-lyrics-split.webp"
                      alt="Chordly Desktop Live Synced Lyrics"
                      url="chordly.callmerev.my.id/lyrics"
                    />
                    <div className="text-center mt-3 text-xs text-zinc-400">
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
