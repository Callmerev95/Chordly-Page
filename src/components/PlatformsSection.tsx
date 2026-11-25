import React from 'react';
import { ExternalLink, Smartphone, Watch, Globe, Monitor, Tv, ArrowRight } from 'lucide-react';
import { PhoneFrame, WatchFrame, BrowserFrame } from './DeviceFrames';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

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
            One library. <span className="italic">Three ways</span> to listen.
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/50">
            On your phone, on your wrist, and in your browser. All free, all open source.
          </p>
        </ScrollReveal>

        {/* Glass Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Card 1: Android */}
          <StaggerItem className="md:col-span-2 lg:col-span-6 lg:row-span-2 flex">
            <div className="w-full p-7 sm:p-8 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                  <span className="inline-flex items-center gap-2 text-white">
                    <Smartphone className="w-4 h-4 text-[#ff2d55]" />
                    <span>Android</span>
                  </span>
                  <span>v1.9.4 · Primary</span>
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
                    <span>Download universal APK (197 MB)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-[260px]">
                  <PhoneFrame
                    src="/assets/aistudio/assets-mobile-now-playing.webp"
                    trackTitle="ILYSB (STRIPPED)"
                    artistName="LANY"
                  />
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Wear OS */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
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
                <WatchFrame screenType="playback" />
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Web Player */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
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
                <BrowserFrame
                  src="/assets/aistudio/assets-web-recent-lyrics.webp"
                  alt="Chordly Web Player Recently Played"
                  url="web-player.chordly.my.id/library/recent"
                />
              </div>
            </div>
          </StaggerItem>

          {/* Card 4 & 5: Upcoming Platforms */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
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

          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full p-6 rounded-[20px] border border-white/[0.08] bg-white/[0.02] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif italic text-[20px] text-white">Android TV</h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#ff2d55]">
                    · Coming Soon
                  </span>
                </div>
                <p className="text-[13px] text-white/45 mt-0.5">
                  Living room 10-foot couch interface
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};
