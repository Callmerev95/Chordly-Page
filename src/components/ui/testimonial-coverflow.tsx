'use client';

import * as React from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '../../data/testimonials';

export type { Testimonial };

export interface TestimonialCoverflowProps {
  items: Testimonial[];
  title?: string;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

const CRIMSON = '#ff2d55';
const PROGRESS_GRADIENT = `linear-gradient(90deg, #ffffff 0%, ${CRIMSON} 100%)`;

interface CardProps {
  item: Testimonial;
  i: number;
  pos: MotionValue<number>;
  w: number;
  reduce: boolean;
  active: boolean;
  figureRef?: (node: HTMLElement | null) => void;
}

function Card({ item, i, pos, w, reduce, active, figureRef }: CardProps) {
  const d = useTransform(pos, (p) => i - p);
  const x = useTransform(d, (v) =>
    reduce
      ? v * (w + 16)
      : Math.sign(v) * Math.min(Math.abs(v), 1) * w * 0.62 +
        Math.max(0, Math.abs(v) - 1) * w * 0.3 * Math.sign(v)
  );
  const rotateY = useTransform(d, (v) =>
    reduce ? 0 : Math.max(-1.4, Math.min(1.4, v)) * -38
  );
  const scale = useTransform(d, (v) =>
    reduce ? 1 : 1 - Math.min(Math.abs(v), 2) * 0.12
  );
  const z = useTransform(d, (v) =>
    reduce ? 0 : -Math.min(Math.abs(v), 2) * 120
  );
  const opacity = useTransform(d, (v) =>
    Math.max(0, 1 - Math.abs(v) * (reduce ? 1 : 0.38))
  );
  const zi = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));
  const px1 = useTransform(d, (v) => (reduce ? 0 : v * -24));
  const px2 = useTransform(d, (v) => (reduce ? 0 : v * -12));
  const px3 = useTransform(d, (v) => (reduce ? 0 : v * 16));
  const blur = useTransform(d, (v) =>
    reduce ? 'blur(0px)' : `blur(${Math.min(Math.abs(v), 2) * 1.5}px)`
  );

  return (
    <motion.li
      aria-hidden={!active}
      aria-roledescription="slide"
      aria-label={`${i + 1}`}
      className="absolute left-1/2 top-0 list-none"
      style={{
        width: w,
        marginLeft: -w / 2,
        x,
        rotateY,
        scale,
        z,
        opacity,
        zIndex: zi,
        filter: blur,
        transformStyle: 'preserve-3d',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      <figure
        ref={figureRef}
        className={cn(
          'relative overflow-hidden rounded-[22px] sm:rounded-[24px] border bg-[#0d0d10]/95 backdrop-blur-2xl p-4 sm:p-6 transition-colors shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]',
          active ? 'border-white/20' : 'border-white/[0.08]'
        )}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full blur-3xl opacity-25"
          style={{
            x: px3,
            background: `radial-gradient(circle, ${CRIMSON} 0%, transparent 70%)`,
          }}
        />
        <motion.div style={{ x: px2 }} className="relative">
          <Quote className="size-7 text-[#ff2d55]" aria-hidden="true" />
        </motion.div>
        <motion.blockquote
          style={{ x: px1 }}
          className="relative mt-3 text-[15px] sm:text-[16px] leading-[1.55] text-white/90 break-words"
        >
          {item.quote}
        </motion.blockquote>
        <figcaption className="relative mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-white/[0.08] flex items-center gap-3">
          <motion.span
            style={{ x: px3 }}
            className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] text-xs font-mono font-semibold text-white tracking-wide"
          >
            {item.avatarUrl ? (
              <img
                src={item.avatarUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="size-full object-cover"
              />
            ) : (
              <span className="grid size-full place-items-center text-[#ff2d55]">
                {item.initials ?? item.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </motion.span>
          <span className="min-w-0 text-sm">
            <span className="flex items-center gap-1 font-semibold text-white">
              <span className="truncate">{item.name}</span>
              {item.verified && (
                <BadgeCheck
                  className="size-3.5 shrink-0 text-[#ff2d55]"
                  role="img"
                  aria-label="Verified"
                />
              )}
            </span>
            <span className="block text-[12px] text-white/45 truncate">
              {item.role}
            </span>
          </span>
          {(item.sourceUrl || item.profileUrl) && (
            <a
              href={item.sourceUrl ?? item.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto inline-flex items-center gap-1 whitespace-nowrap shrink-0 font-mono text-[11px] text-[#ff2d55] hover:underline underline-offset-4"
            >
              {item.sourceUrl ? 'Source' : 'Profile'}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          )}
        </figcaption>
      </figure>
    </motion.li>
  );
}

export function TestimonialCoverflow({
  items,
  title = 'What listeners say',
  defaultIndex = 0,
  onChange,
  className,
}: TestimonialCoverflowProps) {
  const reduce = !!useReducedMotion();
  const wrap = React.useRef<HTMLDivElement>(null);
  const cardNodes = React.useRef(new Map<string, HTMLElement>());
  const [w, setW] = React.useState(360);
  const [stageHeight, setStageHeight] = React.useState(296);
  const safeDefault = Math.max(0, Math.min(items.length - 1, defaultIndex));
  const [index, setIndex] = React.useState(safeDefault);
  const pos = useMotionValue(safeDefault);
  const [grabbing, setGrabbing] = React.useState(false);
  const down = React.useRef<{ x: number; p: number; t: number; v: number } | null>(
    null
  );

  const setCardRef = React.useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) {
        cardNodes.current.set(id, node);
      } else {
        cardNodes.current.delete(id);
      }
    },
    []
  );

  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const available = el.offsetWidth;
      const next =
        available < 480
          ? Math.min(available - 8, Math.max(240, available - 16))
          : Math.min(420, Math.max(280, available - 32));
      setW(next);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const updateHeight = () => {
      let maxH = 0;
      cardNodes.current.forEach((node) => {
        maxH = Math.max(maxH, node.offsetHeight);
      });
      if (maxH > 0) {
        setStageHeight(Math.max(288, Math.ceil(maxH) + 8));
      }
    };

    const ro = new ResizeObserver(updateHeight);
    cardNodes.current.forEach((node) => ro.observe(node));

    const raf = requestAnimationFrame(updateHeight);
    document.fonts?.ready?.then(updateHeight).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [items, w]);

  const goTo = React.useCallback(
    (n: number, velocity = 0) => {
      if (items.length === 0) return;
      const t = Math.max(0, Math.min(items.length - 1, n));
      setIndex(t);
      onChange?.(t);
      animate(
        pos,
        t,
        reduce
          ? { duration: 0.18 }
          : { type: 'spring', stiffness: 140, damping: 17, velocity }
      );
    },
    [items.length, onChange, pos, reduce]
  );

  const onDown = (e: React.PointerEvent) => {
    if (reduce) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pos.stop();
    down.current = {
      x: e.clientX,
      p: pos.get(),
      t: performance.now(),
      v: 0,
    };
    setGrabbing(true);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = down.current;
    if (!d) return;
    const next = d.p - (e.clientX - d.x) / (w * 0.62);
    const now = performance.now();
    d.v = (((d.p - next) - (d.p - pos.get())) / Math.max(1, now - d.t)) * 1000;
    d.t = now;
    pos.set(Math.max(-0.4, Math.min(items.length - 0.6, next)));
  };

  const onUp = () => {
    const d = down.current;
    down.current = null;
    setGrabbing(false);
    if (!d) return;
    const fling = -d.v * 0.12;
    goTo(Math.round(pos.get() + fling), -d.v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(items.length - 1);
    }
  };

  const progress = useTransform(
    pos,
    [0, Math.max(1, items.length - 1)],
    ['0%', '100%']
  );
  const glowX = useTransform(
    pos,
    [0, Math.max(1, items.length - 1)],
    ['20%', '80%']
  );
  const glow = useMotionTemplate`radial-gradient(60% 60% at ${glowX} 42%, rgba(255, 45, 85, 0.14), transparent)`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      className={cn(
        'relative w-full overflow-hidden rounded-[24px] sm:rounded-[28px] v29-glass-frame p-4 sm:p-7 text-white',
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif italic text-[22px] text-white truncate">
            {title}
          </h3>
          <p className="font-mono text-[11px] text-white/45 tabular-nums mt-0.5">
            {index + 1} / {items.length} · Drag or use arrow keys
          </p>
        </div>

        <div className="flex gap-1.5 shrink-0">
          {[-1, 1].map((n) => {
            const disabled =
              n < 0 ? index <= 0 : index >= items.length - 1;
            return (
              <motion.button
                key={n}
                type="button"
                onClick={() => goTo(index + n)}
                disabled={disabled}
                aria-label={n < 0 ? 'Previous testimonial' : 'Next testimonial'}
                whileTap={reduce || disabled ? undefined : { scale: 0.9 }}
                whileHover={reduce || disabled ? undefined : { scale: 1.05 }}
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white outline-none hover:bg-white/[0.10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d55] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                {n < 0 ? (
                  <ChevronLeft className="size-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="size-4" aria-hidden="true" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        ref={wrap}
        tabIndex={0}
        role="group"
        aria-label="Use the left and right arrow keys, or drag"
        onKeyDown={onKeyDown}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={cn(
          'relative z-10 mt-5 touch-pan-y select-none outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2d55]',
          grabbing ? 'cursor-grabbing' : 'cursor-grab'
        )}
        style={{ perspective: 1000, height: stageHeight }}
      >
        <ul
          className="relative h-full m-0 p-0"
          style={{ transformStyle: 'preserve-3d' }}
          aria-live="polite"
        >
          {items.map((it, i) => (
            <Card
              key={it.id}
              item={it}
              i={i}
              pos={pos}
              w={w}
              reduce={reduce}
              active={i === index}
              figureRef={setCardRef(it.id)}
            />
          ))}
        </ul>
      </div>

      <div className="relative z-20 mt-5 flex items-center gap-3 sm:gap-4">
        <div className="h-1 min-w-[72px] flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ width: progress, background: PROGRESS_GRADIENT }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-end">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
              className="grid size-7 min-h-7 place-items-center outline-none focus-visible:outline-2 focus-visible:outline-[#ff2d55]"
            >
              <motion.span
                className="block rounded-full"
                animate={{
                  width: i === index ? 18 : 6,
                  backgroundColor: i === index ? CRIMSON : 'rgba(255,255,255,0.2)',
                }}
                style={{ height: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
