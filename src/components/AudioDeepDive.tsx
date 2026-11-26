import React, { useState } from 'react';
import { Activity, Sliders, ShieldCheck, Cpu, Database, RefreshCw, Disc3 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PhoneFrame, type PhoneFrameSlide } from './DeviceFrames';
import { DeviceFloat, ScrollParallax, ScrollReveal, AUDIO_EASE, PILL_SPRING } from './MotionPrimitives';

type AudioTabId = 'lossless' | 'equalizer' | 'playback' | 'sources';

export const AudioDeepDive: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<AudioTabId>('lossless');
  const [eqPreset, setEqPreset] = useState<'Hip-hop' | 'Audiophile' | 'Bass' | 'Flat'>('Hip-hop');
  const [eqBands, setEqBands] = useState<number[]>([6, 4, 0.5, -1, 0.5, 2, 2.5]);
  const [losslessTier, setLosslessTier] = useState<'hires' | 'cd' | 'standard'>('hires');
  const [outputPrecision, setOutputPrecision] = useState<'16-bit PCM' | '32-bit float'>('16-bit PCM');
  const [dacToggles, setDacToggles] = useState({
    preferUsbDac: true,
    convertLowerSpec: true,
    loudnessNorm: true,
    disableSpeaker: true,
  });
  const [sourceToggles, setSourceToggles] = useState({
    hiresModule: true,
    mirrorModule: true,
    customWebDav: false,
  });

  const presets: Record<string, number[]> = {
    'Hip-hop': [6, 4, 0.5, -1, 0.5, 2, 2.5],
    Audiophile: [1.5, 0.5, 0, 0, 0.5, 1, 2],
    Bass: [8, 6, 2, 0, -1, 1, 1],
    Flat: [0, 0, 0, 0, 0, 0, 0],
  };

  const handlePresetChange = (presetName: 'Hip-hop' | 'Audiophile' | 'Bass' | 'Flat') => {
    setEqPreset(presetName);
    setEqBands(presets[presetName]);
  };

  const handleBandChange = (index: number, val: number) => {
    const updated = [...eqBands];
    updated[index] = val;
    setEqBands(updated);
  };

  const frequencies = ['60Hz', '150Hz', '400Hz', '1kHz', '2.5kHz', '6kHz', '14kHz'];

  const losslessTiers = {
    hires: {
      label: 'Hi-Res Lossless',
      spec: '24-bit / 192 kHz FLAC',
      bitrate: '~4,608 kbps',
      note: 'Bit-for-bit studio master container with full harmonic headroom and zero lossy compression.',
    },
    cd: {
      label: 'CD Lossless',
      spec: '16-bit / 44.1 kHz FLAC',
      bitrate: '~1,411 kbps',
      note: 'Red Book uncompressed FLAC ideal for offline caching and balanced mobile storage.',
    },
    standard: {
      label: 'Standard Fallback',
      spec: 'Opus / AAC Stream',
      bitrate: '256 kbps',
      note: 'Seamless YouTube Music fallback whenever a lossless module is unavailable or offline.',
    },
  } as const;

  const tabOrder: AudioTabId[] = ['lossless', 'equalizer', 'playback', 'sources'];

  const tabData: Record<
    AudioTabId,
    {
      title: string;
      desc: string;
      src: string;
      alt: string;
    }
  > = {
    lossless: {
      title: 'Hi-Res Lossless & FLAC Playback',
      desc: 'Displays verified Hi-Res Lossless status directly on the Now Playing stage with album artwork, inline synced lyrics preview, and direct output routing.',
      src: '/assets/chordly/lossless.webp',
      alt: 'Chordly Hi-Res Lossless FLAC Now Playing Screen',
    },
    equalizer: {
      title: 'Built-in 7-Band Precision Equalizer',
      desc: 'Shapes the sound inside Chordly before it reaches the system. Supports manual dB adjustments, Dynamic/Manual switching, and real-time preset curves without distortion.',
      src: '/assets/chordly/equalizer.webp',
      alt: 'Chordly 7-Band Equalizer Interface',
    },
    playback: {
      title: 'Direct USB DAC & Bit-Perfect Settings',
      desc: 'Toggle between 16-bit PCM and 32-bit float, bypass the Android mixer completely, enable loudness normalization, or configure 4s crossfade and speaker safeguards.',
      src: '/assets/chordly/playback.webp',
      alt: 'Chordly Playback & Bit-Perfect USB DAC Settings',
    },
    sources: {
      title: 'Pluggable FLAC Modules & Fallback',
      desc: 'Prioritize custom FLAC modules in your preferred order—streaming 24-bit Hi-Res FLAC and lossless sources first, with YouTube Music audio streams as seamless fallback.',
      src: '/assets/chordly/flac_sources.webp',
      alt: 'Chordly Pluggable FLAC Sources Configuration',
    },
  };

  const phoneSlides: PhoneFrameSlide[] = tabOrder.map((id) => ({
    id,
    src: tabData[id].src,
    alt: tabData[id].alt,
  }));

  const currentTier = losslessTiers[losslessTier];
  const panelTransition = {
    duration: prefersReducedMotion ? 0 : 0.2,
    ease: AUDIO_EASE,
  };

  return (
    <section id="audio" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center lg:items-start">
          {/* Left Column: Device Preview & 2x2 Tab Switcher */}
          <ScrollReveal delay={0.08} x={-16} y={18} className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.12] mb-7 w-full max-w-[390px]">
              {(
                [
                  { id: 'lossless', label: 'Lossless / FLAC', icon: Disc3 },
                  { id: 'equalizer', label: 'Equalizer', icon: Sliders },
                  { id: 'playback', label: 'DAC Settings', icon: Cpu },
                  { id: 'sources', label: 'FLAC Sources', icon: Database },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={isActive}
                    className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[10px] font-mono text-[11px] uppercase tracking-[0.05em] transition-colors whitespace-nowrap min-h-[40px] ${
                      isActive
                        ? 'text-[#070708] font-semibold'
                        : 'text-white/55 hover:text-white font-normal hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="audio-tab-indicator"
                        transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                        className="absolute inset-0 rounded-[10px] bg-white"
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <ScrollParallax offsetRange={[26, -22]} className="w-full flex justify-center">
              <DeviceFloat amplitude={5} duration={6.0} phaseDelay={0.2} className="w-full flex justify-center">
                <PhoneFrame
                  slides={phoneSlides}
                  activeSlideId={activeTab}
                  trackTitle="Twenty Eight"
                  artistName="The Weeknd"
                />
              </DeviceFloat>
            </ScrollParallax>
          </ScrollReveal>

          {/* Right Column: Audio Engineering Details & Per-Tab Interactive Panel */}
          <ScrollReveal x={16} y={18} amount={0.08} className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Activity className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Audio Architecture · 24-bit / 192 kHz</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Sound that <span className="italic">respects</span> your gear.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Standard Android audio resamples everything to 48 kHz. Chordly&apos;s Bit-Perfect mode talks directly to your USB DAC, delivering uncompressed FLAC and bit-for-bit audio up to 24-bit / 192 kHz without system interference.
            </p>

            {/* Single-Cell Grid Stack: Guarantees Constant Card Height & Zero-Glitch Crossfade */}
            <div className="p-5 sm:p-6 rounded-[24px] v29-glass-card">
              <div className="grid grid-cols-1 grid-rows-1">
                {/* Panel 1: Lossless / FLAC */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeTab === 'lossless' ? 1 : 0,
                    y: activeTab === 'lossless' || prefersReducedMotion ? 0 : 4,
                  }}
                  transition={panelTransition}
                  aria-hidden={activeTab !== 'lossless'}
                  className={`col-start-1 row-start-1 space-y-5 flex flex-col justify-between will-change-[opacity,transform] ${
                    activeTab === 'lossless'
                      ? 'relative z-10 pointer-events-auto'
                      : 'z-0 pointer-events-none select-none'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Disc3 className="w-4 h-4 text-[#ff2d55] shrink-0" />
                      <span className="text-[14px] font-semibold text-white">
                        Lossless / FLAC Signal Stage
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-white/45">
                      Hi-Res · Bit-Exact
                    </span>
                  </div>

                  <p className="text-[14px] leading-[1.65] text-white/65">
                    When a lossless source matches the active track, Chordly decodes native FLAC frames straight into the player stage—surfacing verified Hi-Res Lossless quality, inline lyric previews, and lossless hardware routing right on the Now Playing screen.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'hires', label: 'Hi-Res FLAC' },
                        { id: 'cd', label: 'CD FLAC' },
                        { id: 'standard', label: 'YT Fallback' },
                      ] as const
                    ).map((tier) => {
                      const isSelected = losslessTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          tabIndex={activeTab === 'lossless' ? 0 : -1}
                          onClick={() => setLosslessTier(tier.id)}
                          aria-pressed={isSelected}
                          className={`relative px-3 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-[0.06em] transition-colors border whitespace-nowrap ${
                            isSelected
                              ? 'text-[#070708] border-transparent font-semibold'
                              : 'bg-white/[0.03] text-white/60 border-white/10 hover:text-white'
                          }`}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="audio-lossless-tier-indicator"
                              transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                              className="absolute inset-0 rounded-xl bg-white"
                            />
                          )}
                          <span className="relative z-10">{tier.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Active Profile
                      </span>
                      <span className="block text-[13px] font-semibold text-white mt-1">
                        {currentTier.label}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Resolution
                      </span>
                      <span className="block font-mono text-[13px] text-white mt-1 tabular-nums">
                        {currentTier.spec}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Stream Rate
                      </span>
                      <span className="block font-mono text-[13px] text-[#ff2d55] mt-1 tabular-nums">
                        {currentTier.bitrate}
                      </span>
                    </div>
                    <p className="sm:col-span-3 text-[13px] text-white/50 pt-2 border-t border-white/[0.06]">
                      {currentTier.note}
                    </p>
                  </div>
                </motion.div>

                {/* Panel 2: Equalizer */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeTab === 'equalizer' ? 1 : 0,
                    y: activeTab === 'equalizer' || prefersReducedMotion ? 0 : 4,
                  }}
                  transition={panelTransition}
                  aria-hidden={activeTab !== 'equalizer'}
                  className={`col-start-1 row-start-1 space-y-5 flex flex-col justify-between will-change-[opacity,transform] ${
                    activeTab === 'equalizer'
                      ? 'relative z-10 pointer-events-auto'
                      : 'z-0 pointer-events-none select-none'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/[0.08] pb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Sliders className="w-4 h-4 text-[#ff2d55] shrink-0" />
                      <span className="text-[14px] font-semibold text-white truncate">
                        Interactive 7-Band Equalizer
                      </span>
                      <span className="font-mono text-[11px] text-white/40 hidden sm:inline">
                        · 32-bit float
                      </span>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(['Hip-hop', 'Audiophile', 'Bass', 'Flat'] as const).map((p) => {
                        const isPresetActive = eqPreset === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            tabIndex={activeTab === 'equalizer' ? 0 : -1}
                            onClick={() => handlePresetChange(p)}
                            aria-pressed={isPresetActive}
                            className={`relative font-mono text-[11px] px-3 py-1 rounded-full transition-colors whitespace-nowrap border ${
                              isPresetActive
                                ? 'text-[#070708] border-transparent font-semibold'
                                : 'bg-white/[0.03] text-white/55 border-white/10 hover:text-white'
                            }`}
                          >
                            {isPresetActive && (
                              <motion.span
                                layoutId="audio-eq-preset-indicator"
                                transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                                className="absolute inset-0 rounded-full bg-white"
                              />
                            )}
                            <span className="relative z-10">{p}</span>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        tabIndex={activeTab === 'equalizer' ? 0 : -1}
                        onClick={() => handlePresetChange('Flat')}
                        title="Reset all bands"
                        aria-label="Reset equalizer bands to flat"
                        className="p-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[14px] leading-[1.6] text-white/60">
                    Shapes the sound inside Chordly before it reaches the system. Switch between Dynamic profiles or fine-tune all 7 frequency bands manually.
                  </p>

                  {/* 7 Vertical Interactive Sliders */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-3 py-1 items-end">
                    {eqBands.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className="text-[11px] font-mono text-white font-medium tabular-nums">
                          {val > 0 ? `+${val}` : val}
                        </span>
                        <div className="relative h-24 sm:h-28 flex items-center justify-center">
                          <input
                            type="range"
                            min="-6"
                            max="8"
                            step="0.5"
                            value={val}
                            tabIndex={activeTab === 'equalizer' ? 0 : -1}
                            onChange={(e) => handleBandChange(idx, parseFloat(e.target.value))}
                            className="h-24 sm:h-28 w-2 appearance-none bg-white/10 rounded-full outline-none cursor-pointer accent-[#ff2d55]"
                            style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                            aria-label={`EQ band ${frequencies[idx]}`}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-white/45 whitespace-nowrap">
                          {frequencies[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Panel 3: DAC Settings */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeTab === 'playback' ? 1 : 0,
                    y: activeTab === 'playback' || prefersReducedMotion ? 0 : 4,
                  }}
                  transition={panelTransition}
                  aria-hidden={activeTab !== 'playback'}
                  className={`col-start-1 row-start-1 space-y-5 flex flex-col justify-between will-change-[opacity,transform] ${
                    activeTab === 'playback'
                      ? 'relative z-10 pointer-events-auto'
                      : 'z-0 pointer-events-none select-none'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Cpu className="w-4 h-4 text-[#ff2d55] shrink-0" />
                      <span className="text-[14px] font-semibold text-white">
                        Direct USB DAC &amp; Playback Pipeline
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-white/45 tabular-nums">
                      {outputPrecision} · Crossfade 4s
                    </span>
                  </div>

                  <p className="text-[14px] leading-[1.6] text-white/65">
                    Configure hardware output precision and bypass Android&apos;s audio mixer. Chordly adapts automatically when lower-spec DACs connect and disables bit-perfect routing on phone speakers.
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    {(['16-bit PCM', '32-bit float'] as const).map((mode) => {
                      const isSelected = outputPrecision === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          tabIndex={activeTab === 'playback' ? 0 : -1}
                          onClick={() => setOutputPrecision(mode)}
                          aria-pressed={isSelected}
                          className={`relative py-2 px-3 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap ${
                            isSelected
                              ? 'text-[#070708] font-semibold'
                              : 'text-white/55 hover:text-white'
                          }`}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="audio-precision-indicator"
                              transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
                              className="absolute inset-0 rounded-lg bg-white"
                            />
                          )}
                          <span className="relative z-10">{mode}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(
                      [
                        {
                          key: 'preferUsbDac',
                          label: 'Prefer USB DAC',
                          sub: 'Direct hardware route',
                        },
                        {
                          key: 'convertLowerSpec',
                          label: 'Convert for lower-spec DACs',
                          sub: 'Cap to DAC max format',
                        },
                        {
                          key: 'loudnessNorm',
                          label: 'Loudness normalization',
                          sub: 'Consistent track levels',
                        },
                        {
                          key: 'disableSpeaker',
                          label: 'Disable on Phone Speaker',
                          sub: 'Auto-safe speaker mode',
                        },
                      ] as const
                    ).map((item) => {
                      const enabled = dacToggles[item.key];
                      return (
                        <button
                          key={item.key}
                          type="button"
                          tabIndex={activeTab === 'playback' ? 0 : -1}
                          onClick={() =>
                            setDacToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                          }
                          aria-pressed={enabled}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 text-left transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="block text-[13px] font-medium text-white truncate">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-white/45 truncate">
                              {item.sub}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider shrink-0 ${
                              enabled ? 'text-[#ff2d55]' : 'text-white/35'
                            }`}
                          >
                            {enabled ? 'ON' : 'OFF'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Panel 4: FLAC Sources */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeTab === 'sources' ? 1 : 0,
                    y: activeTab === 'sources' || prefersReducedMotion ? 0 : 4,
                  }}
                  transition={panelTransition}
                  aria-hidden={activeTab !== 'sources'}
                  className={`col-start-1 row-start-1 space-y-5 flex flex-col justify-between will-change-[opacity,transform] ${
                    activeTab === 'sources'
                      ? 'relative z-10 pointer-events-auto'
                      : 'z-0 pointer-events-none select-none'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Database className="w-4 h-4 text-[#ff2d55] shrink-0" />
                      <span className="text-[14px] font-semibold text-white">
                        Pluggable FLAC Source Chain
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-white/45">
                      Tried in order
                    </span>
                  </div>

                  <p className="text-[14px] leading-[1.6] text-white/65">
                    Sources above YouTube Music replace lossy streams automatically whenever they return a higher-quality FLAC version, or point Chordly at your own self-hosted server or WebDAV library.
                  </p>

                  <div className="space-y-2.5">
                    {(
                      [
                        {
                          index: '01',
                          key: 'hiresModule' as const,
                          name: 'Primary Hi-Res FLAC Addon',
                          meta: 'Up to 24-bit · FLAC · Lossless · Downloads allowed',
                        },
                        {
                          index: '02',
                          key: 'mirrorModule' as const,
                          name: 'Secondary FLAC Mirror',
                          meta: 'FLAC · Lossless · Hi-Res fallback',
                        },
                        {
                          index: '03',
                          key: 'customWebDav' as const,
                          name: 'Self-Hosted Addon / WebDAV',
                          meta: 'Custom server or Nextcloud music folder',
                        },
                      ] as const
                    ).map((srcItem) => {
                      const enabled = sourceToggles[srcItem.key];
                      return (
                        <button
                          key={srcItem.key}
                          type="button"
                          tabIndex={activeTab === 'sources' ? 0 : -1}
                          onClick={() =>
                            setSourceToggles((prev) => ({
                              ...prev,
                              [srcItem.key]: !prev[srcItem.key],
                            }))
                          }
                          aria-pressed={enabled}
                          className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 text-left transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-[11px] text-white/40 tabular-nums shrink-0">
                              {srcItem.index}
                            </span>
                            <div className="min-w-0">
                              <span className="block text-[13px] font-medium text-white truncate">
                                {srcItem.name}
                              </span>
                              <span className="block text-[11px] text-white/45 truncate">
                                {srcItem.meta}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider shrink-0 ${
                              enabled ? 'text-[#ff2d55]' : 'text-white/35'
                            }`}
                          >
                            {enabled ? 'Active' : 'Muted'}
                          </span>
                        </button>
                      );
                    })}

                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[11px] text-white/40 tabular-nums shrink-0">
                          04
                        </span>
                        <div className="min-w-0">
                          <span className="block text-[13px] font-medium text-white/85 truncate">
                            YouTube Music
                          </span>
                          <span className="block text-[11px] text-white/45 truncate">
                            Lossy · Full catalog · Automix radio
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 shrink-0">
                        Always on
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Technical highlight: Single-Cell Stack Keeps Height Locked Across All 4 Tabs */}
            <div className="p-5 rounded-[20px] border border-white/[0.08] bg-white/[0.02] flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff2d55] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="grid grid-cols-1 grid-rows-1 flex-1 min-w-0">
                {tabOrder.map((tabId) => {
                  const isActive = activeTab === tabId;
                  const entry = tabData[tabId];
                  return (
                    <motion.div
                      key={tabId}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={panelTransition}
                      aria-hidden={!isActive}
                      className={`col-start-1 row-start-1 text-[14px] leading-[1.55] text-white/75 ${
                        isActive ? 'relative z-10' : 'z-0 pointer-events-none select-none'
                      }`}
                    >
                      <span className="font-semibold text-white">{entry.title}: </span>
                      <span className="text-white/50">{entry.desc}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
