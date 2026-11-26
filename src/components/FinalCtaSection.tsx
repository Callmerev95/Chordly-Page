import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './MotionPrimitives';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <ScrollReveal
          scale={0.98}
          y={14}
          className="p-8 sm:p-14 lg:p-16 rounded-[36px] v29-glass-frame text-center"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]">
              Ready to Listen · Free &amp; Open Source
            </p>

            <h2 className="font-serif font-normal text-[44px] sm:text-[60px] lg:text-[72px] text-white tracking-[-0.04em] leading-[0.96] text-balance">
              Put something <span className="italic">good</span> on.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55 max-w-xl mx-auto">
              Download Chordly for Android, try the web player, or explore the code on GitHub.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://github.com/Callmerev95/Chordly-release/releases/latest/download/app-prod-universal-release.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download APK</span>
              </a>

              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto px-6 py-3"
              >
                <span>Open Web Player</span>
                <ExternalLink className="w-4 h-4 text-white/55 shrink-0" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
