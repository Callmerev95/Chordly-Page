import React, { useState, useEffect } from 'react';
import { ChordlyLogo } from './ChordlyLogo';
import { Download, ExternalLink, Menu, X, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platforms', href: '#platforms' },
    { label: 'Features', href: '#features' },
    { label: 'Lyrics', href: '#lyrics' },
    { label: 'Web Player', href: '#web-player' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,box-shadow] duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#07060A]/40 backdrop-blur-xl saturate-150 shadow-[0_8px_24px_rgba(0,0,0,0.28)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D55] rounded-full p-1 -m-1 shrink-0"
            aria-label="Chordly Home"
          >
            <ChordlyLogo size="md" showWordmark={true} />
          </a>

          {/* Center Navigation Links (Desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-zinc-300 hover:text-white rounded-full transition-colors duration-200 hover:bg-white/[0.06] whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons (Desktop lg+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/Callmerev95/Chordly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.06] whitespace-nowrap shrink-0"
            >
              <Github className="w-4 h-4 shrink-0" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0" />
            </a>

            <a
              href="#install"
              className="btn-primary text-sm py-2 px-5 shadow-sm hover:shadow-[0_4px_20px_rgba(255,45,85,0.4)] whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download APK</span>
            </a>
          </div>

          {/* Mobile & Tablet Hamburger Controls (< lg) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <a
              href="#install"
              className="px-3.5 py-2 rounded-full bg-[#FF2D55] text-white text-xs font-semibold shadow-sm whitespace-nowrap shrink-0"
            >
              Get APK
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D55] shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0E0C12]/55 backdrop-blur-2xl saturate-150 shadow-[0_16px_40px_rgba(0,0,0,0.35)] px-4 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://github.com/Callmerev95/Chordly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="#install"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-3 text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download Universal APK (v1.9.4)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
