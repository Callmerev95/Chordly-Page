import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const FaqSection: React.FC = () => {
  // First item open by default (index 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Chordly free and open source?',
      a: 'Yes. Chordly is completely free to download and licensed under the GNU General Public License v3.0 (GPL-3.0). The full source code is publicly available on GitHub.',
    },
    {
      q: 'Do I need a YouTube Music subscription to use Chordly?',
      a: 'You can use Chordly with both free and YouTube Music Premium accounts. Premium accounts benefit from higher audio bitrates provided by YouTube Music servers.',
    },
    {
      q: 'Why does the web player need a browser extension?',
      a: "Because YouTube Music's APIs require proper authentication and CORS headers that standard web applications cannot bypass directly. The Chordly extension safely routes playback requests between the web player and YouTube.",
    },
    {
      q: 'How does the Wear OS app work with my phone?',
      a: 'The Wear OS app acts as a remote controller and optional speaker playback target. It must be paired with an Android build of Chordly installed with the same package name and signing key.',
    },
    {
      q: 'What is Bit-Perfect USB DAC mode?',
      a: "Android typically resamples all audio output to 48 kHz. Chordly's Bit-Perfect mode bypasses the Android system mixer (audio flinger) and sends the raw, unaltered audio stream directly to your connected USB DAC up to 24-bit / 192 kHz.",
    },
    {
      q: 'Is there an iOS version available?',
      a: 'Not yet. Chordly is currently focused on Android, Wear OS, and the web, with Desktop and Android TV in active development. Native iOS remains a longer-term roadmap item—and in the meantime, you can stream via the Chordly Web Player.',
    },
    {
      q: 'How do synced lyrics work?',
      a: 'Chordly queries 12 synced lyrics providers—including LRCLIB, Musixmatch, Genius, KuGou, and community LRC sources—simultaneously. It displays word- and line-synced lyrics with automatic romanization (Romaji, Pinyin, Hangul) and bilingual translations for multilingual tracks.',
    },
    {
      q: 'How do I update Chordly?',
      a: 'You can download newer APK releases directly from the GitHub Releases page. In-app update notifications alert you whenever a new version is published.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky heading) */}
          <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FF2D55] uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              Frequently asked questions.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Everything you need to know about Chordly, its platforms, and how it works.
            </p>

            <div className="pt-4 hidden lg:block">
              <p className="text-xs text-zinc-500">
                Have a different question or need support? Open an issue on GitHub to connect with the developer.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column (Accessible Accordion) */}
          <StaggerGroup stagger={0.045} className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <StaggerItem key={idx}>
                  <div
                    className={`rounded-2xl transition-colors duration-300 border ${
                      isOpen 
                        ? 'bg-white/[0.06] border-[#FF2D55]/40 shadow-[0_4px_20px_rgba(255,45,85,0.12)]' 
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D55] rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <span className="text-sm sm:text-lg font-semibold text-white leading-snug">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#FF2D55] text-white rotate-180' : 'bg-white/10 text-zinc-300'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth height container */}
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`grid transition-all duration-300 ease-in-out px-4 sm:px-6 ${
                      isOpen ? 'grid-rows-[1fr] pb-4 sm:pb-6 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
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
