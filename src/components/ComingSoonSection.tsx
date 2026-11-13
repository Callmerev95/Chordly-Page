import React from 'react';
import { Monitor, Tv, Clock, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const ComingSoonSection: React.FC = () => {
  return (
    <section id="coming-soon" className="py-14 sm:py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
            What's next.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Currently in active development. Releases will be posted on GitHub.
          </p>
        </ScrollReveal>

        {/* 2 Wide Cards with dashed / lower-contrast borders */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Desktop */}
          <StaggerItem className="flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-dashed border-white/20 bg-white/[0.02] space-y-4 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-400">
                  In Development
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Desktop (Windows, macOS, Linux)
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Native desktop builds with system media keys, rich presence, and local audio integration without requiring browser extensions.
              </p>
            </div>
          </StaggerItem>

          {/* Card 2: Android TV */}
          <StaggerItem className="flex">
            <div className="w-full rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-dashed border-white/20 bg-white/[0.02] space-y-4 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
                  <Tv className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-400">
                  In Development
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Android TV
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                A couch-friendly 10-foot interface with D-pad navigation, synced full-screen lyrics, and high-fidelity living room playback.
              </p>
            </div>
          </StaggerItem>

        </StaggerGroup>

        {/* Bottom Link */}
        <ScrollReveal delay={0.12} className="mt-10 text-center">
          <a
            href="https://github.com/Callmerev95/Chordly-release/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF2D55] hover:text-[#FF6B8A] transition-colors"
          >
            <span>Follow releases on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
};
