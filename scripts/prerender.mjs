import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html not found. Run `vite build` first.');
}

const template = fs.readFileSync(templatePath, 'utf8');
const noop = () => {};

function stubBrowser(pathname) {
  const location = {
    pathname,
    hash: '',
    search: '',
    origin: 'https://www.chordly.my.id',
    href: `https://www.chordly.my.id${pathname}`,
  };

  const classList = { add: noop, remove: noop, toggle: noop, contains: () => false };

  globalThis.window = {
    location,
    history: { pushState: noop, replaceState: noop, back: noop, length: 2 },
    addEventListener: noop,
    removeEventListener: noop,
    scrollTo: noop,
    scrollY: 0,
    innerWidth: 1280,
    innerHeight: 800,
    devicePixelRatio: 1,
    requestAnimationFrame: noop,
    cancelAnimationFrame: noop,
    matchMedia: () => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: noop,
      removeEventListener: noop,
      addListener: noop,
      removeListener: noop,
    }),
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
  };

  globalThis.document = {
    title: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: noop,
    removeEventListener: noop,
    documentElement: { style: {}, classList },
    body: { style: {}, classList },
  };

  define('navigator', { userAgent: 'node', language: 'en-US', languages: ['en-US'] });
  define('requestAnimationFrame', noop);
  define('cancelAnimationFrame', noop);
  define('matchMedia', globalThis.window.matchMedia);
  define('localStorage', { getItem: () => null, setItem: noop, removeItem: noop, clear: noop });
  define('sessionStorage', { getItem: () => null, setItem: noop, removeItem: noop, clear: noop });
  define('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  define('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
  define('CSS', { supports: () => false });
}

function define(name, value) {
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
}

const ORIGIN = 'https://www.chordly.my.id';

const routes = [
  {
    path: '/',
    outFile: 'index.html',
    title: 'Chordly — Independent YouTube Music Player with Synced Lyrics',
    description:
      'Chordly is an independent, open-source YouTube Music player with 12 synced lyrics providers, Bit-Perfect USB DAC audio, and apps for Android, Wear OS, and the web.',
    canonical: `${ORIGIN}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  {
    path: '/privacy',
    outFile: path.join('privacy', 'index.html'),
    title: 'Privacy Policy — Chordly',
    description:
      'How Chordly handles information across its Android app, Wear OS companion, web player, and website, including optional Google Drive backup.',
    canonical: `${ORIGIN}/privacy`,
    robots: 'index, follow',
  },
  {
    path: '/terms',
    outFile: path.join('terms', 'index.html'),
    title: 'Terms of Service — Chordly',
    description:
      'Terms of Service for Chordly, an independent open-source YouTube Music player for Android, Wear OS, and the web.',
    canonical: `${ORIGIN}/terms`,
    robots: 'index, follow',
  },
  {
    path: '/404',
    outFile: '404.html',
    title: '404 — Page Not Found · Chordly',
    description: 'The page you requested could not be found on chordly.my.id.',
    canonical: `${ORIGIN}/404`,
    robots: 'noindex, follow',
  },
];

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) {
    throw new Error(`prerender: expected ${label} tag not found in dist/index.html`);
  }
  return source.replace(pattern, replacement);
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function shellFor(route, markup) {
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`, 'title');
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    'meta description'
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(route.canonical)}" />`,
    'canonical'
  );
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(route.canonical)}" />`,
    'og:url'
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    'og:title'
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    'og:description'
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    'twitter:title'
  );
  html = replaceOnce(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    'twitter:description'
  );
  html = replaceOnce(
    html,
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${escapeAttr(route.robots)}" />`,
    'robots'
  );
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${markup}</div>`, 'root div');
  return html;
}

async function main() {
  stubBrowser('/');
  const { default: App } = await import('../src/App.tsx');

  if (typeof App !== 'function') {
    throw new Error('prerender: App default export is not a component');
  }

  const originalError = console.error;
  const suppressed = [];
  console.error = (...args) => {
    const first = String(args[0] ?? '');
    if (first.includes('useLayoutEffect does nothing on the server')) return;
    suppressed.push(args);
    originalError(...args);
  };

  try {
    for (const route of routes) {
      stubBrowser(route.path);
      const markup = renderToString(React.createElement(App));
      if (!markup || markup.length < 500) {
        throw new Error(`prerender: rendered markup for ${route.path} looks empty (${markup.length} chars)`);
      }
      const html = shellFor(route, markup);
      const outPath = path.join(distDir, route.outFile);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf8');
      console.log(`prerender: ${route.path} -> ${path.relative(distDir, outPath)} (${markup.length} chars)`);
    }
  } finally {
    console.error = originalError;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
