import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <article className="border-b border-white/[0.08] bg-[#070708]">
      <div className="mx-auto max-w-[760px] w-full px-6 pt-32 sm:pt-36 pb-20">
        <div className="mb-8">
          <a
            href="/"
            onClick={(e) => onNavigate?.('/', e)}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span>Back to Chordly</span>
          </a>
        </div>

        <h1 className="font-serif font-normal text-[38px] sm:text-[48px] leading-[1.06] tracking-[-0.03em] text-white text-balance">
          Terms of Service
        </h1>
        <p className="mt-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-white/45">
          Effective Date: November 25, 2026
        </p>

        <div className="mt-8 text-[16px] leading-[1.7] text-white/80">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you and the maintainer of Chordly (&ldquo;the Maintainer&rdquo;, &ldquo;Callmerev&rdquo;) governing your access to and use of the Chordly applications for Android and Wear OS, the Chordly Web Player (
            <a
              href="https://web-player.chordly.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2d55] hover:underline underline-offset-4"
            >
              web-player.chordly.my.id
            </a>
            ), companion relay services, and this website (collectively, &ldquo;Chordly&rdquo;). By installing, accessing, or operating any component of Chordly, you agree to be bound by these Terms. If you do not accept these Terms, discontinue use immediately.
          </p>
        </div>

        <div className="mt-12 space-y-11 text-[15px] sm:text-[16px] leading-[1.7] text-white/70">
          <section id="scope" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#scope"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>1. Scope of Agreement &amp; Open-Source License</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly is distributed free of charge as open-source audio playback software. It operates as an independent client interface capable of streaming publicly accessible catalogs from YouTube Music, playing locally stored audio files (including lossless FLAC and MP3), and connecting to user-defined media sources. Chordly does not store, upload, publish, sell, or claim ownership over any third-party recordings, music videos, cover artwork, or lyric texts.
            </p>
            <p>
              The underlying source code is made available under the{' '}
              <a
                href="https://github.com/Callmerev95/Chordly/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                GNU General Public License v3.0 (GPL-3.0)
              </a>
              . Where any provision in these Terms addresses compiled distributions, companion web interfaces, or hosted relay endpoints, nothing herein restricts the freedoms granted to you by the GPL-3.0 with respect to the source code.
            </p>
          </section>

          <section id="independence" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#independence"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>2. Brand Independence &amp; Non-Affiliation</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly operates independently and is{' '}
              <strong className="font-semibold text-white">
                not affiliated with, endorsed by, sponsored by, or officially partnered with
              </strong>{' '}
              Google LLC, YouTube, YouTube Music, Spotify, Discord, Apple Inc., Last.fm, Libre.fm, ListenBrainz, Musixmatch, Genius, LRCLIB, KuGou, JioSaavn, or any other external service referenced within the software. All trademarks, service marks, logos, and product identifiers remain the exclusive property of their respective owners and appear solely to indicate interoperability.
            </p>
          </section>

          <section id="third-party" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#third-party"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>3. Third-Party Platforms &amp; Account Compliance</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Certain features within Chordly communicate directly with external platforms (&ldquo;Third-Party Services&rdquo;), including streaming catalogs, scrobbling networks, social presence integrations, and twelve synchronized lyric databases. By enabling those connections, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                Your interactions with any Third-Party Service remain governed strictly by that provider&apos;s terms and policies, including{' '}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2d55] hover:underline underline-offset-4"
                >
                  YouTube&apos;s Terms of Service
                </a>
                , and compliance rests solely with you.
              </li>
              <li>
                Because Chordly is an unofficial third-party client, external providers may restrict, suspend, or terminate accounts accessed through unofficial clients. The Maintainer has no control over provider enforcement and assumes no responsibility for account actions.
              </li>
              <li>
                Third-Party Services and lyric APIs may modify interfaces, impose rate limits, or discontinue compatibility at any time without prior notice, which may impair dependent features in Chordly.
              </li>
              <li>
                The Maintainer makes no representations regarding the uptime, legality, accuracy, or content practices of any Third-Party Service.
              </li>
            </ul>
          </section>

          <section id="copyright" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#copyright"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>4. Intellectual Property, Offline Caching &amp; Copyright</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                All musical compositions, sound recordings, videos, artwork, and synchronized or translated lyrics accessed through Chordly remain the intellectual property of their respective artists, labels, publishers, and rights holders.
              </li>
              <li>
                Offline caching and local saving features are intended exclusively for lawful, personal, non-commercial listening. You bear sole legal responsibility for verifying that saving or playing media complies with local copyright statutes and the originating provider&apos;s terms.
              </li>
              <li>
                You may not use Chordly to sell, redistribute, rebroadcast, publicly perform, or commercially exploit copyrighted material.
              </li>
            </ul>
            <p>
              Because Chordly neither hosts nor indexes media files on its own infrastructure, takedown requests or copyright claims must be directed to the originating hosting platform.
            </p>
          </section>

          <section id="extensions" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#extensions"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>5. User-Configured Sources &amp; Browser Extensions</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly allows users to configure external lossless audio endpoints alongside the browser extension bridge supporting the{' '}
              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Chordly Web Player
              </a>
              . Aside from official open-source repositories maintained under Chordly, the Maintainer does not build, operate, inspect, certify, or endorse third-party source servers or community extensions.
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                Connecting any external source or third-party module is performed solely at your own discretion and risk.
              </li>
              <li>
                You must only connect pluggable endpoints to access media you are lawfully authorized to stream. Operators of external servers remain independently accountable for content licensing, legal compliance, and data handling.
              </li>
              <li>
                Developers building compatible endpoints or extensions must not distribute malicious payloads, harvest user data deceptively, or infringe third-party intellectual property rights.
              </li>
            </ul>
          </section>

          <section id="services" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>6. Companion Services &amp; Acceptable Use</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Complimentary companion infrastructure operated for Chordly—including Listen Together synchronized playback rooms, the Web Player domain, and this informational site—is offered without service-level guarantees and may be modified, throttled, or suspended at any time. While accessing these services, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>probe, disrupt, flood, or attempt to circumvent technical safeguards or rate limits;</li>
              <li>use Listen Together sessions to harass, threaten, or impersonate others, or display unlawful or abusive identifiers;</li>
              <li>automate requests or scrape companion endpoints outside ordinary client operation;</li>
              <li>engage in any conduct prohibited by applicable law.</li>
            </ul>
            <p>
              The Maintainer reserves the right to block abusive traffic without notice, and Listen Together room creators retain authority to remove participants from active rooms.
            </p>
          </section>

          <section id="backups" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#backups"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>7. Local Storage &amp; Data Backups</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Listening metrics (Replay), 7-band equalizer configurations, lyric offset values, playlists, and preferences reside locally on your device or within export files you generate manually. While reasonable care is taken to maintain compatibility across releases, the Maintainer cannot warrant uninterrupted retention or flawless restoration of local state. You are advised to maintain independent exported copies of data you wish to preserve. Detailed disclosures appear in our{' '}
              <a
                href="/privacy#backups"
                onClick={(e) => onNavigate?.('/privacy#backups', e)}
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section id="conduct" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#conduct"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>8. Lawful Conduct &amp; Authorized Distribution</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>You agree to use Chordly strictly in accordance with all laws applicable in your jurisdiction.</li>
              <li>
                Official binaries should be obtained exclusively from{' '}
                <a
                  href="https://github.com/Callmerev95/Chordly-release/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2d55] hover:underline underline-offset-4"
                >
                  official GitHub releases
                </a>
                , the{' '}
                <a
                  href="https://github.com/Callmerev95/Chordly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2d55] hover:underline underline-offset-4"
                >
                  official repository
                </a>
                , or this domain. Third-party repacks or altered builds carry security risks for which the Maintainer bears no responsibility.
              </li>
              <li>
                Anyone redistributing modified builds must fulfill all obligations under the GPL-3.0 license and prominently state that the distribution is an unofficial derivative rather than an official Chordly release.
              </li>
            </ul>
          </section>

          <section id="warranty" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#warranty"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>9. Disclaimer of Warranties</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              To the maximum extent permitted by law, Chordly is supplied free of charge on an{' '}
              <strong className="font-semibold text-white">
                &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind
              </strong>
              , whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, as well as any assurance of continuous, secure, or error-free operation. All use is undertaken at your own risk.
            </p>
          </section>

          <section id="liability" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#liability"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>10. Limitation of Liability</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              To the fullest extent allowed under applicable law, neither the Maintainer nor any project contributor shall be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, third-party accounts, media access, revenue, or goodwill arising out of or relating to your use of or inability to use Chordly, external sources, or Third-Party Services, even if advised of the possibility of such losses. Because Chordly is provided at no cost, total cumulative liability for any claim shall not exceed zero, or the minimum amount mandated by non-waivable law.
            </p>
          </section>

          <section id="amendments" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#amendments"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>11. Amendments to These Terms</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              The Maintainer may revise these Terms periodically to reflect new capabilities, legal requirements, or architectural changes. The effective date listed at the top identifies the prevailing version, and changes are auditable alongside this site&apos;s public source code. Continued use of Chordly following publication of revised Terms constitutes acceptance of those revisions.
            </p>
          </section>

          <section id="governing-law" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#governing-law"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>12. Governing Law &amp; Consumer Rights</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              These Terms shall be construed and governed in accordance with the laws of the Republic of Indonesia, excluding conflict-of-law principles. Nothing in these Terms waives or limits mandatory consumer protection rights afforded to you by the statutes of your jurisdiction of residence.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>13. Inquiries &amp; Legal Notices</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Formal questions, bug disclosures, or notices concerning these Terms may be submitted via{' '}
              <a
                href="https://github.com/Callmerev95/Chordly/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                GitHub Issues
              </a>
              ,{' '}
              <a
                href="https://github.com/Callmerev95/Chordly/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                GitHub Discussions
              </a>
              , or through the Maintainer&apos;s website at{' '}
              <a
                href="https://callmerev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                callmerev.my.id
              </a>
              . Information regarding data handling is set forth separately in the{' '}
              <a
                href="/privacy"
                onClick={(e) => onNavigate?.('/privacy', e)}
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-6 text-[13px] text-white/45">
          <a
            href="/"
            onClick={(e) => onNavigate?.('/', e)}
            className="transition-colors hover:text-white"
          >
            Home
          </a>
          <a
            href="/privacy"
            onClick={(e) => onNavigate?.('/privacy', e)}
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            onClick={(e) => onNavigate?.('/terms', e)}
            className="transition-colors text-white/80 hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="https://github.com/Callmerev95/Chordly/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GPL-3.0
          </a>
          <a
            href="https://github.com/Callmerev95/Chordly/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub Issues
          </a>
          <a
            href="https://web-player.chordly.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Web Player
          </a>
        </div>
      </div>
    </article>
  );
};
