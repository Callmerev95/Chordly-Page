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
    <section id="together" className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="p-7 sm:p-10 lg:p-12 rounded-[32px] v29-glass-frame">
          <ScrollReveal className="relative z-10 max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              <span className="inline-flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#ff2d55]" />
                <span>Social Listening</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-white bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
                ROOM: CHD247
              </span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Listen together, <span className="italic">miles apart.</span>
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Generate a room code in seconds. Your friends join from Android or web, and playback syncs across every device with sub-second accuracy.
            </p>
          </ScrollReveal>

          {/* 3 Steps Grid */}
          <StaggerGroup stagger={0.1} delay={0.06} className="relative z-10 grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.08] mt-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.num} y={20} scale={0.97} className="flex">
                  <div
                    className={`w-full py-7 ${
                      idx < 2 ? 'md:border-r md:border-white/[0.08] md:pr-8' : ''
                    } ${idx > 0 ? 'border-t md:border-t-0 border-white/[0.08] md:pl-8' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff2d55]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[11px] text-white/40 tabular-nums">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-serif italic text-[22px] text-white mb-1.5">{step.title}</h3>
                    <p className="text-[14px] text-white/50 leading-[1.55]">{step.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};
