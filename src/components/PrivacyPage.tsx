import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate?: (to: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
          Privacy Policy
        </h1>
        <p className="mt-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-white/45">
          Effective Date: November 25, 2026
        </p>

        <div className="mt-8 space-y-4 text-[16px] leading-[1.7] text-white/80">
          <p>
            This Privacy Policy explains how Chordly handles information across its Android application, Wear OS companion, Web Player (
            <a
              href="https://web-player.chordly.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2d55] hover:underline underline-offset-4"
            >
              web-player.chordly.my.id
            </a>
            ), and this website. Developed and maintained independently by{' '}
            <a
              href="https://callmerev.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2d55] hover:underline underline-offset-4"
            >
              Callmerev
            </a>
            , Chordly is published as inspectable open-source software at{' '}
            <a
              href="https://github.com/Callmerev95/Chordly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2d55] hover:underline underline-offset-4"
            >
              github.com/Callmerev95/Chordly
            </a>
            .
          </p>
          <p>
            Chordly operates without user registration accounts, commercial advertisements, behavioral analytics, or automated crash telemetry. Playback history, custom equalizer curves, and configuration state remain stored locally on your device, while network communications occur directly between your device and the media or lyric services you choose to engage.
          </p>
        </div>

        <div className="mt-12 space-y-11 text-[15px] sm:text-[16px] leading-[1.7] text-white/70">
          <section id="independence" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#independence"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>1. Independence &amp; External Privacy Policies</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly maintains{' '}
              <strong className="font-semibold text-white">
                no corporate affiliation, sponsorship, or partnership
              </strong>{' '}
              with Google LLC, YouTube, YouTube Music, Spotify, Discord, Apple Inc., Last.fm, Libre.fm, ListenBrainz, Musixmatch, Genius, LRCLIB, KuGou, JioSaavn, or any external platform supported by the client. All product names and trademarks belong to their respective proprietors and appear strictly to describe compatibility. Whenever Chordly transmits requests directly to a third-party provider at your direction, that provider&apos;s privacy notice governs the processing of those requests.
            </p>
          </section>

          <section id="storage" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#storage"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>2. On-Device Data Storage</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              The application retains operational data exclusively within private application storage on your mobile phone or watch:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                <strong className="font-semibold text-white">Playback Insights (Replay):</strong> aggregated counts of played tracks, artists, albums, and listening duration calculated locally to populate your personal Replay view.
              </li>
              <li>
                <strong className="font-semibold text-white">Library &amp; Audio Configuration:</strong> search queries, custom playlists, active playback queues, 7-band equalizer curves, USB DAC output preferences, and lyric synchronization offsets.
              </li>
              <li>
                <strong className="font-semibold text-white">Offline Media Files:</strong> tracks saved for offline listening are written to your device&apos;s{' '}
                <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/90">
                  Music/Chordly
                </code>{' '}
                directory together with embedded metadata tags and synchronized lyrics.
              </li>
              <li>
                <strong className="font-semibold text-white">Temporary Stream &amp; Artwork Cache:</strong> buffered audio segments (capped at your configured storage limit) and album cover images.
              </li>
              <li>
                <strong className="font-semibold text-white">Locally Isolated Credentials:</strong> session cookies and tokens for services you authorize, handled as specified in{' '}
                <a href="#credentials" className="text-[#ff2d55] hover:underline underline-offset-4">
                  Section 5
                </a>
                .
              </li>
              <li>
                <strong className="font-semibold text-white">Ephemeral Session Identifiers:</strong> randomly generated device tokens created solely to coordinate shared Listen Together rooms, carrying no hardware serials or personal identifiers.
              </li>
            </ul>
            <p>
              None of these local records are uploaded to Callmerev or any central Chordly analytics repository. Data leaves your device only through direct integrations described below or when manually exported by you under{' '}
              <a href="#backups" className="text-[#ff2d55] hover:underline underline-offset-4">
                Section 6
              </a>
              .
            </p>
          </section>

          <section id="infrastructure" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#infrastructure"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>3. Companion Infrastructure &amp; Minimal Telemetry</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Companion endpoints supporting Chordly are intentionally minimal and never collect your legal name, email address, listening history, YouTube cookies, or login secrets. Limited operational data is processed only when you initiate the features below:
            </p>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Listen Together Synchronization
            </h3>
            <p>
              Creating or joining a Listen Together room via a 6-character code establishes a real-time relay connection transmitting only:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>an ephemeral or pseudonymous participant identifier;</li>
              <li>the display label you enter for that session;</li>
              <li>the shared track queue, play/pause commands, and playback position necessary to maintain synchronized listening across connected devices.</li>
            </ul>
            <p>
              Other participants in the same room can view your chosen display label and active queue state. Session payloads reside strictly in transient server memory for the duration of the room and are discarded upon closure.
            </p>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Web Player Extension Bridge
            </h3>
            <p>
              When accessing{' '}
              <a
                href="https://web-player.chordly.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                web-player.chordly.my.id
              </a>
              , your browser communicates locally with the companion extension bridge to expose your playback controls, mood mixes, and synchronized lyrics without routing your YouTube account credentials through any intermediary server operated by Chordly.
            </p>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Release Update Checks (GitHub)
            </h3>
            <p>
              Optional release verification queries public release manifests hosted on{' '}
              <a
                href="https://github.com/Callmerev95/Chordly-release/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                GitHub Releases
              </a>
              . Those network requests occur directly between your device and GitHub pursuant to{' '}
              <a
                href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                GitHub&apos;s Privacy Statement
              </a>
              .
            </p>
          </section>

          <section id="integrations" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#integrations"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>4. Direct Third-Party Integrations</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              External queries originate directly from your device to the relevant provider without passing through a Chordly proxy. Each provider receives standard network metadata (such as your IP address) together with the parameters required to fulfill the request under its own privacy practices.
            </p>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Core Streaming (YouTube &amp; YouTube Music)
            </h3>
            <p>
              Catalog browsing, search queries, and media streaming interact directly with YouTube infrastructure. If you authenticate with a YouTube Music account, requests utilize your session so personal playlists, recommendations, and playback history reflect your account in accordance with{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Default Content Enrichment
            </h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                <strong className="font-semibold text-white">Synchronized Lyrics (12 Providers):</strong> when viewing lyrics, track metadata (title, artist, album, and duration) is queried against enabled providers—such as LRCLIB, Musixmatch, Genius, KuGou, BetterLyrics, LyricsPlus, and YouTube—until a timed match is returned. Individual providers may be disabled in Settings.
              </li>
              <li>
                <strong className="font-semibold text-white">Catalog Artwork &amp; Metadata:</strong> track titles and artist names may be queried against public music catalog endpoints (including Apple Music / iTunes) to supply album artwork, preview streams, and romanization metadata.
              </li>
            </ul>

            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Optional User-Enabled Integrations
            </h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                <strong className="font-semibold text-white">Discord Rich Presence:</strong> when authorized by you, Chordly broadcasts your active track title, artist, cover art, and elapsed timestamp to your Discord profile status.
              </li>
              <li>
                <strong className="font-semibold text-white">Scrobbling Services:</strong> when connected to Last.fm, Libre.fm, or ListenBrainz, played track titles and playback timestamps are reported to your chosen scrobbler account.
              </li>
              <li>
                <strong className="font-semibold text-white">Playlist Import &amp; Matching:</strong> importing external playlists reads track names solely to locate matching entries on YouTube Music.
              </li>
              <li>
                <strong className="font-semibold text-white">Inline Lyrics Translation:</strong> when translation is toggled beneath active lyrics, lyric text is dispatched to the configured translation provider only for that track.
              </li>
              <li>
                <strong className="font-semibold text-white">Google Drive Backup (optional):</strong> only if you connect a Google account, a single backup archive is written to a hidden app-data folder in your own Drive, as described in{' '}
                <a href="#backups" className="text-[#ff2d55] hover:underline underline-offset-4">
                  Section 6
                </a>
                .
              </li>
              <li>
                <strong className="font-semibold text-white">Google Cast &amp; Wear OS Companion:</strong> casting delegates media retrieval directly to your Cast receiver, while the ~4.5 MB Wear OS companion synchronizes playback control or direct wrist-speaker streaming alongside your paired phone.
              </li>
            </ul>
          </section>

          <section id="credentials" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#credentials"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>5. Credential Handling &amp; Token Isolation</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly never prompts for, logs, or collects plaintext passwords for external accounts. Authentication occurs through official provider flows, after which resulting session artifacts remain isolated on your hardware:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>
                YouTube Music session cookies, Discord tokens, and custom endpoint credentials are persisted within Android&apos;s encrypted storage protected by your device Keystore.
              </li>
              <li>
                Scrobbling session keys and optional API settings are confined to the application&apos;s private sandboxed storage.
              </li>
            </ul>
            <p>
              Stored tokens are transmitted solely to their issuing service and never to Chordly. Signing out inside application Settings purges the corresponding credentials from your device.
            </p>
          </section>

          <section id="backups" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#backups"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>6. Manual Exports &amp; System Backups</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Listening statistics, playlists, equalizer presets, and interface preferences are maintained locally. When you perform a manual data export, Chordly writes a portable archive to your chosen directory while intentionally omitting authentication cookies, tokens, and API keys.
            </p>
            <p>
              Where Android OS device backup is enabled in your system settings, Android may preserve general app preferences under your Google account settings, excluding encrypted credential stores and cached tokens.
            </p>
            <h3 className="font-sans font-semibold text-[17px] text-white pt-2">
              Optional Google Drive Backup
            </h3>
            <p>
              Enabling cloud backup is entirely optional. When you connect a Google account in Settings, Chordly requests the single scope{' '}
              <code className="font-mono text-[13px] text-white/80">https://www.googleapis.com/auth/drive.appdata</code>
              . That scope grants access only to a hidden application-data folder inside your own Drive; Chordly cannot read, list, modify, or delete any other file stored in your Drive.
            </p>
            <p>
              The archive itself is a compressed JSON file containing playlists, equalizer presets, interface preferences, and listening statistics. It never contains authentication cookies, tokens, or API keys. The file is uploaded directly from your device to that app-data folder and downloaded back only when you start a restore. Your Google data is not routed through, and is not stored on, any server operated by the Maintainer.
            </p>
            <p>
              You can revoke access at any time by disconnecting the account in Settings, deleting the backup from within the app, or removing Chordly under{' '}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Google Account permissions
              </a>
              . Removing access does not erase a file already saved in your Drive; use the in-app delete action or Google Drive&apos;s own controls for that.
            </p>
            <p>
              Chordly&apos;s use and transfer of information received from Google APIs adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section id="sources" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#sources"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>7. Third-Party Lossless Sources &amp; Bridges</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly enables you to attach pluggable lossless audio endpoints by URL in addition to the Web Player extension bridge. Outside of official Chordly open-source repositories, the Maintainer does not operate, audit, or endorse third-party source servers. External servers you configure will receive search terms, requested track IDs, selected bitrate or quality parameters, your IP address, and client version headers subject to their own privacy notices.
            </p>
            <p>
              Configured source URLs and access parameters are encrypted locally on your device and cannot access unrelated files or applications. Only connect external servers operated by parties you trust.
            </p>
          </section>

          <section id="permissions" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#permissions"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>8. Device &amp; System Permissions</span>
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
                <strong className="font-semibold text-white">Network &amp; Internet Access:</strong> required to stream audio, retrieve synced lyrics, and apply separate bitrate policies across Wi-Fi and cellular networks.
              </li>
              <li>
                <strong className="font-semibold text-white">Notifications, Foreground Service &amp; Wake Lock:</strong> sustains uninterrupted background audio playback, lock-screen controls, and offline download notifications.
              </li>
              <li>
                <strong className="font-semibold text-white">Audio &amp; Media Storage:</strong> grants read/write access needed to play local FLAC/MP3 libraries and store offline tracks on older and current Android releases.
              </li>
              <li>
                <strong className="font-semibold text-white">Bluetooth / Nearby Devices:</strong> displays connected wireless headphones and speakers inside the audio output selector.
              </li>
              <li>
                <strong className="font-semibold text-white">Audio Routing &amp; USB Host Access:</strong> enables direct 24-bit / 192 kHz Bit-Perfect output to external USB DAC hardware while bypassing system resampling.
              </li>
              <li>
                <strong className="font-semibold text-white">Package Installation &amp; Haptics:</strong> facilitates installation of official release APKs you initiate manually and provides subtle tactile feedback on playback controls.
              </li>
            </ul>
          </section>

          <section id="website" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#website"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>9. Website Privacy (chordly.my.id)</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              This informational site (<code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/90">chordly.my.id</code>) deploys no advertising pixels, cross-site tracking cookies, or third-party analytics scripts. Standard HTTP request headers (such as IP address and browser user-agent) are processed transiently by web hosting infrastructure strictly to deliver static pages and protect service availability. Download links route directly to GitHub.
            </p>
          </section>

          <section id="controls" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#controls"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>10. User Controls &amp; Data Deletion</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#ff2d55]/75">
              <li>Every optional integration itemized in Section 4 can be deactivated or disconnected from within application Settings at any time.</li>
              <li>Clearing application storage through Android system settings—or uninstalling Chordly—permanently erases cached streams, Replay logs, preferences, and local credentials (leaving user-saved audio files in your public Music folder intact).</li>
              <li>Information held directly by YouTube, Spotify, Discord, Last.fm, or external providers may be reviewed or deleted through your account controls with each respective provider.</li>
            </ul>
          </section>

          <section id="children" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#children"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>11. Minimum Age &amp; Children&apos;s Privacy</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Chordly is not directed toward children under 13 years of age and does not knowingly collect personal information from minors. External services you elect to connect through Chordly enforce their own age eligibility thresholds independently.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28 space-y-3.5">
            <h2 className="font-serif font-normal text-[24px] sm:text-[26px] text-white tracking-[-0.02em] leading-[1.2]">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 hover:text-[#ff2d55] transition-colors"
              >
                <span>12. Policy Updates &amp; Contact Channels</span>
                <span
                  className="font-mono text-[14px] text-[#ff2d55] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  #
                </span>
              </a>
            </h2>
            <p>
              Should Chordly&apos;s data practices evolve alongside future releases, this Privacy Policy will be revised and the effective date above updated accordingly. Complete revision history remains publicly inspectable in the website&apos;s repository.
            </p>
            <p>
              Privacy inquiries or disclosure requests may be directed to{' '}
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
              , or the Maintainer at{' '}
              <a
                href="https://callmerev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                callmerev.my.id
              </a>
              . Please also review the{' '}
              <a
                href="/terms"
                onClick={(e) => onNavigate?.('/terms', e)}
                className="text-[#ff2d55] hover:underline underline-offset-4"
              >
                Terms of Service
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
            className="transition-colors text-white/80 hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            onClick={(e) => onNavigate?.('/terms', e)}
            className="transition-colors hover:text-white"
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
