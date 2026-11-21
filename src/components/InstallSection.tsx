import React from 'react';
import { Download, ExternalLink, Smartphone, Watch, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const InstallSection: React.FC = () => {

  return (
    <section id="install" className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
            Installation
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
            Get Chordly.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            Choose your platform and start listening in under two minutes.
          </p>
        </ScrollReveal>

        {/* 3 Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Android (Highlighted with pink glow and prominent border) */}
          <StaggerItem className="flex">
            <div className="w-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 liquid-glass relative overflow-hidden border-2 border-[#FF2D55]/60 shadow-[0_15px_40px_-10px_rgba(255,45,85,0.35)] flex flex-col justify-between">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2D55]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2D55]/20 border border-[#FF2D55]/30 flex items-center justify-center text-[#FF2D55]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FF2D55] text-white text-xs font-bold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Recommended
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Android APK</h3>
                <p className="text-xs font-mono text-[#FF6B8A] mt-1">v1.9.4 · 197 MB · Android 8.0+</p>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Download the universal APK from GitHub Releases
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Open the downloaded file and allow 'Install unknown apps' if prompted
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Launch Chordly and sign in to YouTube Music
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: Primary Download APK Button */}
            <div className="pt-8 space-y-3 relative z-10">
              <a
                href="https://github.com/Callmerev95/Chordly-release/releases/download/v1.9.4/app-prod-universal-release.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3.5 px-4 text-center shadow-lg flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="truncate font-semibold text-sm">Download APK</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="text-center pt-1">
                <a
                  href="https://github.com/Callmerev95/Chordly-release/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#FF6B8A] hover:text-white transition-colors underline underline-offset-4"
                >
                  All Releases
                </a>
              </div>
            </div>
            </div>
          </StaggerItem>

          {/* Card 2: Wear OS */}
          <StaggerItem className="flex">
            <div className="w-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 liquid-glass liquid-glass-hover relative overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF]">
                  <Watch className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-zinc-400">
                  Companion
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Wear OS Companion</h3>
                <p className="text-xs font-mono text-[#A78BFA] mt-1">v1.9.4 · ~4.5 MB · Wear OS 3+</p>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Install Chordly on your Android phone first
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Download the Wear OS APK from GitHub Releases
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Sideload via ADB or your favorite watch tool (e.g. Bugjaeger)
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: Primary Download Wear APK Button */}
            <div className="pt-8 space-y-3">
              <a
                href="https://github.com/Callmerev95/Chordly-release/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full py-3.5 px-4 text-center flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="truncate font-semibold text-sm">Download Wear APK</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="text-center pt-1">
                <p className="text-xs text-zinc-400">Pair with phone app via ADB or Bluetooth</p>
              </div>
            </div>
            </div>
          </StaggerItem>

          {/* Card 3: Web Player */}
          <StaggerItem className="flex md:col-span-2 md:max-w-lg md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0">
            <div className="w-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 liquid-glass liquid-glass-hover relative overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9A62]/20 border border-[#FF9A62]/30 flex items-center justify-center text-[#FF9A62]">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-[#4ADE80]">
                  Browser
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Web Player</h3>
                <p className="text-xs font-mono text-[#FF9A62] mt-1">Chrome · Edge · Brave · Firefox</p>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Install the Chordly browser extension from Chrome Web Store or Firefox Add-ons
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Navigate to chordly.callmerev.my.id
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-sm text-zinc-300 leading-snug">
                    Sign in with your YouTube Music account and start streaming
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full py-3.5 text-center"
              >
                <span>Launch Web Player</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            </div>
          </StaggerItem>

        </StaggerGroup>

      </div>
    </section>
  );
};
