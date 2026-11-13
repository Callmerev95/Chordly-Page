import React, { useState } from 'react';
import { Activity, Sliders, ShieldCheck, Cpu, Database, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { PhoneFrame } from './DeviceFrames';
import { PILL_SPRING, ScrollReveal } from './MotionPrimitives';

export const AudioDeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equalizer' | 'playback' | 'sources'>('equalizer');
  const [eqPreset, setEqPreset] = useState<'Hip-hop' | 'Audiophile' | 'Bass' | 'Flat'>('Hip-hop');
  const [eqBands, setEqBands] = useState<number[]>([6, 4, 0.5, -1, 0.5, 2, 2.5]);

  const presets: Record<string, number[]> = {
    'Hip-hop': [6, 4, 0.5, -1, 0.5, 2, 2.5],
    'Audiophile': [1.5, 0.5, 0, 0, 0.5, 1, 2],
    'Bass': [8, 6, 2, 0, -1, 1, 1],
    'Flat': [0, 0, 0, 0, 0, 0, 0],
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

  const tabData = {
    equalizer: {
      title: 'Built-in 7-Band Precision Equalizer',
      desc: 'Shapes the sound inside Chordly before it reaches the system. Supports manual dB adjustments, custom curves, and real-time preset switching without distortion.',
      src: '/assets/aistudio/assets-mobile-equalizer.webp',
      badge: '7-Band Studio EQ',
      glow: 'from-[#4ADE80]/25 via-[#22C55E]/15 to-transparent',
    },
    playback: {
      title: 'Direct USB DAC & Bit-Perfect Settings',
      desc: 'Toggle between standard 16-bit PCM and 32-bit float, bypass the Android mixer completely, enable loudness normalization, or activate Automix [Beta] beat-matched transition analysis.',
      src: '/assets/aistudio/assets-mobile-dac-settings.webp',
      badge: 'Hardware Bypass',
      glow: 'from-[#38BDF8]/25 via-[#4ADE80]/15 to-transparent',
    },
    sources: {
      title: 'Pluggable FLAC Modules & Fallback',
      desc: 'Prioritize custom FLAC modules in your preferred order—streaming 24-bit Hi-Res FLAC and lossless sources first, with YouTube Music audio streams as seamless fallback.',
      src: '/assets/aistudio/assets-mobile-flac-sources.webp',
      badge: 'FLAC Hi-Res 24-bit',
      glow: 'from-[#7C5CFF]/25 via-[#4ADE80]/15 to-transparent',
    },
  };

  const current = tabData[activeTab];

  return (
    <section id="audio" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Mockup with Real Asset & Interactive Tabs */}
          <ScrollReveal delay={0.1} className="lg:col-span-5 order-2 lg:order-1 relative flex flex-col items-center justify-center">
            {/* Dynamic Glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${current.glow} rounded-full blur-3xl pointer-events-none transform scale-90 transition-all duration-700`} />
            
            {/* Tab Pills */}
            <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl bg-white/[0.06] border border-white/10 mb-6 z-20 max-w-full">
              {(
                [
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
                    className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive ? 'text-black font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="audio-tab-pill"
                        transition={PILL_SPRING}
                        className="absolute inset-0 rounded-xl bg-[#4ADE80] shadow-lg"
                      />
                    )}
                    <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 w-full flex justify-center">
              <PhoneFrame 
                src={current.src}
                trackTitle="Sanctuary · Joji"
                artistName="Lossless FLAC"
              />
            </div>
          </ScrollReveal>

          {/* Right Column: Audio Engineering Details & Interactive EQ */}
          <ScrollReveal className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#4ADE80] uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Audio Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              Sound that respects your gear.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Standard Android audio resamples everything to 48 kHz. Chordly's Bit-Perfect mode talks directly to your USB DAC, delivering bit-for-bit audio up to 24-bit / 192 kHz without system interference or compression.
            </p>

            {/* Interactive EQ Simulator */}
            <div className="p-3.5 sm:p-5 rounded-2xl liquid-glass border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Sliders className="w-4 h-4 text-[#4ADE80] shrink-0" />
                  <span className="text-xs font-bold text-white truncate">Interactive 7-Band Equalizer</span>
                  <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">Bypasses mixer</span>
                </div>
                {/* Presets */}
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                  {(['Hip-hop', 'Audiophile', 'Bass', 'Flat'] as const).map((p) => {
                    const isPresetActive = eqPreset === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePresetChange(p)}
                        className={`relative text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors whitespace-nowrap ${
                          isPresetActive
                            ? 'text-black font-bold'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {isPresetActive && (
                          <motion.span
                            layoutId="eq-preset-pill"
                            transition={PILL_SPRING}
                            className="absolute inset-0 rounded-lg bg-[#4ADE80] shadow-md"
                          />
                        )}
                        <span className="relative z-10">{p}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => handlePresetChange('Flat')}
                    title="Reset all bands"
                    className="p-1 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 7 Vertical Interactive Sliders */}
              <div className="grid grid-cols-7 gap-1 sm:gap-3 py-2 items-end">
                {eqBands.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-300 font-semibold tabular-nums">
                      {val > 0 ? `+${val}` : val}
                    </span>
                    <div className="relative h-24 sm:h-28 flex items-center justify-center">
                      <input
                        type="range"
                        min="-6"
                        max="8"
                        step="0.5"
                        value={val}
                        onChange={(e) => handleBandChange(idx, parseFloat(e.target.value))}
                        className="h-24 sm:h-28 w-2 appearance-none bg-white/15 rounded-full outline-none cursor-pointer accent-[#4ADE80]"
                        style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                        aria-label={`EQ band ${frequencies[idx]}`}
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                      {frequencies[idx]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 text-center">
                Adjust sliders or pick a preset to sculpt acoustic resonance inside Chordly's 32-bit float pipeline
              </p>
            </div>

            {/* Technical highlight */}
            <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-zinc-300">
                <ShieldCheck className="w-5 h-5 text-[#4ADE80]" />
              </div>
              <div className="text-xs text-zinc-300">
                <span className="font-semibold text-white">Audiophile Direct Pipeline: </span>
                {current.desc}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
