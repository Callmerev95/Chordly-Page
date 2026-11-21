import React, { useRef, useState } from 'react';
import { Download, ExternalLink, Activity, Mic2, ArrowDown, Sparkles, BarChart2, ListMusic, Disc3, Layers, Plug } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { PhoneFrame } from './DeviceFrames';
import { EqualizerBars, PILL_SPRING, AUDIO_EASE } from './MotionPrimitives';

export const HeroSection: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'now_playing' | 'lyrics' | 'replay' | 'queue'>('now_playing');
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const glowY = useTransform(smoothProgress, [0, 1], [0, 24]);
  const heroWaveY = useTransform(smoothProgress, [0, 1], [0, 36]);
  const phoneY = useTransform(smoothProgress, [0, 1], [0, -35]);
  const chipTopY = useTransform(smoothProgress, [0, 1], [0, -52]);
  const chipBottomY = useTransform(smoothProgress, [0, 1], [0, -64]);
  const chipOfflineY = useTransform(smoothProgress, [0, 1], [0, -44]);
  const chipGlassY = useTransform(smoothProgress, [0, 1], [0, -58]);
  const chipPluggableY = useTransform(smoothProgress, [0, 1], [0, -72]);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const screens = [
    {
      id: 'now_playing' as const,
      label: 'Now Playing',
      badge: 'Hi-Res Lossless',
      subtext: 'ILYSB (STRIPPED) · LANY',
      src: '/assets/aistudio/assets-mobile-now-playing.webp',
      icon: Disc3,
      glow: 'from-[#FF2D55]/30 via-[#FF6B8A]/20 to-transparent',
    },
    {
      id: 'lyrics' as const,
      label: 'Synced Lyrics',
      badge: 'Live Syllables',
      subtext: 'Real-time karaoke tracking',
      src: '/assets/aistudio/assets-mobile-lyrics.webp',
      icon: Mic2,
      glow: 'from-[#FF6B8A]/30 via-[#7C5CFF]/20 to-transparent',
    },
    {
      id: 'queue' as const,
      label: 'Smart Queue',
      badge: 'AutoPlay Active',
      subtext: 'Sanctuary · Joji',
      src: '/assets/aistudio/assets-mobile-queue.webp',
      icon: ListMusic,
      glow: 'from-[#7C5CFF]/30 via-[#FF2D55]/20 to-transparent',
    },
    {
      id: 'replay' as const,
      label: '2026 Replay',
      badge: '201 Mins Listened',
      subtext: 'Monthly personal breakdown',
      src: '/assets/aistudio/assets-mobile-replay.webp',
      icon: BarChart2,
      glow: 'from-[#FF9A62]/30 via-[#FF2D55]/20 to-transparent',
    },
  ];

  const current = screens.find((s) => s.id === activeScreen) || screens[0];

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[86vh] lg:min-h-[92vh] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 flex flex-col justify-between overflow-hidden mesh-radial-hero"
    >
      {/* Hero Background Parallax Accent: Subtle Acoustic Soundwave & Glow */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: heroWaveY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none will-change-transform"
      >
        <div className="absolute -top-20 left-[10%] w-[360px] h-[360px] rounded-full bg-[#FF2D55]/[0.07] blur-[110px]" />
        <svg
          viewBox="0 0 1440 420"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[22%] w-full h-[320px] sm:h-[420px] opacity-[0.11]"
        >
          <defs>
            <linearGradient id="hero-wave-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0" />
              <stop offset="25%" stopColor="#FF2D55" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#FF9A62" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#7C5CFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 210 C 200 100, 420 320, 640 205 C 860 90, 1080 310, 1300 190 C 1380 150, 1420 180, 1440 195"
            stroke="url(#hero-wave-accent)"
            strokeWidth="1.4"
          />
          <path
            d="M0 245 C 220 155, 440 335, 680 225 C 920 115, 1120 295, 1440 205"
            stroke="url(#hero-wave-accent)"
            strokeWidth="0.9"
            strokeOpacity="0.55"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (55% on desktop: 7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* H1 Heading */}
            <h1 className="text-[34px] sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.08] text-balance">
              Feel every lyric.{' '}
              <span className="bg-gradient-to-r from-[#FF2D55] via-[#FF6B8A] to-[#FF9A62] bg-clip-text text-transparent">
                Enjoy every note.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-normal">
              A modern YouTube Music player for Android, Wear OS, and the web. Synced lyrics with romanization, colors that move with the album, and Bit-Perfect audio for the music you actually care about.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#install"
                className="btn-primary w-full sm:w-auto px-6 py-3 whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download for Android</span>
              </a>

              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto px-6 py-3 whitespace-nowrap"
              >
                <span>Open Web Player</span>
                <ExternalLink className="w-4 h-4 text-zinc-400 shrink-0" />
              </a>
            </div>

            {/* Interactive Screen Tabs */}
            <div className="pt-2 sm:pt-4">
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2D55] shrink-0" />
                <span>Explore Mobile App Experience:</span>
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
                      className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-colors duration-200 border whitespace-nowrap ${
                        isActive
                          ? 'text-white border-transparent'
                          : 'bg-white/[0.04] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="hero-screen-pill"
                          transition={PILL_SPRING}
                          className="absolute inset-0 rounded-xl bg-white/[0.12] border border-[#FF2D55]/60 shadow-[0_0_20px_rgba(255,45,85,0.25)]"
                        />
                      )}
                      <Icon className={`relative z-10 w-3.5 h-3.5 transition-colors shrink-0 ${isActive ? 'text-[#FF2D55]' : 'text-zinc-400'}`} />
                      <span className="relative z-10">{screen.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (45% on desktop: 5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Dynamic Ambient Radial Glow (Parallax Layer 1 - Background) */}
            <motion.div
              style={prefersReducedMotion ? undefined : { y: glowY }}
              className={`absolute inset-0 -m-8 rounded-full bg-gradient-to-tr ${current.glow} blur-3xl pointer-events-none transition-colors duration-700`}
            />

            {/* Interactive Phone Mockup with layered scroll parallax & floating effect */}
            <div className="relative z-10 w-[233px] sm:w-[246px] mx-auto flex justify-center">
              <motion.div
                style={prefersReducedMotion ? undefined : { y: phoneY }}
                className="w-full"
              >
                <motion.div 
                  animate={prefersReducedMotion ? undefined : {
                    y: [-8, 8, -8],
                    rotate: [-0.6, 0.6, -0.6],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full"
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.025, rotate: 0.7, y: -4 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className="relative w-full cursor-pointer group will-change-transform"
                    onClick={() => {
                      const currentIndex = screens.findIndex(s => s.id === activeScreen);
                      const nextIndex = (currentIndex + 1) % screens.length;
                      setActiveScreen(screens[nextIndex].id);
                    }} 
                    title="Click to preview next screen"
                  >
                    <PhoneFrame 
                      src={current.src}
                      trackTitle={current.subtext}
                      artistName="Chordly Android Client"
                      screenClassName="w-[211px] h-[480px] sm:w-[224px] sm:h-[510px]"
                      imgClassName="block w-full h-full object-cover"
                    />
                    {/* Subtle Glass Specular Sheen on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[10px] rounded-[34px] overflow-hidden z-20"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-tr from-transparent via-white/[0.11] to-transparent opacity-0 group-hover:opacity-100" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating Glass Chip 1: Lossless Audio + Live Equalizer (Parallax Layer 3 - Foreground) */}
              <motion.div 
                style={{
                  backgroundColor: 'rgba(12, 10, 18, 0.80)',
                  ...(prefersReducedMotion ? {} : { y: chipTopY }),
                }}
                onClick={() => setActiveScreen('now_playing')}
                className="absolute -left-5 sm:-left-16 lg:-left-24 top-[22%] z-30 p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl liquid-glass-elevated flex items-center gap-2 sm:gap-2.5 shadow-xl cursor-pointer hover:border-[#4ADE80]/50 transition-[scale,border-color] duration-200 hover:scale-[1.02] select-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#4ADE80]/20 border border-[#4ADE80]/30 flex items-center justify-center text-[#4ADE80] shrink-0">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white leading-none whitespace-nowrap">Lossless Audio</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight whitespace-nowrap">Bit-perfect 24/192</div>
                </div>
                <EqualizerBars color="#4ADE80" active className="ml-0.5 sm:ml-1" />
              </motion.div>

              {/* Floating Glass Chip 2: Synced Lyrics (Parallax Layer 3 - Foreground) */}
              <motion.div 
                style={{
                  backgroundColor: 'rgba(12, 10, 18, 0.80)',
                  ...(prefersReducedMotion ? {} : { y: chipBottomY }),
                }}
                onClick={() => setActiveScreen('lyrics')}
                className="absolute -right-5 sm:-right-16 lg:-right-24 top-[43%] z-30 p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl liquid-glass-elevated flex items-center gap-2 sm:gap-2.5 shadow-xl cursor-pointer hover:border-[#FF2D55]/50 transition-[scale,border-color] duration-200 hover:scale-[1.02] select-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#FF2D55]/20 border border-[#FF2D55]/30 flex items-center justify-center text-[#FF2D55] shrink-0">
                  <Mic2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white leading-none whitespace-nowrap">Live Lyrics</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight whitespace-nowrap">Syllable Synced</div>
                </div>
              </motion.div>

              {/* Floating Glass Chip 3: Offline Downloads */}
              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.14, ease: AUDIO_EASE }}
                style={{
                  backgroundColor: 'rgba(12, 10, 18, 0.80)',
                  ...(prefersReducedMotion ? {} : { y: chipOfflineY }),
                }}
                onClick={scrollToFeatures}
                className="absolute -right-5 sm:-right-16 lg:-right-24 top-[7%] z-30 p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl liquid-glass-elevated flex items-center gap-2 sm:gap-2.5 shadow-xl cursor-pointer hover:border-[#FF9A62]/50 transition-colors duration-200 select-none text-left will-change-transform"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#FF9A62]/20 border border-[#FF9A62]/30 flex items-center justify-center text-[#FF9A62] shrink-0">
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white leading-none whitespace-nowrap">Offline Downloads</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight whitespace-nowrap">Embedded Metadata</div>
                </div>
              </motion.button>

              {/* Floating Glass Chip 4: Frosted-glass UI */}
              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.24, ease: AUDIO_EASE }}
                style={{
                  backgroundColor: 'rgba(12, 10, 18, 0.80)',
                  ...(prefersReducedMotion ? {} : { y: chipGlassY }),
                }}
                onClick={scrollToFeatures}
                className="absolute -left-5 sm:-left-16 lg:-left-24 bottom-[25%] z-30 p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl liquid-glass-elevated flex items-center gap-2 sm:gap-2.5 shadow-xl cursor-pointer hover:border-[#7C5CFF]/50 transition-colors duration-200 select-none text-left will-change-transform"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] shrink-0">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white leading-none whitespace-nowrap">Frosted-glass UI</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight whitespace-nowrap">Haze · Material 3</div>
                </div>
              </motion.button>

              {/* Floating Glass Chip 5: Pluggable Sources */}
              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.34, ease: AUDIO_EASE }}
                style={{
                  backgroundColor: 'rgba(12, 10, 18, 0.80)',
                  ...(prefersReducedMotion ? {} : { y: chipPluggableY }),
                }}
                onClick={scrollToFeatures}
                className="absolute -right-5 sm:-right-16 lg:-right-24 bottom-[7%] z-30 p-2 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl liquid-glass-elevated flex items-center gap-2 sm:gap-2.5 shadow-xl cursor-pointer hover:border-[#38BDF8]/50 transition-colors duration-200 select-none text-left will-change-transform"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Plug className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white leading-none whitespace-nowrap">Pluggable Sources</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight whitespace-nowrap">Custom FLAC Modules</div>
                </div>
              </motion.button>

            </div>

          </div>

        </div>
      </div>

      {/* Subtle Scroll Cue at bottom */}
      <div className="pt-12 text-center">
        <a
          href="#platforms"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-200 py-1 px-3 rounded-full hover:bg-white/[0.04]"
        >
          <span>See what’s inside</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF2D55] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
