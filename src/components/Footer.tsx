import React from 'react';
import { ChordlyLogo } from './ChordlyLogo';
import { Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#070708] pt-14 pb-10 text-[14px] text-white/50 select-none">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-6 gap-y-8 pb-10">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 md:col-span-3 lg:col-span-5 space-y-3 pb-6 border-b border-white/[0.08] lg:pb-0 lg:border-b-0">
            <ChordlyLogo size="md" showWordmark={true} />
            <p className="text-white/55 text-[14px] leading-[1.55] max-w-sm">
              Independent YouTube Music player for Android, Wear OS, and the web. Open source under GPL-3.0.
            </p>
          </div>

          {/* Col 2: Platforms */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5">
            <h4 className="font-mono uppercase tracking-[0.12em] text-white text-[11px]">Platforms</h4>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <a href="#install" className="hover:text-white transition-colors">
                  Android APK
                </a>
              </li>
              <li>
                <a href="#wear-os" className="hover:text-white transition-colors">
                  Wear OS
                </a>
              </li>
              <li>
                <a
                  href="https://web-player.chordly.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Web Player</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
              <li>
                <span className="text-white/30">TV &amp; Desktop (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5">
            <h4 className="font-mono uppercase tracking-[0.12em] text-white text-[11px]">Resources</h4>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly-release/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Releases &amp; Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Issue Tracker
                </a>
              </li>
              <li>
                <a
                  href="https://web-player.chordly.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Web Player Live
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & About */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-2.5">
            <h4 className="font-mono uppercase tracking-[0.12em] text-white text-[11px]">Legal &amp; About</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 md:block md:space-y-1.5 text-[13px]">
              <li>
                <a
                  href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GPL-3.0 License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Callmerev Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 text-[12px]">
          <p className="text-white/40 shrink-0">
            © 2026 Chordly. Developed by{' '}
            <a
              href="https://callmerev.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ff2d55] hover:underline underline-offset-4"
            >
              Callmerev
            </a>
            .
          </p>

          <p className="text-white/40 text-left xl:text-right leading-relaxed xl:whitespace-nowrap">
            Chordly is an independent open-source project and is not affiliated with, sponsored by, or endorsed by Google LLC, YouTube, Apple Inc., or Spotify.
          </p>
        </div>
      </div>
    </footer>
  );
};
