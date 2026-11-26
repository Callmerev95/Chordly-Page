import React, { useState } from 'react';
import { Download, ExternalLink, Disc3 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { AUDIO_EASE, DeviceFloat } from './MotionPrimitives';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [heroImageError, setHeroImageError] = useState(false);

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
      title: 'Android TV',
      desc: 'Living-room experience built for D-pad remotes with full-screen synced lyrics and rich album artwork.',
      href: '#install-tv',
    },
    {
      title: 'Web Player',
      desc: 'Full YouTube Music library access via browser extension bridge with synced lyrics and Discord RPC.',
      href: '#web-player',
    },
  ];

  const heroEnter = (delay = 0, y = 12) =>
    prefersReducedMotion
      ? undefined
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.34, delay, ease: AUDIO_EASE },
        };

  return (
    <section id="hero" className="relative overflow-x-clip pt-28 sm:pt-32 lg:pt-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Variation 29 Balanced Split Hero (6 / 6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center pb-16 sm:pb-20">
          {/* Left Column: Editorial Serif Hero */}
          <div className="lg:col-span-6 space-y-7 max-w-[580px] mx-auto lg:mx-0 text-center lg:text-left">
            <motion.span
              {...heroEnter(0, 10)}
              className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]"
            >
              Bit-Perfect Audio Engine · Open Source
            </motion.span>

            <motion.h1
              {...heroEnter(0.05, 14)}
              className="font-serif font-normal text-[clamp(3.25rem,6vw,5.75rem)] leading-[0.94] tracking-[-0.045em] text-white text-balance"
            >
              Feel every <br className="hidden sm:block" />
              <span className="italic text-white">lyric.</span>
            </motion.h1>

            <motion.p
              {...heroEnter(0.1, 12)}
              className="text-[17px] sm:text-[18px] leading-[1.6] text-white/55 max-w-[480px] mx-auto lg:mx-0"
            >
              A modern, open-source music engine for Android, Wear OS, Android TV, and the web. Precision synced lyrics with romanization and bit-perfect 24-bit / 192 kHz audio output.
            </motion.p>

            {/* Primary Pill CTAs */}
            <motion.div
              {...heroEnter(0.15, 10)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1"
            >
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
            </motion.div>
          </div>

          {/* Right Column: Floating Triple-Phone Visual Showcase */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: AUDIO_EASE }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            {!heroImageError ? (
              <DeviceFloat amplitude={6} duration={6.4} className="w-full flex justify-center">
                <div className="relative w-full max-w-[680px] lg:max-w-none lg:w-[106%] lg:shrink-0 aspect-[1.32/1] overflow-hidden mx-auto select-none">
                  <img
                    src="/assets/chordly/hero.webp"
                    alt="Chordly mobile interface showing synced lyrics, now playing controls, and album library"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    onError={() => setHeroImageError(true)}
                    className="relative z-10 block w-full h-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24%] backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_55%,transparent_100%)]"
                  />
                </div>
              </DeviceFloat>
            ) : (
              <div className="relative z-10 aspect-video w-full max-w-[640px] rounded-[24px] border border-white/10 bg-[#070708]/80 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="grid size-12 place-items-center rounded-full bg-white/[0.06] border border-white/10 text-[#ff2d55]">
                  <Disc3 className="w-5 h-5" />
                </div>
                <p className="font-serif italic text-xl text-white">Chordly Mobile Suite</p>
                <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/45">
                  Synced Lyrics · Now Playing · Library
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Variation 29 Bottom 4-Column Hairline Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/[0.08]">
          {platformSummary.map((cell, idx) => {
            const borderClasses =
              idx === 0
                ? 'md:border-r md:border-white/[0.08] md:pr-8 lg:pr-8'
                : idx === 1
                  ? 'border-t md:border-t-0 border-white/[0.08] md:pl-8 lg:border-r lg:border-white/[0.08] lg:px-8'
                  : idx === 2
                    ? 'border-t lg:border-t-0 border-white/[0.08] md:border-r md:border-white/[0.08] md:pr-8 lg:px-8'
                    : 'border-t lg:border-t-0 border-white/[0.08] md:pl-8 lg:pl-8';

            return (
              <motion.a
                key={cell.title}
                href={cell.href}
                {...heroEnter(0.16 + idx * 0.04, 10)}
                className={`group py-7 md:py-9 ${borderClasses} block transition-colors`}
              >
                <h3 className="font-serif italic font-normal text-[24px] text-white group-hover:text-[#ff2d55] transition-colors mb-2.5">
                  {cell.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-white/45 group-hover:text-white/70 transition-colors">
                  {cell.desc}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
