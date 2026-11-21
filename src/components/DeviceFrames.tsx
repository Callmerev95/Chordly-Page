import React, { useEffect, useState } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, 
  Music, Mic2, Disc3, Wifi, Battery, Sparkles, Lock
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AUDIO_EASE } from './MotionPrimitives';

/* =========================================================================
   1. Phone Mockup Frame (Android)
   ========================================================================= */

interface PhoneFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  screenClassName?: string;
  imgClassName?: string;
  badge?: string;
  variant?: 'lyrics' | 'audio' | 'player';
  trackTitle?: string;
  artistName?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  src,
  alt = 'Chordly Android Player',
  className = '',
  screenClassName = '',
  imgClassName = '',
  badge,
  variant = 'lyrics',
  trackTitle = 'Starboy',
  artistName = 'The Weeknd ft. Daft Punk',
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const showImage = Boolean(src && !imageError);

  return (
    <div className={`relative mx-auto max-w-[320px] sm:max-w-[340px] w-full select-none ${className}`}>
      {/* Outer Phone Shell */}
      <div className="relative rounded-[42px] p-[10px] bg-gradient-to-b from-[#2A2633] via-[#15131C] to-[#0A090F] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(255,45,85,0.25)] border border-white/10">
        
        {/* Subtle hardware side buttons */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-[#353040] rounded-l" />
        <div className="absolute -left-[3px] top-42 w-[3px] h-10 bg-[#353040] rounded-l" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#353040] rounded-r" />

        {/* Screen Bezel */}
        <div className={`relative overflow-hidden rounded-[34px] bg-[#09080E] border border-white/5 flex flex-col ${showImage ? screenClassName : 'aspect-[9/19.5]'}`}>
          
          {/* Screen Content: Either full-bleed real image asset or rich rendered mockup */}
          {showImage ? (
            <div className="relative flex-1 min-h-0 overflow-hidden w-full bg-[#09080E]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={src}
                  src={src}
                  alt={alt}
                  onError={() => setImageError(true)}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.2, ease: AUDIO_EASE }}
                  className={imgClassName || 'block w-full h-auto'}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          ) : (
            <>
              {/* Top Status Bar & Camera Punch */}
              <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] text-zinc-400 font-medium">
                <span>09:41</span>
                {/* Center camera pill */}
                <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#121118] rounded-full border border-white/10" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-zinc-400" />
                  <Battery className="w-3.5 h-3.5 text-zinc-400" />
                </div>
              </div>

              <div className="relative flex-1 w-full h-full flex flex-col justify-between p-5 bg-gradient-to-b from-[#180E1E] via-[#0E0C16] to-[#07060A] text-white">
                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                    {variant === 'lyrics' ? 'Synced Lyrics' : 'Bit-Perfect DAC'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FF2D55]/20 text-[#FF2D55] text-[10px] font-bold border border-[#FF2D55]/30">
                    24-BIT / 192 kHz
                  </span>
                </div>

                {/* Centered Content depending on variant */}
                {variant === 'lyrics' ? (
                  <div className="space-y-4 py-4 my-auto">
                    <div className="text-zinc-500 text-sm font-medium transition-all">
                      I'm tryna put you in the worst mood, ah
                    </div>
                    <div className="text-zinc-500 text-sm font-medium">
                      P1 cleaner than your church shoes, ah
                    </div>
                    {/* Active Synced Lyric with glowing gradient text */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-[0_4px_20px_rgba(255,45,85,0.2)]">
                      <p className="text-base font-bold text-white leading-snug">
                        Look what you've done, I'm a motherfuckin' starboy
                      </p>
                      <p className="text-xs text-[#FF6B8A] font-medium mt-1">
                        [Romaji / Syllable synced]
                      </p>
                    </div>
                    <div className="text-zinc-400 text-sm font-medium">
                      Every day a nigga try to test me, ah
                    </div>
                    <div className="text-zinc-500 text-sm font-medium">
                      Every day a shit that you can't see, ah
                    </div>
                  </div>
                ) : (
                  <div className="my-auto space-y-4">
                    {/* Album Cover & DAC routing graphic */}
                    <div className="relative mx-auto w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-tr from-[#FF2D55] to-[#7C5CFF] flex items-center justify-center">
                      <Disc3 className="w-16 h-16 text-white/90 animate-spin" style={{ animationDuration: '10s' }} />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-base text-white">{trackTitle}</h4>
                      <p className="text-xs text-zinc-400">{artistName}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <p className="text-[10px] uppercase font-bold text-[#4ADE80] tracking-wider flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                        Direct USB DAC Mode Active
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Hardware Flinger Bypassed · Lossless</p>
                    </div>
                  </div>
                )}

                {/* Bottom Player Controls */}
                <div className="space-y-3 pt-2">
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF2D55] to-[#FF9A62] w-[62%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>2:18</span>
                      <span>3:50</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between px-2 pb-1">
                    <Mic2 className="w-4 h-4 text-[#FF2D55]" />
                    <div className="flex items-center gap-5">
                      <SkipBack className="w-5 h-5 text-zinc-300" />
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                        <Pause className="w-5 h-5 fill-current" />
                      </div>
                      <SkipForward className="w-5 h-5 text-zinc-300" />
                    </div>
                    <Volume2 className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>

              </div>

              {/* Bottom gesture pill */}
              <div className="relative z-30 pb-2 flex justify-center">
                <div className="w-28 h-1 bg-white/30 rounded-full" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Badge if specified */}
      {badge && (
        <div className="absolute -top-3 right-4 z-40 px-3.5 py-1 rounded-full bg-[#FF2D55] text-white text-xs font-bold shadow-lg border border-white/20 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {badge}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. Browser Mockup Frame (Web Player)
   ========================================================================= */

interface BrowserFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  url?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  src,
  alt = 'Chordly Web Player in Chrome',
  className = '',
  url = 'https://web-player.chordly.my.id',
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <div className={`@container relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E0C12] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] ${className}`}>
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#15131C] border-b border-white/10 select-none min-w-0">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shrink-0" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shrink-0" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shrink-0" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#07060A] border border-white/10 text-[11px] sm:text-xs text-zinc-300 flex-1 min-w-0 max-w-sm mx-auto font-mono overflow-hidden">
          <Lock className="w-3 h-3 text-[#4ADE80] shrink-0" />
          <span className="truncate min-w-0">{url}</span>
        </div>

        {/* Browser Extension Indicator */}
        <div className="hidden @[460px]:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-zinc-400 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
          <span>Extension Active</span>
        </div>
      </div>

      {/* Screen Area */}
      {src && !imageError ? (
        <div className="relative w-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={src}
              src={src}
              alt={alt}
              onError={() => setImageError(true)}
              initial={{ opacity: 0, y: 6, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.99 }}
              transition={{ duration: 0.22, ease: AUDIO_EASE }}
              className="block w-full h-auto"
              loading="lazy"
            />
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07060A] flex flex-col text-white">
          {/* Main Web Player Workspace */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Nav Column */}
            <div className="w-44 border-r border-white/10 p-4 space-y-4 hidden md:block bg-[#0B0910]">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <div className="w-5 h-5 rounded-md bg-[#FF2D55] flex items-center justify-center text-[10px]">C</div>
                <span>Chordly Web</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded-lg bg-white/10 text-white font-medium">Home</div>
                <div className="p-2 rounded-lg text-zinc-400 hover:text-white">Explore</div>
                <div className="p-2 rounded-lg text-zinc-400 hover:text-white">Library</div>
                <div className="p-2 rounded-lg text-zinc-400 hover:text-white">Liked Songs</div>
              </div>
            </div>

            {/* Center Player / Grid */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1A0E22]/50 via-[#07060A] to-[#07060A]">
              <div>
                <span className="text-[11px] font-bold text-[#FF2D55] uppercase tracking-wider">
                  Live in Browser · Extension Connected
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Full YouTube Music Library
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-md">
                  Seamless streaming with your playlists, automix radio, and synced lyrics rendered in pure HTML5.
                </p>
              </div>

              {/* Mini cards preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                {['Quick Picks', 'Chill Beats', 'Synthwave Night', 'Top 50 Global'].map((title, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-2">
                    <div className="w-full aspect-square rounded-lg bg-gradient-to-tr from-white/10 to-[#FF2D55]/20 flex items-center justify-center">
                      <Music className="w-5 h-5 text-white/50" />
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{title}</p>
                    <p className="text-[10px] text-zinc-500">Auto Mix</p>
                  </div>
                ))}
              </div>

              {/* Bottom Playback bar inside web player */}
              <div className="p-3 rounded-xl bg-[#14121A] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#FF2D55] flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Reminder</p>
                    <p className="text-[10px] text-zinc-400">The Weeknd · Starboy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SkipBack className="w-4 h-4 text-zinc-400" />
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <SkipForward className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-zinc-400">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-16 h-1 bg-white/20 rounded-full">
                    <div className="w-3/4 h-full bg-white rounded-full" />
                  </div>
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
   3. Watch Mockup Frame (Wear OS)
   ========================================================================= */

interface WatchFrameProps {
  src?: string;
  alt?: string;
  className?: string;
  screenType?: 'playback' | 'queue';
  title?: string;
  artist?: string;
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
      {/* Outer Watch Case */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-b from-[#2E2A36] via-[#1B1922] to-[#111016] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(255,45,85,0.2)] border border-white/10">
        
        {/* Digital Crown on the right side */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#3E384A] rounded-r-md border border-white/10 shadow-md" />
        {/* Secondary button */}
        <div className="absolute -right-1 top-1/3 -translate-y-1/2 w-2 h-5 bg-[#2B2735] rounded-r-sm border border-white/5" />

        {/* Watch Face Screen */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-between p-4 text-center">
          
          {src && !imageError ? (
            <img
              src={src}
              alt={alt}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          ) : screenType === 'playback' ? (
            <div className="relative w-full h-full rounded-full flex flex-col items-center justify-between py-2 text-white bg-gradient-to-b from-[#1C0F22] via-[#0D0B12] to-black">
              {/* Watch Time & Battery */}
              <div className="text-[10px] text-zinc-400 font-mono tracking-wider pt-1 flex items-center gap-1.5">
                <span>10:09</span>
                <span className="w-1 h-1 rounded-full bg-[#FF2D55]" />
                <span className="text-[#4ADE80]">98%</span>
              </div>

              {/* Track Info */}
              <div className="px-2">
                <p className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                  {title}
                </p>
                <p className="text-[10px] text-[#FF6B8A] truncate max-w-[110px] mt-0.5">
                  {artist}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <SkipBack className="w-3.5 h-3.5 text-zinc-400" />
                <div className="w-8 h-8 rounded-full bg-[#FF2D55] text-white flex items-center justify-center shadow-lg">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <SkipForward className="w-3.5 h-3.5 text-zinc-400" />
              </div>

              {/* Speaker / Device indicator */}
              <div className="text-[9px] font-semibold text-zinc-400 pb-1 flex items-center gap-1">
                <Volume2 className="w-2.5 h-2.5 text-[#FF2D55]" />
                <span>Watch Speaker</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full rounded-full flex flex-col justify-between py-3 px-2 text-white bg-[#0A0910]">
              <div className="text-[10px] text-[#FF2D55] font-bold uppercase tracking-wider">
                Up Next
              </div>
              <div className="space-y-1 text-left px-2">
                <div className="p-1 rounded bg-white/10 text-[10px] font-semibold truncate">
                  1. Reminder
                </div>
                <div className="p-1 rounded text-[10px] text-zinc-400 truncate">
                  2. I Feel It Coming
                </div>
                <div className="p-1 rounded text-[10px] text-zinc-400 truncate">
                  3. False Alarm
                </div>
              </div>
              <div className="text-[9px] text-zinc-500 font-mono">
                Scroll Crown
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
