import React from 'react';
import { ExternalLink, Smartphone, Watch, Globe, Monitor, Tv, ArrowRight } from 'lucide-react';
import { PhoneFrame, WatchFrame, BrowserFrame } from './DeviceFrames';
import { DeviceFloat, ScrollParallax, ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const PlatformsSection: React.FC = () => {
  return (
    <section id="platforms" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mb-12 sm:mb-14 space-y-4">
          <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]">
            Platforms · Multi-Device Ecosystem
          </span>
          <h2 className="font-serif font-normal text-[36px] sm:text-[48px] text-white tracking-[-0.03em] leading-[1.05] text-balance">
            One library. <span className="italic">Four ways</span> to listen.
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/50">
            On your phone, on your wrist, on your TV, and in your browser. All free, all open source.
          </p>
        </ScrollReveal>

        {/* Glass Cards Grid */}
        <StaggerGroup stagger={0.085} amount={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Card 1: Android */}
          <StaggerItem y={24} scale={0.97} className="md:col-span-2 lg:col-span-6 lg:row-span-2 flex">
            <div className="w-full p-7 sm:p-8 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                  <span className="inline-flex items-center gap-2 text-white">
                    <Smartphone className="w-4 h-4 text-[#ff2d55]" />
                    <span>Android</span>
                  </span>
                  <span>v1.9.5 · Primary</span>
                </div>

                <h3 className="font-serif italic text-[28px] text-white leading-[1.15]">
                  Full-featured native mobile client
                </h3>
                <p className="text-[14px] leading-[1.65] text-white/50">
                  Full offline playback, background audio, Bit-Perfect USB DAC output, dynamic color themes, and Android Auto support.
                </p>

                <div className="pt-1">
                  <a
                    href="#install"
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#ff2d55] hover:underline underline-offset-4"
                  >
                    <span>Download universal APK (164.5 MB)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <ScrollParallax offsetRange={[20, -20]} className="w-full flex justify-center">
                  <DeviceFloat amplitude={5} duration={6.2} className="w-full max-w-[300px] sm:max-w-[316px]">
                    <PhoneFrame
                      src="/assets/chordly/android_app.webp"
                      alt="Chordly Android App Home Screen"
                      trackTitle="block my number"
                      artistName="Hayes Mint"
                    />
                  </DeviceFloat>
                </ScrollParallax>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Wear OS */}
          <StaggerItem y={22} scale={0.97} className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full p-7 sm:p-8 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                  <span className="inline-flex items-center gap-2 text-white">
                    <Watch className="w-4 h-4 text-[#ff2d55]" />
                    <span>Wear OS</span>
                  </span>
                  <span>~4.5 MB · Speaker</span>
                </div>

                <h3 className="font-serif italic text-[26px] text-white leading-[1.18]">
                  Wrist remote and direct playback
                </h3>
                <p className="text-[14px] leading-[1.65] text-white/50">
                  Control playback from your wrist, pick playlists, or stream directly through your watch speaker. Requires paired Android app.
                </p>

                <div>
                  <a
                    href="#wear-os"
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#ff2d55] hover:underline underline-offset-4"
                  >
                    <span>Get Wear OS build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <ScrollParallax offsetRange={[24, -24]}>
                  <DeviceFloat amplitude={4} duration={5.6} phaseDelay={0.6}>
                    <WatchFrame screenType="playback" />
                  </DeviceFloat>
                </ScrollParallax>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Web Player */}
          <StaggerItem y={22} scale={0.97} className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full p-7 sm:p-8 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                  <span className="inline-flex items-center gap-2 text-white">
                    <Globe className="w-4 h-4 text-[#ff2d55]" />
                    <span>Web Player</span>
                  </span>
                  <span>Live in browser</span>
                </div>

                <h3 className="font-serif italic text-[26px] text-white leading-[1.18]">
                  Browser streaming via extension bridge
                </h3>
                <p className="text-[14px] leading-[1.65] text-white/50">
                  Stream your full YouTube Music library from Chrome, Edge, Brave, or Firefox with the Chordly browser extension.
                </p>

                <div>
                  <a
                    href="https://web-player.chordly.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#ff2d55] hover:underline underline-offset-4"
                  >
                    <span>Launch web-player.chordly.my.id</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <ScrollParallax offsetRange={[16, -16]}>
                  <BrowserFrame
                    src="/assets/aistudio/assets-web-recent-lyrics.webp"
                    alt="Chordly Web Player Recently Played"
                    url="web-player.chordly.my.id/library/recent"
                  />
                </ScrollParallax>
              </div>
            </div>
          </StaggerItem>

          {/* Card 4 & 5: Upcoming Platforms */}
          <StaggerItem y={18} className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full p-6 rounded-[20px] border border-white/[0.08] bg-white/[0.02] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                <Monitor className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif italic text-[20px] text-white">Desktop</h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#ff2d55]">
                    · Coming Soon
                  </span>
                </div>
                <p className="text-[13px] text-white/45 mt-0.5">
                  Windows, macOS &amp; Linux native builds
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem y={18} className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full p-6 rounded-[20px] border border-white/[0.12] bg-white/[0.03] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#ff2d55] shrink-0">
                  <Tv className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif italic text-[20px] text-white">Android TV</h4>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#ff2d55]">
                      · Available
                    </span>
                  </div>
                  <p className="text-[13px] text-white/50 mt-0.5">
                    Living room 10-foot couch interface &amp; D-pad navigation
                  </p>
                </div>
              </div>

              <a
                href="#install-tv"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#ff2d55] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                <span>Get APK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};
