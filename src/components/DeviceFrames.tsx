import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Music,
  Mic2,
  Disc3,
  Wifi,
  Battery,
  Lock,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AUDIO_EASE } from './MotionPrimitives';

/* =========================================================================
   1. Phone Mockup Frame (Android — Variation 29 Obsidian Glass Shell)
   ========================================================================= */

export interface PhoneFrameSlide {
  id: string;
  src: string;
  alt: string;
}

interface PhoneFrameProps {
  src?: string;
  alt?: string;
  slides?: ReadonlyArray<PhoneFrameSlide>;
  activeSlideId?: string;
  className?: string;
  screenClassName?: string;
  imgClassName?: string;
  badge?: string;
  variant?: 'lyrics' | 'audio' | 'player';
  trackTitle?: string;
  artistName?: string;
  eager?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  src,
  alt = 'Chordly Android Player',
  slides,
  activeSlideId,
  className = '',
  screenClassName = '',
  imgClassName = '',
  badge,
  variant = 'lyrics',
  trackTitle = 'Starboy',
  artistName = 'The Weeknd ft. Daft Punk',
  eager = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [erroredSlides, setErroredSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const hasSlides = Boolean(slides && slides.length > 0 && activeSlideId);
  const activeSlideErrored = activeSlideId ? Boolean(erroredSlides[activeSlideId]) : false;
  const showImage = hasSlides ? !activeSlideErrored : Boolean(src && !imageError);

  return (
    <div className={`relative mx-auto max-w-[300px] sm:max-w-[320px] w-full select-none ${className}`}>
      <div className="relative rounded-[28px] p-[8px] bg-[#0e0e11] border border-white/[0.14] shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
        {/* Hardware side keys */}
        <div className="absolute -left-[2px] top-24 w-[2px] h-9 bg-white/20" />
        <div className="absolute -left-[2px] top-36 w-[2px] h-9 bg-white/20" />
        <div className="absolute -right-[2px] top-28 w-[2px] h-12 bg-white/20" />

        {/* Screen Bezel */}
        <div
          className={`relative overflow-hidden rounded-[20px] bg-[#070708] border border-white/[0.08] flex flex-col ${
            showImage ? screenClassName : 'aspect-[9/19.5]'
          }`}
        >
          {showImage ? (
            hasSlides && slides ? (
              <div className="relative grid grid-cols-1 grid-rows-1 w-full bg-[#070708] overflow-hidden">
                {slides.map((slide) => {
                  const isActive = slide.id === activeSlideId;
                  return (
                    <motion.img
                      key={slide.id}
                      src={slide.src}
                      alt={slide.alt}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="async"
                      aria-hidden={!isActive}
                      onError={() =>
                        setErroredSlides((prev) => ({ ...prev, [slide.id]: true }))
                      }
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive || prefersReducedMotion ? 1 : 0.992,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.22,
                        ease: AUDIO_EASE,
                      }}
                      className={`col-start-1 row-start-1 block w-full h-auto will-change-[opacity,transform] ${
                        isActive ? 'relative z-10' : 'z-0 pointer-events-none'
                      } ${imgClassName}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="relative flex-1 min-h-0 overflow-hidden w-full bg-[#070708]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={src}
                    src={src}
                    alt={alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    initial={eager ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: AUDIO_EASE }}
                    className={imgClassName || 'block w-full h-auto'}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding={eager ? 'async' : undefined}
                  />
                </AnimatePresence>
              </div>
            )
          ) : (
            <>
              <div className="relative z-30 flex items-center justify-between px-5 pt-3 pb-1 text-[11px] text-white/60 font-mono">
                <span>09:41</span>
                <div className="w-14 h-3.5 bg-white/[0.06] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-white/60" />
                  <Battery className="w-3.5 h-3.5 text-white/60" />
                </div>
              </div>

              <div className="relative flex-1 w-full h-full flex flex-col justify-between p-5 bg-[#070708] text-white">
                <div className="flex items-center justify-between pt-1 border-b border-white/[0.08] pb-2">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-white/50">
                    {variant === 'lyrics' ? 'Synced Lyrics' : 'Bit-Perfect DAC'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[#ff2d55] text-[10px] font-mono">
                    24-BIT / 192 kHz
                  </span>
                </div>

                {variant === 'lyrics' ? (
                  <div className="space-y-4 py-4 my-auto">
                    <div className="text-white/35 text-sm">
                      I&apos;m tryna put you in the worst mood, ah
                    </div>
                    <div className="text-white/55 text-sm">
                      P1 cleaner than your church shoes, ah
                    </div>
                    <div className="p-3 bg-white/[0.04] border border-white/15 rounded-2xl">
                      <p className="text-sm font-semibold text-white leading-snug">
                        Look what you&apos;ve done, I&apos;m a motherfuckin&apos; starboy
                      </p>
                      <p className="text-xs text-[#ff2d55] font-mono mt-1">
                        Romaji / Syllable synced
                      </p>
                    </div>
                    <div className="text-white/55 text-sm">
                      Every day a nigga try to test me, ah
                    </div>
                  </div>
                ) : (
                  <div className="my-auto space-y-4">
                    <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center">
                      <Disc3 className="w-14 h-14 text-white/80" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-serif italic text-lg text-white">{trackTitle}</h4>
                      <p className="text-xs text-white/50">{artistName}</p>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                      <p className="font-mono text-[10px] uppercase text-[#ff2d55] tracking-wider">
                        Direct USB DAC Active
                      </p>
                      <p className="text-[11px] text-white/50 mt-0.5">
                        Hardware Flinger Bypassed
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff2d55] w-[62%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/50 font-mono tabular-nums">
                      <span>2:18</span>
                      <span>3:50</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-1">
                    <Mic2 className="w-4 h-4 text-[#ff2d55]" />
                    <div className="flex items-center gap-5">
                      <SkipBack className="w-4 h-4 text-white/50" />
                      <div className="w-9 h-9 rounded-full bg-white text-[#070708] flex items-center justify-center">
                        <Pause className="w-4 h-4 fill-current" />
                      </div>
                      <SkipForward className="w-4 h-4 text-white/50" />
                    </div>
                    <Volume2 className="w-4 h-4 text-white/50" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {badge && (
        <div className="mt-2.5 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-[11px]">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. Browser Mockup Frame (Web Player — Variation 29 Frosted Window)
   ========================================================================= */

export interface BrowserFrameSlide {
  id: string;
  src: string;
  alt: string;
}

interface BrowserFrameProps {
  src?: string;
  alt?: string;
  slides?: ReadonlyArray<BrowserFrameSlide>;
  activeSlideId?: string;
  className?: string;
  url?: string;
  eager?: boolean;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  src,
  alt = 'Chordly Web Player in Chrome',
  slides,
  activeSlideId,
  className = '',
  url = 'https://web-player.chordly.my.id',
  eager = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [erroredSlides, setErroredSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const hasSlides = Boolean(slides && slides.length > 0 && activeSlideId);
  const activeSlideErrored = activeSlideId ? Boolean(erroredSlides[activeSlideId]) : false;
  const showImage = hasSlides ? !activeSlideErrored : Boolean(src && !imageError);

  return (
    <div
      className={`@container relative rounded-[20px] overflow-hidden border border-white/[0.12] bg-[#070708] shadow-[0_24px_70px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Glass Browser Header */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08] select-none min-w-0">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#070708] border border-white/10 text-[11px] sm:text-xs text-white/70 flex-1 min-w-0 max-w-md mx-auto font-mono overflow-hidden">
          <Lock className="w-3 h-3 text-[#ff2d55] shrink-0" />
          <span className="truncate min-w-0">{url}</span>
        </div>

        <div className="hidden @[460px]:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/60 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55]" />
          <span>Bridge Ready</span>
        </div>
      </div>

      {showImage ? (
        hasSlides && slides ? (
          <div className="relative grid grid-cols-1 grid-rows-1 w-full bg-[#070708] overflow-hidden">
            {slides.map((slide) => {
              const isActive = slide.id === activeSlideId;
              return (
                <motion.img
                  key={slide.id}
                  src={slide.src}
                  alt={slide.alt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  aria-hidden={!isActive}
                  onError={() =>
                    setErroredSlides((prev) => ({ ...prev, [slide.id]: true }))
                  }
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive || prefersReducedMotion ? 1 : 0.994,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.22,
                    ease: AUDIO_EASE,
                  }}
                  className={`col-start-1 row-start-1 block w-full h-auto will-change-[opacity,transform] ${
                    isActive ? 'relative z-10' : 'z-0 pointer-events-none'
                  }`}
                />
              );
            })}
          </div>
        ) : (
          <div className="relative w-full overflow-hidden bg-[#070708]">
            <AnimatePresence mode="wait">
              <motion.img
                key={src}
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                initial={eager ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: AUDIO_EASE }}
                className="block w-full h-auto"
                loading={eager ? 'eager' : 'lazy'}
                decoding={eager ? 'async' : undefined}
              />
            </AnimatePresence>
          </div>
        )
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070708] flex flex-col text-white">
          <div className="flex-1 flex overflow-hidden">
            <div className="w-44 border-r border-white/[0.08] p-4 space-y-3 hidden md:block bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white font-serif italic text-base">
                <span>Chordly.</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded-lg bg-white/[0.06] text-white font-medium">Home</div>
                <div className="p-2 rounded-lg text-white/50">Explore</div>
                <div className="p-2 rounded-lg text-white/50">Library</div>
                <div className="p-2 rounded-lg text-white/50">Liked Songs</div>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden bg-[#070708]">
              <div>
                <span className="font-mono text-[10px] text-[#ff2d55] uppercase tracking-wider">
                  Live in Browser · Extension Connected
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">
                  Full YouTube Music Library
                </h3>
                <p className="text-xs text-white/50 mt-1 max-w-md">
                  Seamless streaming with your playlists, automix radio, and synced lyrics.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                {['Quick Picks', 'Chill Beats', 'Synthwave Night', 'Top 50 Global'].map((title, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="w-full aspect-square rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Music className="w-5 h-5 text-white/50" />
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{title}</p>
                    <p className="text-[10px] font-mono text-white/40">Auto Mix</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center font-serif italic text-sm text-[#ff2d55]">
                    C
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Reminder</p>
                    <p className="text-[10px] text-white/50">The Weeknd · Starboy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SkipBack className="w-4 h-4 text-white/50" />
                  <div className="w-7 h-7 rounded-full bg-white text-[#070708] flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <SkipForward className="w-4 h-4 text-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. Watch Mockup Frame (Wear OS — Variation 29 Obsidian Shell)
   ========================================================================= */

interface WatchFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  screenType?: 'playback' | 'queue';
  title?: string;
  artist?: string;
  inverted?: boolean;
}

export const WatchFrame: React.FC<WatchFrameProps> = ({
  src,
  alt = 'Chordly Wear OS Watch',
  className = '',
  screenType = 'playback',
  title = 'Starboy',
  artist = 'The Weeknd',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full p-2.5 bg-[#0e0e11] border border-white/[0.14] shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2.5 h-7 bg-white/15 rounded-r-[4px] border border-white/10" />
        <div className="absolute -right-1 top-1/3 -translate-y-1/2 w-1.5 h-4 bg-white/15 rounded-r-[4px]" />

        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070708] border border-white/10 flex flex-col items-center justify-between p-4 text-center">
          {src && !imageError ? (
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          ) : screenType === 'playback' ? (
            <div className="relative w-full h-full rounded-full flex flex-col items-center justify-between py-2 text-white bg-[#070708]">
              <div className="text-[10px] text-white/50 font-mono tabular-nums pt-1 flex items-center gap-1.5">
                <span>10:09</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#ff2d55]">98%</span>
              </div>

              <div className="px-2">
                <p className="font-serif italic text-sm text-white leading-tight truncate max-w-[120px]">
                  {title}
                </p>
                <p className="text-[10px] text-white/50 truncate max-w-[110px] mt-0.5">
                  {artist}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <SkipBack className="w-3.5 h-3.5 text-white/50" />
                <div className="w-8 h-8 rounded-full bg-white text-[#070708] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <SkipForward className="w-3.5 h-3.5 text-white/50" />
              </div>

              <div className="font-mono text-[9px] uppercase tracking-wider text-white/50 pb-1 flex items-center gap-1">
                <Volume2 className="w-2.5 h-2.5 text-[#ff2d55]" />
                <span>Watch Speaker</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full rounded-full flex flex-col justify-between py-3 px-2 text-white bg-[#070708]">
              <div className="font-mono text-[10px] text-[#ff2d55] font-medium uppercase tracking-wider">
                Up Next
              </div>
              <div className="space-y-1 text-left px-2">
                <div className="p-1.5 rounded-lg bg-white/[0.06] text-[10px] font-medium truncate">
                  1. Reminder
                </div>
                <div className="p-1 text-[10px] text-white/50 truncate">
                  2. I Feel It Coming
                </div>
                <div className="p-1 text-[10px] text-white/50 truncate">
                  3. False Alarm
                </div>
              </div>
              <div className="text-[9px] text-white/40 font-mono">
                Scroll Crown
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
