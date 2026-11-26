import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react';

export const AUDIO_EASE = [0.16, 1, 0.3, 1] as const;

export const PILL_SPRING = {
  type: 'spring' as const,
  stiffness: 460,
  damping: 38,
  mass: 0.75,
};

export const PARALLAX_SPRING = {
  stiffness: 120,
  damping: 24,
  mass: 0.45,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.12 as const,
};

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  amount?: number;
  children: React.ReactNode;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  delay = 0,
  duration = 0.44,
  x = 0,
  y = 20,
  scale = 1,
  amount = VIEWPORT_CONFIG.amount,
  children,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x, y, scale }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: AUDIO_EASE }}
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
  amount?: number;
  immediate?: boolean;
  children: React.ReactNode;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  stagger = 0.07,
  delay = 0.03,
  amount = VIEWPORT_CONFIG.amount,
  immediate = false,
  children,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={immediate && !prefersReducedMotion ? 'visible' : undefined}
      whileInView={!immediate && !prefersReducedMotion ? 'visible' : undefined}
      viewport={immediate ? undefined : { once: true, amount }}
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
  x?: number;
  y?: number;
  scale?: number;
  duration?: number;
  children: React.ReactNode;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  x = 0,
  y = 18,
  scale = 1,
  duration = 0.38,
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
              hidden: { opacity: 0, x, y, scale },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: { duration, ease: AUDIO_EASE },
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

type ScrollOffsetTuple = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

interface ScrollParallaxProps {
  offsetRange?: [number, number];
  xRange?: [number, number];
  scaleRange?: [number, number];
  scrollOffset?: ScrollOffsetTuple;
  className?: string;
  children: React.ReactNode;
}

export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  offsetRange = [20, -20],
  xRange,
  scaleRange,
  scrollOffset = ['start end', 'end start'],
  className = '',
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: scrollOffset,
  });

  const smoothProgress = useSpring(scrollYProgress, PARALLAX_SPRING);
  const y = useTransform(smoothProgress, [0, 1], offsetRange);
  const x = useTransform(smoothProgress, [0, 1], xRange ?? [0, 0]);
  const scale = useTransform(smoothProgress, [0, 1], scaleRange ?? [1, 1]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={targetRef} className={className}>
      <motion.div
        style={{
          y,
          x: xRange ? x : undefined,
          scale: scaleRange ? scale : undefined,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface DeviceFloatProps {
  amplitude?: number;
  duration?: number;
  phaseDelay?: number;
  className?: string;
  children: React.ReactNode;
}

export const DeviceFloat: React.FC<DeviceFloatProps> = ({
  amplitude = 5,
  duration = 6,
  phaseDelay = 0,
  className = '',
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [0, -amplitude, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration,
              delay: phaseDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      className={`will-change-transform ${className}`}
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
