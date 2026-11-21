import React from 'react';
import { ChordlyLogo } from './ChordlyLogo';
import { Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#07060A]/85 backdrop-blur-md pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-12 text-sm text-zinc-400 select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Responsive Grid: Mobile (Brand full-width + 2-col links), Tablet (3-col links), Desktop (12-col) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-6 gap-y-7 md:gap-8 pb-8 sm:pb-10 lg:pb-12">

          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 md:col-span-3 lg:col-span-5 space-y-3.5 pb-6 border-b border-white/[0.08] lg:pb-0 lg:border-b-0">
            <ChordlyLogo size="md" showWordmark={true} />
            <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
              Independent YouTube Music player for Android, Wear OS, and the web. Open source under GPL-3.0.
            </p>
            <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-0.5">
              <span>Developed with ❤️ by</span>
              <a
                href="https://www.callmerev.my.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-[#FF2D55] transition-colors underline underline-offset-4 py-1"
              >
                Callmerev
              </a>
            </div>
          </div>

          {/* Col 2: Platforms */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Platforms</h4>
            <ul className="space-y-0.5 sm:space-y-2 text-[13px] sm:text-xs">
              <li>
                <a href="#install" className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors">
                  Android APK
                </a>
              </li>
              <li>
                <a href="#wear-os" className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors">
                  Wear OS
                </a>
              </li>
              <li>
                <a
                  href="https://web-player.chordly.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  <span>Web Player</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </li>
              <li>
                <span className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 text-zinc-500">
                  TV & Desktop (Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-0.5 sm:space-y-2 text-[13px] sm:text-xs">
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 sm:w-3 sm:h-3 shrink-0" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly-release/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  Releases & Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  Issue Tracker
                </a>
              </li>
              <li>
                <a
                  href="https://web-player.chordly.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  Web Player Live
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & About (2-column compact row on mobile, single column on tablet/desktop) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Legal & About</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5 md:block md:space-y-2 text-[13px] sm:text-xs">
              <li>
                <a
                  href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  GPL-3.0 License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  Callmerev Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Callmerev95/Chordly/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 py-1 sm:py-0 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Consistent left alignment on mobile, split left/right on sm+ */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-xs text-left">
          <p className="text-zinc-400">
            © 2026 Chordly. Developed by Callmerev.
          </p>

          <p className="text-zinc-400 text-left sm:text-right max-w-xl text-[11px] leading-relaxed">
            Chordly is an independent open-source project and is not affiliated with, sponsored by, or endorsed by Google LLC, YouTube, Apple Inc., or Spotify.
          </p>
        </div>

      </div>
    </footer>
  );
};
