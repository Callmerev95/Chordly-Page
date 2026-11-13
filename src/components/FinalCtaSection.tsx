import React, { useRef } from 'react';
import { Download, ExternalLink, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './MotionPrimitives';

export const FinalCtaSection: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  const orbLeftY = useTransform(smoothProgress, [0, 1], [-28, 28]);
  const orbRightY = useTransform(smoothProgress, [0, 1], [28, -28]);
  const waveY = useTransform(smoothProgress, [0, 1], [22, -22]);

  return (
    <section ref={ctaRef} className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width liquid glass card with mesh-radial-cta glow & parallax accents */}
        <div className="rounded-[24px] sm:rounded-[36px] p-6 sm:p-14 lg:p-20 liquid-glass-elevated relative overflow-hidden text-center mesh-radial-cta border border-white/15">
          
          {/* Parallax Layer 1: Opposing Ambient Mesh Orbs */}
          <motion.div
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: orbLeftY }}
            className="absolute -top-24 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FF2D55]/15 blur-[95px] pointer-events-none will-change-transform"
          />
          <motion.div
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: orbRightY }}
            className="absolute -bottom-24 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#7C5CFF]/15 blur-[95px] pointer-events-none will-change-transform"
          />

          {/* Parallax Layer 2: Harmonic Soundwave SVG */}
          <motion.div
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: waveY }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.12] will-change-transform"
          >
            <svg viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" className="w-full h-44 sm:h-56">
              <defs>
                <linearGradient id="cta-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF9A62" stopOpacity="0" />
                  <stop offset="30%" stopColor="#FF2D55" stopOpacity="0.9" />
                  <stop offset="65%" stopColor="#7C5CFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FF9A62" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 110 C 160 40, 320 180, 480 110 C 640 40, 800 180, 960 110 C 1080 55, 1140 130, 1200 105"
                stroke="url(#cta-wave-grad)"
                strokeWidth="1.5"
              />
              <path
                d="M0 130 C 180 185, 360 45, 540 120 C 720 195, 900 50, 1080 125 C 1140 150, 1180 120, 1200 115"
                stroke="url(#cta-wave-grad)"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            </svg>
          </motion.div>

          <ScrollReveal className="max-w-3xl mx-auto space-y-6 relative z-10">
            
            {/* Sparkle Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Listen</span>
            </div>

            {/* H2 */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight text-balance">
              Put something good on.
            </h2>

            {/* Subhead */}
            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal">
              Download Chordly for Android, try the web player, or explore the code on GitHub.
            </p>

            {/* 2 CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
              <a
                href="https://github.com/Callmerev95/Chordly-release/releases/download/v1.9.4/app-prod-universal-release.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 whitespace-nowrap justify-center"
              >
                <Download className="w-5 h-5" />
                <span>Download APK (v1.9.4)</span>
              </a>

              <a
                href="https://chordly.callmerev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 whitespace-nowrap justify-center"
              >
                <span>Open Web Player</span>
                <ExternalLink className="w-5 h-5 text-zinc-400" />
              </a>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
