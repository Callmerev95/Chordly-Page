import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

export const AUDIO_EASE = [0.16, 1, 0.3, 1] as const;

export const PILL_SPRING = {
  type: 'spring' as const,
  stiffness: 460,
  damping: 38,
  mass: 0.75,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.08 as const,
};

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  children: React.ReactNode;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  delay = 0,
  y = 12,
  children,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.28, delay, ease: AUDIO_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface StaggerGroupProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  delay?: number;
  children: React.ReactNode;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  stagger = 0.04,
  delay = 0.02,
  children,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={VIEWPORT_CONFIG}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  y?: number;
  children: React.ReactNode;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  y = 12,
  children,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.26, ease: AUDIO_EASE },
              },
            }
      }
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface EqualizerBarsProps {
  color?: string;
  active?: boolean;
  className?: string;
}

const BAR_KEYFRAMES = [
  [0.35, 0.95, 0.45, 0.8, 0.35],
  [0.85, 0.4, 1.0, 0.55, 0.85],
  [0.45, 0.85, 0.35, 0.95, 0.45],
  [0.7, 0.5, 0.9, 0.4, 0.7],
];

const STATIC_HEIGHTS = [0.55, 0.9, 0.45, 0.75];

export const EqualizerBars: React.FC<EqualizerBarsProps> = ({
  color = '#ff2d55',
  active = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = active && !prefersReducedMotion;

  return (
    <div
      aria-hidden="true"
      className={`inline-flex items-end gap-[2px] h-3.5 shrink-0 ${className}`}
    >
      {BAR_KEYFRAMES.map((frames, idx) => (
        <motion.span
          key={idx}
          className="w-[2px] h-full rounded-[1px] origin-bottom will-change-transform"
          style={{
            backgroundColor: color,
            scaleY: shouldAnimate ? undefined : STATIC_HEIGHTS[idx],
          }}
          animate={
            shouldAnimate
              ? {
                  scaleY: frames,
                }
              : undefined
          }
          transition={
            shouldAnimate
              ? {
                  duration: 1.15 + idx * 0.14,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.12,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
};
