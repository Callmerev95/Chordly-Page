import React, { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProofStrip } from './components/ProofStrip';
import { PlatformsSection } from './components/PlatformsSection';
import { FeatureBento } from './components/FeatureBento';
import { LyricsDeepDive } from './components/LyricsDeepDive';
import { AudioDeepDive } from './components/AudioDeepDive';
import { WebPlayerSection } from './components/WebPlayerSection';
import { WearOsSection } from './components/WearOsSection';
import { ListenTogetherSection } from './components/ListenTogetherSection';
import { InstallSection } from './components/InstallSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ComingSoonSection } from './components/ComingSoonSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { Footer } from './components/Footer';
import { AmbientParallaxBackdrop } from './components/AmbientParallaxBackdrop';

function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

/**
 * Chordly — Independent YouTube Music Player for Android, Wear OS, and the Web.
 * Concert Darkroom design system. Developed by Callmerev. Licensed under GPL-3.0.
 */
export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePathname(window.location.pathname)
  );

  const isTermsPage = currentPath === '/terms';
  const isPrivacyPage = currentPath === '/privacy';

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isTermsPage) {
      document.title = 'Terms of Service — Chordly';
    } else if (isPrivacyPage) {
      document.title = 'Privacy Policy — Chordly';
    } else {
      document.title = 'Chordly — Independent YouTube Music Player with Synced Lyrics';
    }
  }, [isTermsPage, isPrivacyPage]);

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        }
      });
    }
  }, []);

  const navigate = useCallback((to: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) {
      return;
    }

    e?.preventDefault();
    const url = new URL(to, window.location.origin);
    const nextPath = normalizePathname(url.pathname);
    const nextHash = url.hash;
    const nextUrl = `${nextPath}${nextHash}`;

    if (`${normalizePathname(window.location.pathname)}${window.location.hash}` !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }

    setCurrentPath(nextPath);

    if (nextHash) {
      const targetId = nextHash.slice(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070708] text-white font-sans relative overflow-x-clip selection:bg-[#ff2d55] selection:text-white flex flex-col">
        <AmbientParallaxBackdrop />
        <Navbar onNavigate={navigate} currentPath={currentPath} />

        <main id="main-content" className="relative z-10 flex-1 flex flex-col">
          {isTermsPage ? (
            <TermsPage onNavigate={navigate} />
          ) : isPrivacyPage ? (
            <PrivacyPage onNavigate={navigate} />
          ) : (
            <>
              <HeroSection />
              <ProofStrip />
              <PlatformsSection />
              <FeatureBento />
              <LyricsDeepDive />
              <AudioDeepDive />
              <WebPlayerSection />
              <WearOsSection />
              <ListenTogetherSection />
              <InstallSection />
              <OpenSourceSection />
              <TestimonialsSection />
              <ComingSoonSection />
              <FaqSection />
              <FinalCtaSection />
            </>
          )}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
