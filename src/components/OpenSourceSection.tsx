import React, { useEffect, useState } from 'react';
import { Github, Scale, Bug, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

const BASELINE_DOWNLOADS = 45;
const BASELINE_RELEASE = 'v1.9.5';
const RELEASES_API_URL = 'https://api.github.com/repos/Callmerev95/Chordly-release/releases?per_page=100';

export const OpenSourceSection: React.FC = () => {
  const [totalDownloads, setTotalDownloads] = useState<number>(BASELINE_DOWNLOADS);
  const [currentRelease, setCurrentRelease] = useState<string>(BASELINE_RELEASE);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReleaseStats() {
      try {
        const response = await fetch(RELEASES_API_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) return;

        const releases: unknown = await response.json();
        if (!Array.isArray(releases)) return;

        let latestTag = '';
        let sum = 0;

        for (const release of releases) {
          if (!release || typeof release !== 'object') continue;
          const r = release as {
            tag_name?: unknown;
            draft?: unknown;
            prerelease?: unknown;
            assets?: unknown;
          };

          if (
            !latestTag &&
            !r.draft &&
            !r.prerelease &&
            typeof r.tag_name === 'string' &&
            r.tag_name.trim()
          ) {
            const rawTag = r.tag_name.trim();
            latestTag = rawTag.startsWith('v') || rawTag.startsWith('V') ? rawTag : `v${rawTag}`;
          }

          if (!Array.isArray(r.assets)) continue;
          for (const asset of r.assets) {
            if (
              asset &&
              typeof asset === 'object' &&
              typeof (asset as { download_count?: unknown }).download_count === 'number' &&
              Number.isFinite((asset as { download_count: number }).download_count)
            ) {
              sum += (asset as { download_count: number }).download_count;
            }
          }
        }

        if (latestTag) {
          setCurrentRelease(latestTag);
        }

        if (sum >= BASELINE_DOWNLOADS) {
          setTotalDownloads(sum);
        }
      } catch {
        // Keep baseline fallbacks when offline or rate-limited
      }
    }

    loadReleaseStats();
    return () => controller.abort();
  }, []);

  const stats = [
    { value: 'GPL-3.0', label: 'License', sub: 'Free & Open Source' },
    { value: currentRelease, label: 'Current Release', sub: 'Production Ready' },
    {
      value: totalDownloads.toLocaleString('en-US'),
      label: 'Total Downloads',
      sub: 'Verified release downloads',
    },
    { value: '4', label: 'Supported Platforms', sub: 'Android · Wear OS · Android TV · Web' },
  ];

  return (
    <section id="open-source" className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <ScrollReveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <Scale className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Free &amp; Open Source</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              No telemetry. No tracking. <span className="italic">Pure GPL-3.0.</span>
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Chordly is free software licensed under GNU General Public License v3.0. Developed entirely by Callmerev, the code is open for review, fork, and contribution. No user data is collected, sold, or shared with third parties.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
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
                <Bug className="w-4 h-4 text-white/60" />
                <span>Report an Issue</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: 2x2 Frosted Stats Grid */}
          <StaggerGroup className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <StaggerItem key={idx} className="flex">
                <div className="w-full p-6 rounded-[24px] v29-glass-card hover:border-white/25 transition-colors flex flex-col justify-center space-y-1.5">
                  <span className="font-serif italic text-[28px] sm:text-[34px] text-white leading-none tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#ff2d55]">
                    {stat.label}
                  </span>
                  <span className="text-[12px] text-white/45">
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
