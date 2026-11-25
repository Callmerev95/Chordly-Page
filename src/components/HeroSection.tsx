import React, { useState } from 'react';
import {
  Download,
  ExternalLink,
  Disc3,
  Mic2,
  ListMusic,
  BarChart2,
} from 'lucide-react';
import { PhoneFrame } from './DeviceFrames';

export const HeroSection: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'now_playing' | 'lyrics' | 'replay' | 'queue'>(
    'now_playing'
  );

  const screens = [
    {
      id: 'now_playing' as const,
      label: 'Now Playing',
      code: '0x2A94F',
      subtext: 'ILYSB (STRIPPED) · LANY',
      src: '/assets/aistudio/assets-mobile-now-playing.webp',
      icon: Disc3,
    },
    {
      id: 'lyrics' as const,
      label: 'Synced Lyrics',
      code: '0x12LRC',
      subtext: 'Real-time syllable tracking',
      src: '/assets/aistudio/assets-mobile-lyrics.webp',
      icon: Mic2,
    },
    {
      id: 'queue' as const,
      label: 'Smart Queue',
      code: '0x08QUE',
      subtext: 'Sanctuary · Joji',
      src: '/assets/aistudio/assets-mobile-queue.webp',
      icon: ListMusic,
    },
    {
      id: 'replay' as const,
      label: '2026 Replay',
      code: '0x201MN',
      subtext: 'Personal listening metrics',
      src: '/assets/aistudio/assets-mobile-replay.webp',
      icon: BarChart2,
    },
  ];

  const current = screens.find((s) => s.id === activeScreen) || screens[0];

  const platformSummary = [
    {
      title: 'Android',
      desc: 'Native client with offline playback, 7-band EQ, and bit-perfect USB DAC routing for audiophiles.',
      href: '#install',
    },
    {
      title: 'Wear OS',
      desc: 'Compact ~4.5 MB wrist companion. Control queues or stream directly through your watch speaker.',
      href: '#wear-os',
    },
    {
      title: 'Web Player',
      desc: 'Full YouTube Music library access via browser extension bridge with synced lyrics and Discord RPC.',
      href: '#web-player',
    },
  ];

  return (
    <section id="hero" className="relative pt-28 sm:pt-32 lg:pt-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Variation 29 Split Hero (1.2fr / 0.8fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center pb-16 sm:pb-20">
          {/* Left Column: Editorial Serif Hero */}
          <div className="lg:col-span-7 space-y-7 max-w-[680px]">
            <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]">
              Bit-Perfect Audio Engine · Open Source
            </span>

            <h1 className="font-serif font-normal text-[clamp(3.6rem,7.2vw,6.75rem)] leading-[0.92] tracking-[-0.045em] text-white text-balance">
              Feel every <br className="hidden sm:block" />
              <span className="italic text-white">lyric.</span>
            </h1>

            <p className="text-[17px] sm:text-[18px] leading-[1.6] text-white/55 max-w-[460px]">
              A modern, open-source music engine for Android, Wear OS, and the web. Precision synced lyrics with romanization and bit-perfect 24-bit / 192 kHz audio output.
            </p>

            {/* Primary Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#install" className="btn-primary px-6 py-3">
                <Download className="w-4 h-4 shrink-0" />
                <span>Get Chordly</span>
              </a>

              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3"
              >
                <span>Open Web Player</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/60 shrink-0" />
              </a>
            </div>

            {/* Screen Switcher Controls */}
            <div className="pt-2 space-y-2.5">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                Preview Interface · {current.subtext}
              </div>
              <div className="flex flex-wrap gap-2">
                {screens.map((screen) => {
                  const Icon = screen.icon;
                  const isActive = activeScreen === screen.id;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => setActiveScreen(screen.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors whitespace-nowrap shrink-0 border ${
                        isActive
                          ? 'bg-white text-[#070708] border-white font-semibold'
                          : 'bg-white/[0.03] text-white/60 border-white/[0.12] hover:text-white hover:border-white/25'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#ff2d55]' : ''}`} />
                      <span>{screen.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Variation 29 Frosted Glass Visual Frame */}
          <div className="lg:col-span-5">
            <div className="v29-glass-frame rounded-[36px] p-6 sm:p-8 flex items-center justify-center">
              {/* Embedded Interactive Phone Preview */}
              <div
                onClick={() => {
                  const idx = screens.findIndex((s) => s.id === activeScreen);
                  setActiveScreen(screens[(idx + 1) % screens.length].id);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const idx = screens.findIndex((s) => s.id === activeScreen);
                    setActiveScreen(screens[(idx + 1) % screens.length].id);
                  }
                }}
                aria-label="Cycle mobile app preview screens"
                title="Click to preview next screen"
                className="relative z-10 w-full max-w-[260px] mx-auto cursor-pointer group focus:outline-none"
              >
                <PhoneFrame
                  src={current.src}
                  alt={`Chordly ${current.label}`}
                  trackTitle={current.subtext}
                  artistName="Chordly Android"
                  screenClassName="aspect-[9/19.5]"
                  imgClassName="block w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Variation 29 Bottom 3-Column Hairline Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.08]">
          {platformSummary.map((cell, idx) => (
            <a
              key={cell.title}
              href={cell.href}
              className={`group py-8 md:py-10 ${
                idx < 2 ? 'md:border-r md:border-white/[0.08] md:pr-10' : ''
              } ${idx > 0 ? 'border-t md:border-t-0 border-white/[0.08] md:pl-10' : ''} block transition-colors`}
            >
              <h3 className="font-serif italic font-normal text-[24px] text-white group-hover:text-[#ff2d55] transition-colors mb-2.5">
                {cell.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-white/45 group-hover:text-white/70 transition-colors">
                {cell.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
