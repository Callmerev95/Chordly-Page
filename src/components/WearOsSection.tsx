import React from 'react';
import { Watch, Check, Download, AlertCircle } from 'lucide-react';
import { WatchFrame } from './DeviceFrames';
import { ScrollReveal, StaggerGroup, StaggerItem, DeviceFloat } from './MotionPrimitives';

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
    <section
      id="wear-os"
      className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Two Watch Mockups in Glass Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[290px] sm:min-h-[360px] rounded-[32px] v29-glass-card p-6">
            <div className="relative w-full max-w-[320px] flex items-center justify-center">
              <div className="absolute -top-4 right-2 sm:right-4 -rotate-3 scale-90 opacity-85">
                <ScrollReveal delay={0.08} scale={0.96}>
                  <DeviceFloat amplitude={4} duration={5.6} phaseDelay={0}>
                    <WatchFrame screenType="queue" />
                  </DeviceFloat>
                </ScrollReveal>
              </div>
              <div className="relative z-20 translate-y-6 -translate-x-4">
                <ScrollReveal delay={0.14} scale={0.96}>
                  <DeviceFloat amplitude={5} duration={6.2} phaseDelay={1.1}>
                    <WatchFrame screenType="playback" title="Starboy" artist="The Weeknd" />
                  </DeviceFloat>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Right: Editorial Copy & Pill CTA */}
          <ScrollReveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Watch className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Wear OS Companion · ~4.5 MB</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Never stop listening. <span className="italic">Wrist control</span> &amp; speaker playback.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Leave your phone in your pocket. Chordly on Wear OS lets you skip tracks, browse your queue, adjust volume, and even route audio directly through your smartwatch speaker when you don&apos;t have headphones.
            </p>

            {/* 7 Bullets */}
            <StaggerGroup stagger={0.03} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {bullets.map((bullet, idx) => (
                <StaggerItem key={idx} y={8} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#ff2d55]">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-[14px] text-white/65 leading-[1.5]">{bullet}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Pairing Note */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#ff2d55] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-white/55">
                <strong className="text-white font-semibold">Pairing requirement: </strong>
                Wear OS build requires the Android app installed on your phone with the same signing key.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-1">
              <a href="#install" className="btn-primary px-6 py-2.5">
                <Download className="w-4 h-4" />
                <span>Download Wear OS APK</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
