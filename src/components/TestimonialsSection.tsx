import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { ScrollReveal } from './MotionPrimitives';
import {
  TestimonialCoverflow,
  type Testimonial,
} from './ui/testimonial-coverflow';

const CHORDLY_TESTIMONIALS: Testimonial[] = [
  {
    id: 'dac-audiophile',
    quote:
      'Bit-Perfect USB DAC mode stopped Android from resampling my lossless tracks to 48 kHz. My external dongle locks straight onto native 24-bit / 192 kHz sample rates.',
    name: 'Rafi Pratama',
    role: 'USB DAC Listener · Android 14',
    initials: 'RP',
    company: '24-bit / 192 kHz',
  },
  {
    id: 'synced-lyrics',
    quote:
      'Twelve lyric providers plus instant Romaji and bilingual toggles beneath every line turned late-night listening into effortless sing-alongs—even obscure B-sides sync cleanly.',
    name: 'Hana Sato',
    role: 'J-Pop & Indie Listener · Android',
    initials: 'HS',
    company: '12 Lyric Sources',
  },
  {
    id: 'wear-os',
    quote:
      'At roughly 4.5 MB on my watch, Chordly lets me leave my phone in my locker and skip tracks or stream straight from the wrist speaker during runs.',
    name: 'Daniel Lindqvist',
    role: 'Runner & Commuter · Wear OS 4',
    initials: 'DL',
    company: 'Wear Companion',
  },
  {
    id: 'web-bridge',
    quote:
      'The extension bridge gives me my full YouTube Music library, mood radios, and live Discord Rich Presence on desktop without bloated wrappers or playback drops.',
    name: 'Nadia Wijaya',
    role: 'Software Engineer · Web Player',
    initials: 'NW',
    company: 'Extension Bridge',
  },
  {
    id: 'open-source',
    quote:
      'We replaced three separate music and lyric utilities with one GPL-3.0 app. Zero trackers, Haze frosted-glass UI driven by album art, and Automix transitions that hold a beat.',
    name: 'Mateo Alvarez',
    role: 'Open-Source Contributor · Android',
    initials: 'MA',
    company: 'GPL-3.0',
  },
];

export const TestimonialsSection: React.FC = () => {

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 bg-[#070708] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-[4vw] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Heading & Active Setup Context */}
          <ScrollReveal className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Community · Listener Stories</span>
            </div>

            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] text-white tracking-[-0.03em] leading-[1.06] text-balance">
              Heard across phones, <span className="italic">watches,</span> and DACs.
            </h2>

            <p className="text-[17px] leading-[1.6] text-white/55">
              Real setups from people using Chordly every day for bit-perfect USB audio, multilingual synced lyrics, and lightweight Wear OS playback.
            </p>
          </ScrollReveal>

          {/* Right Column: Interactive 3D Testimonial Coverflow */}
          <ScrollReveal delay={0.06} className="lg:col-span-7">
            <TestimonialCoverflow
              items={CHORDLY_TESTIMONIALS}
              title="Community Feedback"
              defaultIndex={1}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
