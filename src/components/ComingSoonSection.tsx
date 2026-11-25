import React from 'react';
import { Monitor, Tv, Clock, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const ComingSoonSection: React.FC = () => {
  return (
    <section id="coming-soon" className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            <Clock className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span>Roadmap</span>
          </div>
          <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
            What&apos;s <span className="italic">next.</span>
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/55">
            Currently in active development. Releases will be posted on GitHub.
          </p>
        </ScrollReveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <StaggerItem className="flex">
            <div className="w-full p-7 rounded-[24px] border border-dashed border-white/[0.14] bg-white/[0.02] space-y-3 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/75">
                  <Monitor className="w-4 h-4" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/55">
                  In Development
                </span>
              </div>

              <h3 className="font-serif italic text-[24px] text-white">
                Desktop (Windows, macOS, Linux)
              </h3>

              <p className="text-[14px] text-white/50 leading-[1.6]">
                Native desktop builds with system media keys, rich presence, and local audio integration without requiring browser extensions.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="flex">
            <div className="w-full p-7 rounded-[24px] border border-dashed border-white/[0.14] bg-white/[0.02] space-y-3 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/75">
                  <Tv className="w-4 h-4" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/55">
                  In Development
                </span>
              </div>

              <h3 className="font-serif italic text-[24px] text-white">
                Android TV
              </h3>

              <p className="text-[14px] text-white/50 leading-[1.6]">
                A couch-friendly 10-foot interface with D-pad navigation, synced full-screen lyrics, and high-fidelity living room playback.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <ScrollReveal delay={0.08} className="mt-8">
          <a
            href="https://github.com/Callmerev95/Chordly-release/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#ff2d55] hover:underline underline-offset-4"
          >
            <span>Follow releases on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
