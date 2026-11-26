import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { PARALLAX_SPRING } from './MotionPrimitives';

/**
 * Variation 29 Obsidian-Noir backdrop (#070708) with dual crimson radial ambient glows
 * moving in opposing scroll-linked parallax planes and subtle architectural side hairlines.
 */
export const AmbientParallaxBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, PARALLAX_SPRING);

  const primaryY = useTransform(smoothProgress, [0, 1], [0, -140]);
  const primaryX = useTransform(smoothProgress, [0, 1], [0, -55]);
  const primaryScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.08, 0.96]);

  const secondaryY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const secondaryX = useTransform(smoothProgress, [0, 1], [0, 75]);
  const secondaryScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.1, 1]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#070708]"
    >
      {/* Top-right primary crimson glow */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: primaryY,
                x: primaryX,
                scale: primaryScale,
              }
        }
        className="absolute -top-[18%] -right-[12%] w-[62vw] max-w-[820px] aspect-square rounded-full will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 45, 85, 0.16) 0%, rgba(255, 45, 85, 0.04) 45%, transparent 72%)',
          }}
        />
      </motion.div>

      {/* Bottom-left secondary crimson glow */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: secondaryY,
                x: secondaryX,
                scale: secondaryScale,
              }
        }
        className="absolute -bottom-[22%] -left-[14%] w-[58vw] max-w-[760px] aspect-square rounded-full will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 45, 85, 0.10) 0%, rgba(255, 45, 85, 0.025) 45%, transparent 72%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto h-full border-x border-white/[0.04]" />
    </div>
  );
};
