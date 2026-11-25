import React from 'react';
import { ArrowLeft, Home, ExternalLink } from 'lucide-react';

interface NotFoundPageProps {
  path: string;
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ path, onNavigate }) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate?.('/');
    }
  };

  return (
    <section
      aria-labelledby="not-found-title"
      className="flex-1 flex items-center border-b border-white/[0.08] bg-[#070708]"
    >
      <div className="mx-auto max-w-[680px] w-full px-6 pt-32 sm:pt-36 pb-20 sm:pb-24">
        {/* Subtle editorial music motif */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 mb-6">
          <span className="inline-flex items-end gap-[3px] h-3.5" aria-hidden="true">
            <span className="w-[2px] h-1.5 rounded-full bg-white/25" />
            <span className="w-[2px] h-2.5 rounded-full bg-white/35" />
            <span className="w-[2px] h-3.5 rounded-full bg-[#ff2d55]" />
            <span className="w-[2px] h-2 rounded-full bg-white/35" />
            <span className="w-[2px] h-1 rounded-full bg-white/25" />
          </span>
          <span>404</span>
          <span aria-hidden="true">·</span>
          <span>Track not found</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-white/35">--:--</span>
        </div>

        {/* Monumental Newsreader error numeral */}
        <div
          className="font-serif italic font-normal text-[clamp(4.5rem,12vw,8.5rem)] leading-[0.88] tracking-[-0.04em] text-white/90 select-none mb-4"
          aria-hidden="true"
        >
          404
        </div>

        <h1
          id="not-found-title"
          className="font-serif font-normal text-[32px] sm:text-[42px] leading-[1.08] tracking-[-0.03em] text-white text-balance"
        >
          This track isn&apos;t in the queue.
        </h1>

        <p className="mt-4 text-[16px] leading-[1.7] text-white/60 max-w-[540px]">
          The route{' '}
          <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/85 break-all">
            {path}
          </code>{' '}
          could not be found. It may have been moved, renamed, or removed from Chordly.
        </p>

        {/* Primary & Secondary Recovery Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/"
            onClick={(e) => onNavigate?.('/', e)}
            className="btn-primary px-6 py-3"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Back to Chordly</span>
          </a>

          <button
            type="button"
            onClick={handleGoBack}
            className="btn-secondary px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 text-white/60 shrink-0" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links Strip */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] text-white/45">
          <a
            href="/"
            onClick={(e) => onNavigate?.('/', e)}
            className="transition-colors hover:text-white"
          >
            Home
          </a>
          <a
            href="https://web-player.chordly.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <span>Web Player</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
          <a
            href="/terms"
            onClick={(e) => onNavigate?.('/terms', e)}
            className="transition-colors hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            onClick={(e) => onNavigate?.('/privacy', e)}
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
};
