import React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

/**
 * Global ambient parallax backdrop with multi-speed gradient mesh orbs
 * and subtle acoustic soundwave SVG curves anchored behind the main canvas.
 */
export const AmbientParallaxBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Distinct scroll velocities per depth layer
  const orbTopY = useTransform(smoothProgress, [0, 1], [0, -180]);
  const orbMidY = useTransform(smoothProgress, [0, 1], [60, -210]);
  const orbBottomY = useTransform(smoothProgress, [0, 1], [140, -120]);
  const wavePrimaryY = useTransform(smoothProgress, [0, 1], [0, -110]);
  const waveSecondaryY = useTransform(smoothProgress, [0, 1], [40, -65]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#07060A]"
    >
      {/* Layer 1: Ambient Mesh Orbs */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: orbTopY }}
        className="absolute -top-32 -right-24 w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] rounded-full bg-[#FF2D55]/[0.085] blur-[130px] will-change-transform"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: orbMidY }}
        className="absolute top-[32%] -left-32 w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] rounded-full bg-[#7C5CFF]/[0.075] blur-[140px] will-change-transform"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: orbBottomY }}
        className="absolute -bottom-36 right-[12%] w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] rounded-full bg-[#FF9A62]/[0.065] blur-[130px] will-change-transform"
      />

      {/* Layer 2A: Primary Harmonic Acoustic Soundwave SVG */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: wavePrimaryY }}
        className="absolute inset-x-0 top-[18%] opacity-[0.08] will-change-transform"
      >
        <svg
          viewBox="0 0 1440 360"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-[280px] sm:h-[360px]"
        >
          <defs>
            <linearGradient id="chordly-wave-primary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF2D55" stopOpacity="0" />
              <stop offset="28%" stopColor="#FF2D55" stopOpacity="0.9" />
              <stop offset="56%" stopColor="#7C5CFF" stopOpacity="0.95" />
              <stop offset="82%" stopColor="#FF9A62" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9A62" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 180 C 180 90, 360 270, 540 180 C 720 90, 900 270, 1080 180 C 1260 90, 1350 220, 1440 165"
            stroke="url(#chordly-wave-primary)"
            strokeWidth="1.5"
          />
          <path
            d="M0 205 C 200 130, 380 285, 580 195 C 780 105, 960 265, 1160 185 C 1300 130, 1380 215, 1440 190"
            stroke="url(#chordly-wave-primary)"
            strokeWidth="1"
            strokeOpacity="0.65"
          />
          <path
            d="M0 155 C 160 225, 340 95, 520 175 C 700 255, 880 100, 1060 175 C 1240 250, 1360 140, 1440 170"
            stroke="url(#chordly-wave-primary)"
            strokeWidth="0.9"
            strokeOpacity="0.45"
          />
        </svg>
      </motion.div>

      {/* Layer 2B: Secondary Lower Soundwave Ribbon */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: waveSecondaryY }}
        className="absolute inset-x-0 top-[64%] opacity-[0.06] will-change-transform"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-[240px] sm:h-[320px]"
        >
          <defs>
            <linearGradient id="chordly-wave-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0" />
              <stop offset="32%" stopColor="#7C5CFF" stopOpacity="0.9" />
              <stop offset="68%" stopColor="#FF2D55" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF9A62" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 160 C 220 240, 420 80, 640 160 C 860 240, 1080 90, 1280 165 C 1360 195, 1400 170, 1440 155"
            stroke="url(#chordly-wave-secondary)"
            strokeWidth="1.25"
          />
          <path
            d="M0 185 C 240 115, 440 255, 680 170 C 900 95, 1120 230, 1440 150"
            stroke="url(#chordly-wave-secondary)"
            strokeWidth="0.9"
            strokeOpacity="0.55"
          />
        </svg>
      </motion.div>
    </div>
  );
};
