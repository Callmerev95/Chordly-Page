import React, { useState } from 'react';
import { Activity, Sliders, ShieldCheck, Cpu, Database, RefreshCw } from 'lucide-react';
import { PhoneFrame } from './DeviceFrames';
import { ScrollReveal } from './MotionPrimitives';

export const AudioDeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equalizer' | 'playback' | 'sources'>('equalizer');
  const [eqPreset, setEqPreset] = useState<'Hip-hop' | 'Audiophile' | 'Bass' | 'Flat'>('Hip-hop');
  const [eqBands, setEqBands] = useState<number[]>([6, 4, 0.5, -1, 0.5, 2, 2.5]);

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

  const tabData = {
    equalizer: {
      title: 'Built-in 7-Band Precision Equalizer',
      desc: 'Shapes the sound inside Chordly before it reaches the system. Supports manual dB adjustments, custom curves, and real-time preset switching without distortion.',
      src: '/assets/aistudio/assets-mobile-equalizer.webp',
    },
    playback: {
      title: 'Direct USB DAC & Bit-Perfect Settings',
      desc: 'Toggle between standard 16-bit PCM and 32-bit float, bypass the Android mixer completely, enable loudness normalization, or activate Automix [Beta] beat-matched transition analysis.',
      src: '/assets/aistudio/assets-mobile-dac-settings.webp',
    },
    sources: {
      title: 'Pluggable FLAC Modules & Fallback',
      desc: 'Prioritize custom FLAC modules in your preferred order—streaming 24-bit Hi-Res FLAC and lossless sources first, with YouTube Music audio streams as seamless fallback.',
      src: '/assets/aistudio/assets-mobile-flac-sources.webp',
    },
  };

  const current = tabData[activeTab];

  return (
    <section id="audio" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Device Preview & Tab Switcher */}
          <ScrollReveal delay={0.08} className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center">
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.12] mb-7 max-w-full">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-[#070708] font-semibold'
                        : 'text-white/55 hover:text-white font-normal'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-full flex justify-center">
              <PhoneFrame
                src={current.src}
                trackTitle="Sanctuary · Joji"
                artistName="Lossless FLAC"
              />
            </div>
          </ScrollReveal>

          {/* Right Column: Audio Engineering Details & Interactive EQ */}
          <ScrollReveal className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Activity className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Audio Architecture · 24-bit / 192 kHz</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Sound that <span className="italic">respects</span> your gear.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Standard Android audio resamples everything to 48 kHz. Chordly&apos;s Bit-Perfect mode talks directly to your USB DAC, delivering bit-for-bit audio up to 24-bit / 192 kHz without system interference or compression.
            </p>

            {/* Interactive EQ Simulator */}
            <div className="p-5 sm:p-6 rounded-[24px] v29-glass-card space-y-5">
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
                        onClick={() => handlePresetChange(p)}
                        className={`font-mono text-[11px] px-3 py-1 rounded-full transition-colors whitespace-nowrap border ${
                          isPresetActive
                            ? 'bg-white text-[#070708] border-white font-semibold'
                            : 'bg-white/[0.03] text-white/55 border-white/10 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => handlePresetChange('Flat')}
                    title="Reset all bands"
                    aria-label="Reset equalizer bands to flat"
                    className="p-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 7 Vertical Interactive Sliders */}
              <div className="grid grid-cols-7 gap-1 sm:gap-3 py-2 items-end">
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
              <p className="font-mono text-[11px] text-white/40 text-center">
                Adjust sliders or pick a preset to sculpt acoustic resonance inside Chordly&apos;s pipeline
              </p>
            </div>

            {/* Technical highlight */}
            <div className="p-5 rounded-[20px] border border-white/[0.08] bg-white/[0.02] flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff2d55] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[14px] leading-[1.55] text-white/75">
                <span className="font-semibold text-white">{current.title}: </span>
                <span className="text-white/50">{current.desc}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
