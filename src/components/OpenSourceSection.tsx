import React from 'react';
import { Github, Scale, Bug, History, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const OpenSourceSection: React.FC = () => {
  const stats = [
    { value: 'GPL-3.0', label: 'License', sub: 'Free & Open Source' },
    { value: 'v1.9.4', label: 'Current Release', sub: 'Production Ready' },
    { value: '8.0+', label: 'Min Android Version', sub: 'API Level 26+' },
    { value: '3', label: 'Supported Platforms', sub: 'Android · Wear OS · Web' },
  ];

  return (
    <section id="open-source" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Editorial Statement */}
          <ScrollReveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Free & Open Source</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              No telemetry. No tracking. Pure GPL-3.0.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Chordly is free software licensed under GNU General Public License v3.0. Built entirely by Callmerev, the code is open for review, fork, and contribution. No user data is collected, sold, or shared with third parties.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/Callmerev95/Chordly"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Callmerev95/Chordly/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Bug className="w-4 h-4 text-zinc-400" />
                <span>Report an Issue</span>
              </a>

              <a
                href="https://github.com/Callmerev95/Chordly-release/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <History className="w-4 h-4 text-zinc-400" />
                <span>Changelog</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column (5 cols): 2x2 Stats Grid */}
          <StaggerGroup className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <StaggerItem key={idx} className="flex">
                <div
                  className="w-full p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] liquid-glass border border-white/10 flex flex-col justify-center space-y-1 hover:border-[#FF2D55]/30 transition-colors"
                >
                  <span className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FF6B8A]">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {stat.sub}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

        </div>
      </div>
    </section>
  );
};
