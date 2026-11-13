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

  // Repeat claims to ensure continuous coverage on all screen resolutions
  const repeatedClaims = [...claims, ...claims];

  return (
    <div className="relative border-y border-white/[0.08] bg-[#0E0C12]/80 backdrop-blur-md overflow-hidden py-3.5 sm:py-4 select-none">
      <div className="w-full overflow-hidden">
        {/* Infinite Auto Marquee Container */}
        <div 
          className="group relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
          aria-label="Chordly core features ticker"
        >
          {/* Primary Track */}
          <div className="flex shrink-0 items-center gap-8 sm:gap-10 pr-8 sm:pr-10 animate-proof-marquee group-hover:[animation-play-state:paused]">
            {repeatedClaims.map((claim, idx) => {
              const Icon = claim.icon;
              return (
                <div 
                  key={`track1-${idx}`} 
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF2D55] shrink-0" />
                  <span className="whitespace-nowrap tracking-tight">{claim.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 ml-2 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Secondary Track for perfectly seamless infinite looping */}
          <div 
            className="flex shrink-0 items-center gap-8 sm:gap-10 pr-8 sm:pr-10 animate-proof-marquee group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {repeatedClaims.map((claim, idx) => {
              const Icon = claim.icon;
              return (
                <div 
                  key={`track2-${idx}`} 
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF2D55] shrink-0" />
                  <span className="whitespace-nowrap tracking-tight">{claim.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 ml-2 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

