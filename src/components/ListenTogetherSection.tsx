import React from 'react';
import { Users, KeyRound, Share2, Radio } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const ListenTogetherSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create a room',
      desc: 'One tap generates a 6-character room code.',
      icon: KeyRound,
    },
    {
      num: '02',
      title: 'Share the code',
      desc: 'Send it to friends on Android or web.',
      icon: Share2,
    },
    {
      num: '03',
      title: 'Stay in sync',
      desc: 'Play, pause, and seek reflect on every screen instantly.',
      icon: Radio,
    },
  ];

  return (
    <section id="together" className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Band with border and glow */}
        <div className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-12 liquid-glass-elevated relative overflow-hidden border border-white/10">
          
          {/* Subtle Ambient Radial */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#FF2D55]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#7C5CFF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            
            <ScrollReveal className="space-y-5 sm:space-y-6">
              {/* Tag & Decorative Glass Code Chip */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>Social Listening</span>
                </div>

                {/* Decorative Glass Code Chip with ping dot */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-[#FF2D55]/40 text-xs font-mono text-white shadow-[0_0_15px_rgba(255,45,85,0.3)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D55] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D55]" />
                  </span>
                  <span className="font-bold tracking-widest text-[#FF6B8A]">ROOM:</span>
                  <span className="font-bold tracking-wider">CHD247</span>
                </div>
              </div>

              {/* H2 */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
                Listen together, miles apart.
              </h2>

              {/* Body */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
                Generate a room code in seconds. Your friends join from Android or web, and playback syncs across every device with sub-second accuracy.
              </p>
            </ScrollReveal>

            {/* 3 Steps Grid */}
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8 text-left">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <StaggerItem key={step.num} className="flex">
                    <div 
                      className="w-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-[#FF2D55]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#FF2D55]/15 border border-[#FF2D55]/25 flex items-center justify-center text-[#FF2D55]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-500">{step.num}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

          </div>

        </div>

      </div>
    </section>
  );
};
