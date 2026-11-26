import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AUDIO_EASE, ScrollReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

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
    <section id="faq" className="scroll-mt-20 py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <ScrollReveal x={-16} y={18} className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <HelpCircle className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Questions</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Frequently asked <span className="italic">questions.</span>
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Everything you need to know about Chordly, its platforms, and how it works.
            </p>

            <div className="pt-2 hidden lg:block">
              <p className="text-[13px] text-white/45">
                Have a different question or need support?{' '}
                <a
                  href="https://github.com/Callmerev95/Chordly/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2d55] hover:underline underline-offset-4"
                >
                  Open an issue on GitHub
                </a>
                .
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column (Accessible Accordion) */}
          <StaggerGroup stagger={0.055} amount={0.06} className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <StaggerItem key={idx} y={14}>
                  <div
                    className={`rounded-[20px] border transition-colors duration-150 ${
                      isOpen
                        ? 'bg-white/[0.04] border-[#ff2d55]/50'
                        : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d55] rounded-[20px]"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-question-${idx}`}
                    >
                      <span className="text-[15px] sm:text-[17px] font-medium text-white leading-snug">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.22,
                          ease: AUDIO_EASE,
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                          isOpen
                            ? 'bg-white text-[#070708]'
                            : 'bg-white/[0.06] text-white/70'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${idx}`}
                          role="region"
                          aria-labelledby={`faq-question-${idx}`}
                          initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.24,
                            ease: AUDIO_EASE,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6">
                            <p className="text-[14px] sm:text-[15px] text-white/55 leading-[1.6]">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
