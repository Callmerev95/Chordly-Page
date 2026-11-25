import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, Smartphone, Watch, Tv, Globe, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';
import {
  fetchReleases,
  findAndroidApk,
  findTvApk,
  findWearApk,
  formatMegabytes,
} from '../utils/releases';

interface AssetMeta {
  sizeLabel: string;
  url: string;
}

interface ReleaseInstallMeta {
  version: string;
  android: AssetMeta;
  wear: AssetMeta;
  tv: AssetMeta;
}

const DEFAULT_RELEASE_META: ReleaseInstallMeta = {
  version: 'v1.9.5',
  android: {
    sizeLabel: '164.5 MB',
    url: 'https://github.com/Callmerev95/Chordly-release/releases/download/v1.9.5/app-prod-universal-release.apk',
  },
  wear: {
    sizeLabel: '4.5 MB',
    url: 'https://github.com/Callmerev95/Chordly-release/releases/download/v1.9.5/ChordlyWear-prod-release.apk',
  },
  tv: {
    sizeLabel: '148.9 MB',
    url: 'https://github.com/Callmerev95/Chordly-release/releases/download/v1.9.5/tv-prod-universal-release.apk',
  },
};

export const InstallSection: React.FC = () => {
  const [releaseMeta, setReleaseMeta] = useState<ReleaseInstallMeta>(DEFAULT_RELEASE_META);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchReleases(controller.signal)
      .then((releases) => {
        if (!active || releases.length === 0) return;
        const latest = releases[0];
        const androidAsset = findAndroidApk(latest.assets);
        const wearAsset = findWearApk(latest.assets);
        const tvAsset = findTvApk(latest.assets);

        setReleaseMeta((prev) => ({
          version: latest.tag,
          android: androidAsset
            ? { sizeLabel: formatMegabytes(androidAsset.size), url: androidAsset.downloadUrl }
            : prev.android,
          wear: wearAsset
            ? { sizeLabel: formatMegabytes(wearAsset.size), url: wearAsset.downloadUrl }
            : prev.wear,
          tv: tvAsset
            ? { sizeLabel: formatMegabytes(tvAsset.size), url: tvAsset.downloadUrl }
            : prev.tv,
        }));
      })
      .catch(() => {
        // Retain fallback metadata if offline or rate-limited
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);
  return (
    <section id="install" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mb-12 sm:mb-14 space-y-4">
          <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff2d55]">
            Installation · Zero Trackers
          </span>
          <h2 className="font-serif font-normal text-[36px] sm:text-[48px] text-white tracking-[-0.03em] leading-[1.05] text-balance">
            Get <span className="italic">Chordly.</span>
          </h2>
          <p className="text-[17px] leading-[1.6] text-white/55">
            Choose your platform and start listening in under two minutes.
          </p>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {/* Card 1: Android (Recommended) */}
          <StaggerItem className="flex">
            <div className="w-full p-7 rounded-[28px] v29-glass-frame flex flex-col justify-between">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#ff2d55]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-[#070708] font-mono text-[10px] uppercase tracking-wider font-semibold">
                    Recommended
                  </span>
                </div>

                <div>
                  <h3 className="font-serif italic text-[26px] text-white">Android APK</h3>
                  <p className="font-mono text-[11px] text-white/45 mt-1 tabular-nums">
                    {releaseMeta.version} · {releaseMeta.android.sizeLabel} · Android 8.0+
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      1
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Download the universal APK from GitHub Releases
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      2
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Open the downloaded file and allow &apos;Install unknown apps&apos; if prompted
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      3
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Launch Chordly and sign in to YouTube Music
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 space-y-3">
                <a
                  href={releaseMeta.android.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-2.5 px-4 flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download APK</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="text-center">
                  <a
                    href="https://github.com/Callmerev95/Chordly-release/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-wider text-[#ff2d55] hover:underline underline-offset-4"
                  >
                    All Releases
                  </a>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Wear OS */}
          <StaggerItem className="flex">
            <div className="w-full p-7 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#ff2d55]">
                    <Watch className="w-4 h-4" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/60">
                    Companion
                  </span>
                </div>

                <div>
                  <h3 className="font-serif italic text-[26px] text-white">Wear OS Companion</h3>
                  <p className="font-mono text-[11px] text-white/45 mt-1 tabular-nums">
                    {releaseMeta.version} · {releaseMeta.wear.sizeLabel} · Wear OS 3+
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      1
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Install Chordly on your Android phone first
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      2
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Download the Wear OS APK from GitHub Releases
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      3
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Sideload via ADB or your favorite watch tool (e.g. Bugjaeger)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href={releaseMeta.wear.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2.5 px-4 flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Wear APK</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <p className="text-center font-mono text-[11px] text-white/40">
                  Pair with phone app via ADB or Bluetooth
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Android TV */}
          <StaggerItem className="flex">
            <div
              id="install-tv"
              className="scroll-mt-24 w-full p-7 rounded-[28px] v29-glass-card flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#ff2d55]">
                    <Tv className="w-4 h-4" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/60">
                    Living Room
                  </span>
                </div>

                <div>
                  <h3 className="font-serif italic text-[26px] text-white">Android TV</h3>
                  <p className="font-mono text-[11px] text-white/45 mt-1 tabular-nums">
                    {releaseMeta.version} · {releaseMeta.tv.sizeLabel} · Android TV 8.0+
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      1
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Download the Android TV APK from GitHub Releases
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      2
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Install via Downloader, USB drive, or ADB on your TV
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      3
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Sign in with YouTube Music for couch playback &amp; full-screen lyrics
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href={releaseMeta.tv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2.5 px-4 flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download TV APK</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <p className="text-center font-mono text-[11px] text-white/40">
                  Optimized for TV remotes &amp; 10-foot screens
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Card 4: Web Player */}
          <StaggerItem className="flex">
            <div className="w-full p-7 rounded-[28px] v29-glass-card flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#ff2d55]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/60">
                    Browser
                  </span>
                </div>

                <div>
                  <h3 className="font-serif italic text-[26px] text-white">Web Player</h3>
                  <p className="font-mono text-[11px] text-white/45 mt-1">
                    Chrome · Edge · Brave · Firefox
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      1
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Install the Chordly browser extension from Chrome Web Store or Firefox Add-ons
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      2
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Navigate to web-player.chordly.my.id
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white flex items-center justify-center flex-shrink-0 mt-0.5 tabular-nums">
                      3
                    </span>
                    <p className="text-[14px] text-white/65 leading-[1.5]">
                      Sign in with your YouTube Music account and start streaming
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  href="https://web-player.chordly.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2.5 text-center"
                >
                  <span>Launch Web Player</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-center font-mono text-[11px] text-white/40">
                  Requires Chordly browser extension bridge
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};
