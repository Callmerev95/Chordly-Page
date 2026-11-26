import React, { useState } from 'react';
import { Globe, ExternalLink, ShieldAlert, Music2, Compass, Layers, Radio } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BrowserFrame, type BrowserFrameSlide } from './DeviceFrames';
import { AUDIO_EASE, PILL_SPRING, ScrollReveal } from './MotionPrimitives';

export const WebPlayerSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'recent' | 'explore' | 'player' | 'extension'>('recent');

  const tabs = [
    {
      id: 'recent' as const,
      label: 'Recently Played & Lyrics',
      url: 'https://web-player.chordly.my.id/library/recent',
      src: '/assets/aistudio/assets-web-recent-lyrics.webp',
      caption: 'Tracklist history with real-time synchronized lyrics sidebar (In Bloom · Neck Deep)',
      icon: Music2,
    },
    {
      id: 'explore' as const,
      label: 'Moods & Moments',
      url: 'https://web-player.chordly.my.id/explore',
      src: '/assets/aistudio/assets-web-moods-moments.webp',
      caption: 'Dynamic mood radio stations: Hits Cafe, Commute, Lofi Loft, Gaming, Musik Pesta Indonesia',
      icon: Compass,
    },
    {
      id: 'player' as const,
      label: 'Full Screen Player',
      url: 'https://web-player.chordly.my.id/now-playing',
      src: '/assets/aistudio/assets-web-full-player.webp',
      caption: 'Distraction-free ambient canvas with album color extraction (Die For You Remix · Starboy)',
      icon: Layers,
    },
    {
      id: 'extension' as const,
      label: 'Extension Bridge',
      url: 'https://web-player.chordly.my.id/home',
      src: '/assets/aistudio/assets-web-extension-bridge.webp',
      caption: 'Direct browser extension bridge for YouTube Music streaming, Discord Rich Presence & Spotify sign-in',
      icon: Radio,
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];
  const browserSlides: BrowserFrameSlide[] = tabs.map((t) => ({
    id: t.id,
    src: t.src,
    alt: t.label,
  }));

  return (
    <section id="web-player" className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-12 rounded-[32px] v29-glass-frame">
          {/* Header */}
          <ScrollReveal className="relative z-10 text-center max-w-2xl mx-auto space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Globe className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Web Interface · Chrome, Edge, Brave &amp; Firefox</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Your music in <span className="italic">any browser.</span>
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Stream your entire library from Chrome, Edge, Brave, or Firefox. The Chordly browser extension safely bridges playback requests and synchronized lyrics.
            </p>

            <div className="pt-2 flex justify-center">
              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-2.5"
              >
                <span className="truncate">
                  Open Web Player <span className="hidden sm:inline">(web-player.chordly.my.id)</span>
                </span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </ScrollReveal>

          {/* Interactive Screen Switcher */}
          <ScrollReveal delay={0.05} className="relative z-10 flex justify-center mb-6">
            <div
              role="tablist"
              aria-label="Web player interface preview"
              className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#070708]/80 border border-white/[0.12] max-w-full"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full font-mono text-[11px] uppercase tracking-[0.06em] transition-colors duration-150 whitespace-nowrap min-h-[40px] ${
                      isActive
                        ? 'text-[#070708] font-semibold'
                        : 'text-white/55 hover:text-white hover:bg-white/[0.06] font-normal'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="webplayer-tab-indicator"
                        transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                        className="absolute inset-0 rounded-xl sm:rounded-full bg-white"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#ff2d55]' : ''}`} />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Browser Window Mockup */}
          <ScrollReveal delay={0.1} className="relative z-10 max-w-5xl mx-auto">
            <BrowserFrame slides={browserSlides} activeSlideId={activeTab} url={current.url} />

            <div className="mt-4 grid grid-cols-1 grid-rows-1 place-items-center">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.div
                    key={tab.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive || prefersReducedMotion ? 0 : 4,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.18,
                      ease: AUDIO_EASE,
                    }}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 text-center font-mono text-[12px] text-white/50 px-2 ${
                      isActive ? 'relative z-10' : 'z-0 pointer-events-none select-none'
                    }`}
                  >
                    {tab.caption}
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Meta Note */}
          <div className="relative z-10 mt-8 max-w-3xl mx-auto p-4 rounded-2xl bg-[#070708]/70 border border-white/[0.08] flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#ff2d55] flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-white/55 leading-[1.55]">
              <strong className="text-white font-semibold">Note:</strong> The web player requires the free Chordly browser extension to communicate with YouTube Music servers. Install the extension once, then sign in with your Google account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
