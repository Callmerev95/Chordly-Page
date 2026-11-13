import React from 'react';
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
import { ComingSoonSection } from './components/ComingSoonSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AmbientParallaxBackdrop } from './components/AmbientParallaxBackdrop';

/**
 * Chordly — Production-Quality Single Page Marketing Website
 * Independent YouTube Music Player for Android, Wear OS, and the Web.
 * Developed by Callmerev. Licensed under GPL-3.0.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-chordly-bg text-chordly-text font-sans relative overflow-x-clip selection:bg-chordly-accent selection:text-white">
        {/* Global Scroll-Triggered Ambient Mesh & Soundwave Parallax Backdrop */}
        <AmbientParallaxBackdrop />

        {/* 1. Navbar (Sticky, liquid glass on scroll) */}
        <Navbar />

      {/* Main Content Landmark with skip anchor target */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Proof Strip */}
        <ProofStrip />

        {/* 4. Ecosystem / Platforms (#platforms) */}
        <PlatformsSection />

        {/* 5. Feature Bento (#features) */}
        <FeatureBento />

        {/* 6. Lyrics Deep Dive (#lyrics) */}
        <LyricsDeepDive />

        {/* 7. Audio Deep Dive (#audio) */}
        <AudioDeepDive />

        {/* 8. Web Player (#web-player) */}
        <WebPlayerSection />

        {/* 9. Wear OS (#wear-os) */}
        <WearOsSection />

        {/* 10. Listen Together (#together) */}
        <ListenTogetherSection />

        {/* 11. Install (#install) */}
        <InstallSection />

        {/* 12. Open Source (#open-source) */}
        <OpenSourceSection />

        {/* 13. Coming Soon (#coming-soon) */}
        <ComingSoonSection />

        {/* 14. FAQ (#faq) */}
        <FaqSection />

        {/* 15. Final CTA */}
        <FinalCtaSection />
      </main>

      {/* 16. Footer */}
      <Footer />
      </div>
    </MotionConfig>
  );
}
