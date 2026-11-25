import React from 'react';
import { RotateCcw, RefreshCw, Home, ExternalLink } from 'lucide-react';
import { ChordlyLogo } from './ChordlyLogo';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message ? String(error.message).slice(0, 180) : '',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Chordly ErrorBoundary caught an error:', error, info);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    this.setState({ hasError: false, errorMessage: '' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-[#070708] text-white font-sans relative overflow-x-clip selection:bg-[#ff2d55] selection:text-white flex flex-col">
        {/* Subtle ambient crimson glow matching Chordly backdrop */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(255, 45, 85, 0.14), transparent 42%), radial-gradient(circle at 12% 88%, rgba(255, 45, 85, 0.08), transparent 42%)',
          }}
        />

        <header className="relative z-10 px-[4vw] sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <a
            href="/"
            onClick={this.handleGoHome}
            className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d55] rounded-full p-1 -m-1"
            aria-label="Chordly Home"
          >
            <ChordlyLogo size="md" showWordmark={true} />
          </a>
        </header>

        <main className="relative z-10 flex-1 flex items-center">
          <section
            aria-labelledby="runtime-error-title"
            className="mx-auto max-w-[680px] w-full px-6 py-16 sm:py-20"
          >
            {/* Subtle editorial music motif */}
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 mb-6">
              <span className="inline-flex items-end gap-[3px] h-3.5" aria-hidden="true">
                <span className="w-[2px] h-1 rounded-full bg-white/25" />
                <span className="w-[2px] h-1.5 rounded-full bg-white/30" />
                <span className="w-[2px] h-3 rounded-full bg-[#ff2d55]" />
                <span className="w-[2px] h-1.5 rounded-full bg-white/30" />
                <span className="w-[2px] h-1 rounded-full bg-white/25" />
              </span>
              <span>500</span>
              <span aria-hidden="true">·</span>
              <span>Playback interrupted</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-white/35">--:--</span>
            </div>

            <div
              className="font-serif italic font-normal text-[clamp(4.5rem,12vw,8.5rem)] leading-[0.88] tracking-[-0.04em] text-white/90 select-none mb-4"
              aria-hidden="true"
            >
              500
            </div>

            <h1
              id="runtime-error-title"
              className="font-serif font-normal text-[32px] sm:text-[42px] leading-[1.08] tracking-[-0.03em] text-white text-balance"
            >
              Playback hit an unexpected snag.
            </h1>

            <p className="mt-4 text-[16px] leading-[1.7] text-white/60 max-w-[540px]">
              An unexpected runtime error prevented this view from rendering cleanly. You can retry the current view, reload the page, or return to the Chordly home page.
            </p>

            {this.state.errorMessage && (
              <p className="mt-3 font-mono text-[12px] text-white/40 break-words max-w-[540px]">
                {this.state.errorMessage}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-primary px-6 py-3"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="btn-secondary px-6 py-3"
              >
                <RefreshCw className="w-4 h-4 text-white/60 shrink-0" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                onClick={this.handleGoHome}
                className="btn-secondary px-6 py-3"
              >
                <Home className="w-4 h-4 text-white/60 shrink-0" />
                <span>Back to Chordly</span>
              </a>
            </div>

            <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] text-white/45">
              <a
                href="/"
                onClick={this.handleGoHome}
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
              <a href="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </a>
              <a href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
