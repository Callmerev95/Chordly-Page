

<img width="2172" height="724" alt="Chordly_logo" src="https://github.com/user-attachments/assets/53d6b21a-f5e0-40ac-ab7e-cd7807c1943c" />


<br/>
<br/>

<Div align=center>
<br/>

[![Version](https://img.shields.io/github/v/release/Callmerev95/Chordly-release?style=for-the-badge&color=FF2D55&label=version)](https://github.com/Callmerev95/Chordly-release/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Callmerev95/Chordly-release/total?style=for-the-badge&color=FF6B35&label=downloads)](https://github.com/Callmerev95/Chordly-release/releases)
[![Android](https://img.shields.io/badge/Android-Stable-3DDC84?style=for-the-badge&logo=android&logoColor=white)](#-platform-status)
[![Stars](https://img.shields.io/github/stars/Callmerev95/Chordly-Page?style=for-the-badge&color=FFD60A&label=stars)](https://github.com/Callmerev95/Chordly-Page/stargazers)
[![License](https://img.shields.io/github/license/Callmerev95/Chordly-Page?style=for-the-badge&color=7B5CFF&label=license)](LICENSE)

<br/>
</Div>


## Feel every lyric. Enjoy every note.

Chordly is an independent YouTube Music player for Android, Wear OS, and the web. This repository contains the official marketing and download site at https://chordly.my.id — not the player application itself.

The site presents the product, its features, platform support, screenshots, and download links. The player, Android app, and browser extension live in the main Chordly repository.


## About this site

The landing page is a single-page React application built with Vite and Tailwind CSS. It includes:

- A hero section with the product story and primary calls to action.
- A platform overview for Android, Wear OS, web, desktop, and Android TV.
- A feature grid covering playback, connectivity, experience, and controls.
- Deep dives into synced lyrics, Bit-Perfect audio, and the web player.
- Device mockups using real application screenshots.
- Install guidance, open-source information, and a product FAQ.
- Links to the web player, GitHub repository, releases, and issue tracker.

## Chordly at a glance

- 24 features across 4 categories.
- 12 synced lyrics providers, including LRCLIB, Musixmatch, Genius, and KuGou.
- Word- and syllable-synced lyrics with romanization and bilingual translations.
- Android stable release: v1.9.4.
- Wear OS companion app for remote control and watch playback.
- Web player available in modern browsers with the Chordly extension.
- Desktop and Android TV clients are in development.
- Bit-Perfect USB DAC output up to 24-bit / 192 kHz.
- 7-band equalizer, FLAC fallback, Automix, and Listen Together.
- Dynamic album-color theming and animated album canvases.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- Lucide React
- LRC Kit

## Getting started

Requirements: Node.js 20 or newer and npm 10 or newer.

```bash
git clone https://github.com/Callmerev95/Chordly-Page.git
cd Chordly-Page
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Type-check the project with `tsc --noEmit`. |
| `npm run test` | Run the audio engine and feature catalog tests. |
| `npm run clean` | Remove the production build output. |

Tests use Node's built-in test runner through `tsx`. They cover the audio engine helpers and the feature catalog data.

## Project structure

```text
src/
  components/   Landing page sections and UI components
  utils/        Feature data, audio helpers, and lyrics service
  App.tsx       Page composition
  main.tsx      React entry point
  index.css     Tailwind theme and global styles
public/
  assets/       Application screenshots used by the site
index.html      Document metadata and font loading
vite.config.ts  Vite and Tailwind configuration
```

## Deployment

The production build is a static site served at https://chordly.my.id. Run `npm run build` and deploy the `dist/` directory to any static host, such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

No server runtime, database, or cloud secret is required for this landing page.

## Related links

- Web player: https://chordly.callmerev.my.id
- Main application: https://github.com/Callmerev95/Chordly
- Android releases: https://github.com/Callmerev95/Chordly-release/releases
- Issue tracker: https://github.com/Callmerev95/Chordly/issues
- Author: https://github.com/Callmerev95

## License

Chordly is free software licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for the license text. The main application and its source code live in the [Chordly repository](https://github.com/Callmerev95/Chordly).

## Disclaimer

Chordly is an independent open-source project and is not affiliated with, sponsored by, or endorsed by Google LLC, YouTube, Apple Inc., or Spotify. YouTube Music and related marks belong to their respective owners.
