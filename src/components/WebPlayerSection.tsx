import React, { useState } from 'react';
import { Globe, ExternalLink, ShieldAlert, Music2, Compass, Layers, Radio } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BrowserFrame } from './DeviceFrames';
import { AUDIO_EASE, PILL_SPRING, ScrollReveal } from './MotionPrimitives';

export const WebPlayerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'explore' | 'player' | 'extension'>('recent');

  const tabs = [
    {
      id: 'recent' as const,
      label: 'Recently Played & Lyrics',
      url: 'https://chordly.callmerev.my.id/library/recent',
      src: '/assets/aistudio/assets-web-recent-lyrics.webp',
      caption: 'Tracklist history with real-time synchronized lyrics sidebar (In Bloom · Neck Deep)',
      icon: Music2,
    },
    {
      id: 'explore' as const,
      label: 'Moods & Moments',
      url: 'https://chordly.callmerev.my.id/explore',
      src: '/assets/aistudio/assets-web-moods-moments.webp',
      caption: 'Dynamic mood radio stations: Hits Cafe, Commute, Lofi Loft, Gaming, Musik Pesta Indonesia',
      icon: Compass,
    },
    {
      id: 'player' as const,
      label: 'Full Screen Player',
      url: 'https://chordly.callmerev.my.id/now-playing',
      src: '/assets/aistudio/assets-web-full-player.webp',
      caption: 'Distraction-free ambient canvas with album color extraction (Die For You Remix · Starboy)',
      icon: Layers,
    },
    {
      id: 'extension' as const,
      label: 'Extension Bridge',
      url: 'https://chordly.callmerev.my.id/home',
      src: '/assets/aistudio/assets-web-extension-bridge.webp',
      caption: 'Direct browser extension bridge for YouTube Music streaming, Discord Rich Presence & Spotify sign-in',
      icon: Radio,
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="web-player" className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width liquid glass container */}
        <div className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-16 liquid-glass relative overflow-hidden border border-white/10">
          
          {/* Subtle Ambient Radial behind browser frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF9A62]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF9A62] uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Web Interface</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Your music in any browser.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300">
              Stream your entire library from Chrome, Edge, Brave, or Firefox. The Chordly browser extension safely bridges playback requests and synchronized lyrics.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex justify-center">
              <a
                href="https://chordly.callmerev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary max-w-full px-5 sm:px-7 text-sm sm:text-[0.95rem]"
              >
                <span className="truncate">
                  Open Web Player <span className="hidden sm:inline">(chordly.callmerev.my.id)</span>
                </span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </ScrollReveal>

          {/* Interactive Screen Switcher Navigation */}
          <ScrollReveal delay={0.08} className="relative z-20 flex justify-center mb-6">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/[0.06] border border-white/10 max-w-full">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-black font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="web-tab-pill"
                        transition={PILL_SPRING}
                        className="absolute inset-0 rounded-xl bg-[#FF9A62] shadow-lg"
                      />
                    )}
                    <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Browser Window Mockup with real screenshots */}
          <ScrollReveal delay={0.14} className="relative z-10 max-w-5xl mx-auto shadow-2xl">
            <BrowserFrame 
              src={current.src}
              url={current.url}
              alt={current.label}
            />
            {/* Dynamic Screen Caption */}
            <div className="mt-4 min-h-[20px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: AUDIO_EASE }}
                  className="text-center text-xs text-zinc-400 flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A62]" />
                  <span>{current.caption}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Meta Note below browser frame */}
          <div className="mt-8 max-w-3xl mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 relative z-10">
            <ShieldAlert className="w-5 h-5 text-[#FF9A62] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              <strong className="text-white">Note:</strong> The web player requires the free Chordly browser extension to communicate with YouTube Music servers. Install the extension once, then sign in with your Google account.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
