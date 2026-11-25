import React from 'react';
import { ArrowRight, Github, MessageSquareQuote } from 'lucide-react';
import { ScrollReveal } from './MotionPrimitives';
import { TestimonialCoverflow } from './ui/testimonial-coverflow';
import {
  TESTIMONIALS,
  TESTIMONIAL_FORM_URL,
  TESTIMONIAL_ISSUE_URL,
} from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const formUrl = TESTIMONIAL_FORM_URL.trim();
  const primaryUrl = formUrl || TESTIMONIAL_ISSUE_URL;
  const primaryLabel = formUrl ? 'Share your story' : 'Share on GitHub';
  const hasTestimonials = TESTIMONIALS.length > 0;

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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>{primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              {formUrl && (
                <a
                  href={TESTIMONIAL_ISSUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Prefer GitHub?</span>
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* Right Column: Published coverflow, or an honest intake empty-state */}
          <ScrollReveal delay={0.06} className="lg:col-span-7">
            {hasTestimonials ? (
              <TestimonialCoverflow
                items={TESTIMONIALS}
                title="Community Feedback"
                defaultIndex={0}
              />
            ) : (
              <div className="rounded-[28px] v29-glass-frame p-8 sm:p-12 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-white/[0.06] border border-white/10 text-[#ff2d55]">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-serif italic text-[26px] text-white">
                  No listener stories yet.
                </h3>
                <p className="mt-3 mx-auto max-w-[420px] text-[15px] leading-[1.6] text-white/55">
                  Be the first. Share how you use Chordly and it may be featured here with attribution.
                </p>
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-7 inline-flex"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
