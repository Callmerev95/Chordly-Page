import React from 'react';
import { ExternalLink, Smartphone, Watch, Globe, Monitor, Tv, ArrowRight } from 'lucide-react';
import { PhoneFrame, WatchFrame, BrowserFrame } from './DeviceFrames';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const PlatformsSection: React.FC = () => {
  return (
    <section id="platforms" className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
            Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
            One library. Three ways to listen.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            On your phone, on your wrist, and in your browser. All free, all open source.
          </p>
        </ScrollReveal>

        {/* Responsive Grid: 1 col mobile -> 2 col tablet -> 12 col desktop */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Android (Full span on tablet, 6 cols 2 rows on desktop) */}
          <StaggerItem className="md:col-span-2 lg:col-span-6 lg:row-span-2 flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 liquid-glass liquid-glass-hover flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2D55]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#FF2D55]/20 border border-[#FF2D55]/30 flex items-center justify-center text-[#FF2D55]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-300">
                  Primary player · v1.9.4
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">Android</h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Full offline playback, background audio, Bit-Perfect USB DAC output, dynamic color themes, and Android Auto support.
              </p>

              <div className="pt-2">
                <a
                  href="#install"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF2D55] group-hover:text-[#FF6B8A] transition-colors"
                >
                  <span>Download universal APK (197 MB)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Embedded Phone Mockup */}
            <div className="mt-8 relative z-10 flex justify-center">
              <div className="w-full max-w-[320px] sm:max-w-[340px] transform transition-transform duration-500 group-hover:scale-[1.02]">
                <PhoneFrame 
                  src="/assets/aistudio/assets-mobile-now-playing.webp"
                  trackTitle="ILYSB (STRIPPED)" 
                  artistName="LANY" 
                />
              </div>
            </div>
            </div>
          </StaggerItem>

          {/* Card 2: Wear OS (1 col on tablet, 6 cols on desktop) */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 liquid-glass liquid-glass-hover flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF]">
                  <Watch className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-300">
                  Remote & speaker · ~4.5 MB
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Wear OS</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Control playback from your wrist, pick playlists, or stream directly through your watch speaker. Requires paired Android app.
              </p>

              <div>
                <a
                  href="#wear-os"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C5CFF] group-hover:text-white transition-colors"
                >
                  <span>Get Wear OS build</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Embedded Watch Mockup */}
            <div className="mt-6 flex justify-center">
              <WatchFrame screenType="playback" />
            </div>
            </div>
          </StaggerItem>

          {/* Card 3: Web Player (1 col on tablet, 6 cols on desktop) */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 liquid-glass liquid-glass-hover flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#FF9A62]/20 border border-[#FF9A62]/30 flex items-center justify-center text-[#FF9A62]">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-[#4ADE80]">
                  Live in browser
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Web Player</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Stream your full YouTube Music library from Chrome, Edge, Brave, or Firefox with the Chordly browser extension.
              </p>

              <div>
                <a
                  href="https://chordly.callmerev.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF9A62] group-hover:text-white transition-colors"
                >
                  <span>Launch chordly.callmerev.my.id</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mini Browser Frame with Real Screenshot */}
            <div className="mt-6">
              <BrowserFrame 
                src="/assets/aistudio/assets-web-recent-lyrics.webp"
                alt="Chordly Web Player Recently Played"
                url="chordly.callmerev.my.id/library/recent"
              />
            </div>
            </div>
          </StaggerItem>

          {/* Card 4 & 5: TV & Desktop (2-up on tablet & desktop) */}
          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border border-dashed border-white/15 bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-white text-base">Desktop</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 text-[10px] font-semibold">Coming Soon</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">Windows, macOS & Linux native builds</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="md:col-span-1 lg:col-span-6 flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border border-dashed border-white/15 bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-white text-base">Android TV</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 text-[10px] font-semibold">Coming Soon</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">Living room 10-foot couch interface</p>
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerGroup>

      </div>
    </section>
  );
};
