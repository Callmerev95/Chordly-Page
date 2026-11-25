import React from 'react';
import { Sparkles, Disc3, Mic2, Radio, Watch, Users, Activity, ListMusic, BarChart3, Brain } from 'lucide-react';

export const ProofStrip: React.FC = () => {
  const claims = [
    { label: 'Synced lyrics', icon: Mic2 },
    { label: 'Lossless audio', icon: Disc3 },
    { label: 'Bit-Perfect USB DAC', icon: Sparkles },
    { label: 'Automix', icon: Radio },
    { label: 'Wear OS remote', icon: Watch },
    { label: 'Listen Together', icon: Users },
    { label: 'Discord Rich Presence', icon: Activity },
    { label: 'Spotify integration', icon: ListMusic },
    { label: 'Last.fm', icon: BarChart3 },
    { label: 'ListenBrainz', icon: Brain },
  ];

  const repeatedClaims = [...claims, ...claims];

  return (
    <div className="relative border-b border-white/[0.08] bg-[#070708] overflow-hidden py-3.5 select-none">
      <div className="w-full overflow-hidden">
        <div
          className="group relative flex overflow-hidden w-full"
          aria-label="Chordly core features ticker"
        >
          <div className="flex shrink-0 items-center gap-8 pr-8 animate-proof-marquee group-hover:[animation-play-state:paused]">
            {repeatedClaims.map((claim, idx) => {
              const Icon = claim.icon;
              return (
                <div
                  key={`track1-${idx}`}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-[#ff2d55] shrink-0" />
                  <span className="whitespace-nowrap">{claim.label}</span>
                  <span aria-hidden="true" className="text-white/20 ml-3">·</span>
                </div>
              );
            })}
          </div>

          <div
            className="flex shrink-0 items-center gap-8 pr-8 animate-proof-marquee group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {repeatedClaims.map((claim, idx) => {
              const Icon = claim.icon;
              return (
                <div
                  key={`track2-${idx}`}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-[#ff2d55] shrink-0" />
                  <span className="whitespace-nowrap">{claim.label}</span>
                  <span aria-hidden="true" className="text-white/20 ml-3">·</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
