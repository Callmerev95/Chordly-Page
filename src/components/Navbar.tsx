import React, { useState, useEffect } from 'react';
import { ChordlyLogo } from './ChordlyLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath = '/' }) => {
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
    { label: 'Home', to: '/' },
    { label: 'Platforms', to: '/#platforms' },
    { label: 'Features', to: '/#features' },
    { label: 'News', to: '/news' },
    { label: 'FAQ', to: '/#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color] duration-300 ${
        scrolled
          ? 'py-4 bg-[#070708]/85 backdrop-blur-2xl border-b border-white/[0.08]'
          : 'py-6 sm:py-7 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between gap-6">
          {/* Zone 1: Newsreader Italic Logo */}
          <div className="justify-self-start">
            <a
              href="/"
              onClick={(e) => onNavigate?.('/', e)}
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d55] rounded-full p-1 -m-1 shrink-0"
              aria-label="Chordly Home"
            >
              <ChordlyLogo size="md" showWordmark={true} />
            </a>
          </div>

          {/* Zone 2: JetBrains Mono Uppercase Navigation Links (Desktop lg+) */}
          <nav
            className="hidden lg:flex items-center gap-8 justify-self-center shrink-0"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                (link.to === '/' && currentPath === '/') ||
                (link.to === '/news' && currentPath === '/news');
              return (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => onNavigate?.(link.to, e)}
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white underline underline-offset-8 decoration-[#ff2d55]'
                      : currentPath === '/'
                        ? 'text-white/45 hover:text-white'
                        : 'text-white/55 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single White Pill Primary Action */}
          <div className="hidden lg:flex items-center justify-self-end shrink-0">
              <a
                href="/#install"
                onClick={(e) => onNavigate?.('/#install', e)}
                className="btn-primary px-5 py-2.5 text-[12px]"
              >
                Get APK
              </a>
          </div>

          {/* Mobile Controls (< lg) */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 hover:text-white transition-colors shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#070708]/95 backdrop-blur-2xl px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive =
                (link.to === '/' && currentPath === '/') ||
                (link.to === '/news' && currentPath === '/news');
              return (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    onNavigate?.(link.to, e);
                  }}
                  className={`py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors flex items-center ${
                    isActive ? 'text-[#ff2d55]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.08]">
            <a
              href="/#install"
              onClick={(e) => {
                setMobileMenuOpen(false);
                onNavigate?.('/#install', e);
              }}
              className="btn-primary w-full py-2.5 text-center"
            >
              Get APK
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
