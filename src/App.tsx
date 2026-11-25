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
import { TestimonialsSection } from './components/TestimonialsSection';
import { ComingSoonSection } from './components/ComingSoonSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AmbientParallaxBackdrop } from './components/AmbientParallaxBackdrop';

/**
 * Chordly — Independent YouTube Music Player for Android, Wear OS, and the Web.
 * Concert Darkroom design system. Developed by Callmerev. Licensed under GPL-3.0.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070708] text-white font-sans relative overflow-x-clip selection:bg-[#ff2d55] selection:text-white">
        <AmbientParallaxBackdrop />
        <Navbar />

        <main id="main-content" className="relative z-10 flex flex-col">
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
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
