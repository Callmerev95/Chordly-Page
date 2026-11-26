import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'subtle' | 'circle';
}

const VARIANT_CLASSES: Record<NonNullable<SkeletonProps['variant']>, string> = {
  default: 'rounded-lg bg-white/[0.045]',
  glass: 'rounded-2xl bg-white/[0.035] border border-white/[0.08]',
  subtle: 'rounded-md bg-white/[0.03]',
  circle: 'rounded-full bg-white/[0.05] border border-white/[0.08]',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn('v29-skeleton', VARIANT_CLASSES[variant], className)}
      {...props}
    />
  );
};

interface FocusLyricStageSkeletonProps {
  showTranslation?: boolean;
}

const LYRIC_SKELETON_ROWS = [
  { width: 'w-[74%]', translationWidth: 'w-[56%]', active: true, opacityClass: '' },
  { width: 'w-[62%]', translationWidth: 'w-[48%]', active: false, opacityClass: 'opacity-70' },
  { width: 'w-[82%]', translationWidth: 'w-[60%]', active: false, opacityClass: 'opacity-45' },
  { width: 'w-[54%]', translationWidth: 'w-[42%]', active: false, opacityClass: 'opacity-25' },
] as const;

export const FocusLyricStageSkeleton: React.FC<FocusLyricStageSkeletonProps> = ({
  showTranslation = false,
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="relative z-10 h-[224px] sm:h-[236px] overflow-hidden px-1 py-12 space-y-1.5"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
      }}
    >
      <span className="sr-only">Loading synced lyrics and preview audio...</span>
      {LYRIC_SKELETON_ROWS.map((row, idx) => (
        <div
          key={idx}
          aria-hidden="true"
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl flex items-start justify-between gap-3',
            row.active ? 'bg-white/[0.04] border border-white/10' : row.opacityClass
          )}
        >
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton
              variant={row.active ? 'default' : 'subtle'}
              className={cn('h-[18px] sm:h-5 rounded-md', row.width)}
            />
            {showTranslation && (
              <Skeleton
                variant="subtle"
                className={cn('h-3 rounded-md', row.translationWidth)}
              />
            )}
          </div>
          <Skeleton variant="subtle" className="w-8 h-3.5 mt-0.5 rounded shrink-0" />
        </div>
      ))}
    </div>
  );
};

interface DeviceMediaSkeletonProps {
  kind: 'phone' | 'browser' | 'watch' | 'hero';
  className?: string;
}

export const DeviceMediaSkeleton: React.FC<DeviceMediaSkeletonProps> = ({
  kind,
  className,
}) => {
  if (kind === 'watch') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'w-full h-full rounded-full bg-[#070708] flex flex-col items-center justify-between py-3 px-4',
          className
        )}
      >
        <Skeleton variant="subtle" className="w-12 h-2.5 rounded-full" />
        <div className="w-full space-y-2 flex flex-col items-center">
          <Skeleton variant="default" className="w-24 h-3.5 rounded-full" />
          <Skeleton variant="subtle" className="w-16 h-2.5 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-4 h-4" />
          <Skeleton variant="circle" className="w-8 h-8" />
          <Skeleton variant="circle" className="w-4 h-4" />
        </div>
        <Skeleton variant="subtle" className="w-16 h-2 rounded-full" />
      </div>
    );
  }

  if (kind === 'hero') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'w-full h-full rounded-[24px] bg-[#0a0a0d] border border-white/[0.08] p-5 sm:p-7 flex flex-col justify-between overflow-hidden [mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)]',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <Skeleton variant="subtle" className="w-24 h-3 rounded-full" />
          <Skeleton variant="circle" className="w-8 h-8" />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end flex-1 py-4">
          <Skeleton variant="glass" className="h-[78%] rounded-[18px] opacity-65" />
          <Skeleton variant="glass" className="h-[92%] rounded-[20px]" />
          <Skeleton variant="glass" className="h-[78%] rounded-[18px] opacity-65" />
        </div>
        <Skeleton variant="subtle" className="w-2/3 h-3 mx-auto rounded-full" />
      </div>
    );
  }

  if (kind === 'browser') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'w-full h-full bg-[#070708] flex overflow-hidden text-white',
          className
        )}
      >
        {/* Sidebar Skeleton */}
        <div className="w-40 border-r border-white/[0.08] p-4 space-y-3 hidden md:flex flex-col bg-white/[0.015]">
          <Skeleton variant="default" className="w-20 h-4 rounded-md" />
          <div className="space-y-2 pt-2">
            <Skeleton variant="default" className="w-full h-7 rounded-lg" />
            <Skeleton variant="subtle" className="w-4/5 h-6 rounded-lg" />
            <Skeleton variant="subtle" className="w-3/4 h-6 rounded-lg" />
            <Skeleton variant="subtle" className="w-5/6 h-6 rounded-lg" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4 overflow-hidden">
          <div className="space-y-2">
            <Skeleton variant="subtle" className="w-32 h-2.5 rounded-full" />
            <Skeleton variant="default" className="w-56 h-6 rounded-md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton variant="glass" className="w-full aspect-square rounded-xl" />
                <Skeleton variant="subtle" className="w-4/5 h-3 rounded" />
                <Skeleton variant="subtle" className="w-1/2 h-2.5 rounded" />
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton variant="default" className="w-9 h-9 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <Skeleton variant="default" className="w-24 h-3 rounded" />
                <Skeleton variant="subtle" className="w-32 h-2.5 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Skeleton variant="circle" className="w-4 h-4" />
              <Skeleton variant="circle" className="w-7 h-7" />
              <Skeleton variant="circle" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-full h-full bg-[#070708] flex flex-col justify-between p-5',
        className
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <Skeleton variant="subtle" className="w-16 h-2.5 rounded-full" />
        <Skeleton variant="subtle" className="w-20 h-4 rounded-full" />
      </div>

      <div className="my-auto space-y-4">
        <Skeleton variant="glass" className="w-36 h-36 mx-auto rounded-2xl" />
        <div className="space-y-2 flex flex-col items-center">
          <Skeleton variant="default" className="w-32 h-4 rounded-md" />
          <Skeleton variant="subtle" className="w-24 h-3 rounded-md" />
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton variant="subtle" className="w-full h-3 rounded" />
          <Skeleton variant="subtle" className="w-5/6 h-3 rounded" />
          <Skeleton variant="subtle" className="w-2/3 h-3 rounded" />
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-white/[0.06]">
        <Skeleton variant="subtle" className="w-full h-1.5 rounded-full" />
        <div className="flex items-center justify-between px-2">
          <Skeleton variant="circle" className="w-4 h-4" />
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="w-4 h-4" />
            <Skeleton variant="circle" className="w-9 h-9" />
            <Skeleton variant="circle" className="w-4 h-4" />
          </div>
          <Skeleton variant="circle" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

interface NewsEntrySkeletonListProps {
  count?: number;
}

export const NewsEntrySkeletonList: React.FC<NewsEntrySkeletonListProps> = ({
  count = 3,
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="divide-y divide-white/[0.08]"
    >
      <span className="sr-only">Loading release notes and announcements...</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} aria-hidden="true" className="py-10 first:pt-10 last:pb-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Skeleton variant="subtle" className="w-20 h-3 rounded" />
            <Skeleton variant="subtle" className="w-24 h-3 rounded" />
            <Skeleton variant="subtle" className="w-14 h-3 rounded" />
          </div>
          <Skeleton variant="default" className="w-3/4 sm:w-2/3 h-8 rounded-lg" />
          <div className="space-y-2 max-w-[740px]">
            <Skeleton variant="subtle" className="w-full h-4 rounded" />
            <Skeleton variant="subtle" className="w-5/6 h-4 rounded" />
          </div>
          <div className="space-y-2 pl-5 pt-1">
            <Skeleton variant="subtle" className="w-4/5 h-3.5 rounded" />
            <Skeleton variant="subtle" className="w-2/3 h-3.5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const TestimonialCoverflowSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[28px] v29-glass-frame p-4 sm:p-7"
    >
      <span className="sr-only">Loading community testimonials...</span>

      <div aria-hidden="true" className="flex items-center justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <Skeleton variant="default" className="w-44 h-6 rounded-md" />
          <Skeleton variant="subtle" className="w-36 h-3 rounded" />
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Skeleton variant="circle" className="size-11" />
          <Skeleton variant="circle" className="size-11" />
        </div>
      </div>

      <div aria-hidden="true" className="mt-5 flex justify-center py-2">
        <div className="w-full max-w-[420px] rounded-[22px] sm:rounded-[24px] border border-white/10 bg-[#0d0d10]/90 p-5 sm:p-6 space-y-4">
          <Skeleton variant="default" className="size-7 rounded-md" />
          <div className="space-y-2">
            <Skeleton variant="default" className="w-full h-4 rounded" />
            <Skeleton variant="default" className="w-11/12 h-4 rounded" />
            <Skeleton variant="subtle" className="w-3/4 h-4 rounded" />
          </div>
          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
            <Skeleton variant="circle" className="size-10 shrink-0" />
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton variant="default" className="w-28 h-3.5 rounded" />
              <Skeleton variant="subtle" className="w-36 h-3 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-5 flex items-center gap-4">
        <Skeleton variant="subtle" className="h-1 flex-1 rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="w-4 h-1.5" />
          <Skeleton variant="circle" className="w-1.5 h-1.5" />
          <Skeleton variant="circle" className="w-1.5 h-1.5" />
        </div>
      </div>
    </div>
  );
};
