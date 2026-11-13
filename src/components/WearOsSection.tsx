import React from 'react';
import { Watch, Check, Download, AlertCircle } from 'lucide-react';
import { WatchFrame } from './DeviceFrames';
import { ScrollReveal } from './MotionPrimitives';

export const WearOsSection: React.FC = () => {
  const bullets = [
    'Lightweight ~4.5 MB install',
    'Direct watch speaker audio playback',
    'Remote control for paired Android player',
    'Tiles and complications for quick access',
    'Rotary dial / crown volume scrolling',
    'Works on any Wear OS 3+ smartwatch',
    'Pairs automatically with matching Android install',
  ];

  return (
    <section id="wear-os" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark panel wrapper */}
        <div className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-16 liquid-glass relative overflow-hidden border border-white/10">
          
          {/* Subtle violet glow */}
          <div className="absolute top-1/2 right-1/4 w-[450px] h-[350px] bg-[#7C5CFF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            
            {/* Left Content (7 cols) */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#7C5CFF] uppercase tracking-wider">
                <Watch className="w-3.5 h-3.5" />
                <span>Wear OS Companion</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
                Wrist control. Watch speaker playback.
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Leave your phone in your pocket. Chordly on Wear OS lets you skip tracks, browse your queue, adjust volume, and even route audio directly through your smartwatch speaker when you don't have headphones.
              </p>

              {/* 7 Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#7C5CFF]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-zinc-200">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Note about pairing */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#7C5CFF] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400">
                  <strong className="text-zinc-200">Pairing requirement: </strong>
                  Wear OS build requires the Android app installed on your phone with the same signing key.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href="#install"
                  className="btn-primary"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Wear OS APK</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right: Two stacked / offset round watch frames (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] sm:min-h-[380px] lg:min-h-[400px] pb-4 sm:pb-0">
              <div className="relative w-full max-w-[300px] sm:max-w-[360px] flex items-center justify-center scale-[0.88] sm:scale-100 origin-center">
                {/* Back watch frame (Queue) */}
                <ScrollReveal delay={0.1} className="absolute -top-6 right-2 sm:top-0 sm:right-6 transform -rotate-6 scale-90 opacity-70 hover:opacity-100 transition-opacity">
                  <WatchFrame screenType="queue" />
                </ScrollReveal>

                {/* Front watch frame (Playback) */}
                <ScrollReveal delay={0.2} className="relative z-20 transform translate-y-8 sm:translate-y-12 rotate-3 shadow-2xl">
                  <WatchFrame screenType="playback" title="Starboy" artist="The Weeknd" />
                </ScrollReveal>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
