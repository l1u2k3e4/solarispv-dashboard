#!/usr/bin/env node
// Extract dominant brand colors from the Solaris PV logo.
// Rasterizes SVG (with embedded base64 PNG) to a flat PNG, runs colorthief,
// classifies colors (primary / accent / neutral) via chroma-js.
//
// Usage:  node scripts/extract-brand-colors.mjs [logoPath]
// Output: JSON on stdout

import sharp from 'sharp';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import chroma from 'chroma-js';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const ColorThief = require('colorthief');
const getPalette = (img, count) => ColorThief.getPalette(img, count);

const websiteDir  = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.resolve(websiteDir, '..', '..');

const candidatePaths = [
  process.argv[2],
  path.join(websiteDir, 'public/images/logo-solaris-pv.png'),
  path.join(websiteDir, 'public/images/logo-solaris-pv.svg'),
  path.join(websiteDir, 'public/images/logo.svg'),
].filter(Boolean);

const logoPath = candidatePaths.find((p) => p && fs.existsSync(p));
if (!logoPath) {
  console.error('No logo file found. Tried:', candidatePaths);
  process.exit(1);
}

const tmpPng = '/tmp/solaris-logo-512.png';

// Rasterize at 512px wide on a white background so transparent PNG/SVG
// does not produce false "white" tokens for transparent regions.
await sharp(logoPath, { density: 300 })
  .resize({ width: 512, withoutEnlargement: false })
  .flatten({ background: { r: 255, g: 255, b: 255 } })
  .png()
  .toFile(tmpPng);

// Get top-10 dominant colors. ColorThief 3.x returns objects { _r, _g, _b, population, proportion }.
const paletteRaw = await getPalette(tmpPng, 10);
const palette = paletteRaw.map((p) => Array.isArray(p) ? p : [p._r, p._g, p._b]);
const proportions = paletteRaw.map((p) => Array.isArray(p) ? null : p.proportion);
const colors = palette.map(([r, g, b]) => chroma.rgb(r, g, b));

// Helpers
const isNeutral = (c) => {
  const [h, s, l] = c.hsl();
  // Treat as neutral if very low saturation OR near pure white/black
  return (Number.isNaN(h) || s < 0.1) || l > 0.95 || l < 0.05;
};

const chromatic = colors.filter((c) => !isNeutral(c));
const neutrals  = colors.filter(isNeutral);

// Score chromatic colors: prefer high saturation + visible (not too light/dark)
const scored = chromatic.map((c) => {
  const [h, s, l] = c.hsl();
  // Score: higher s, midtone l (peak around 0.5)
  const score = s * (1 - Math.abs(l - 0.5) * 0.7);
  return { c, h, s, l, score };
}).sort((a, b) => b.score - a.score);

const primary = scored[0]?.c ?? colors[0];
// Accent: a color with hue distance from primary > 30 deg, otherwise the next-best
const accent = scored.slice(1).find((x) => {
  const dh = Math.abs((x.h ?? 0) - (scored[0].h ?? 0));
  const wrapped = Math.min(dh, 360 - dh);
  return wrapped > 30 && chroma.contrast(x.c, primary) > 1.5;
})?.c ?? (scored[1]?.c ?? colors[1]);

const fmt = (c) => ({ hex: c.hex(), rgb: c.rgb(), hsl: c.hsl().map((v, i) => i === 0 ? Math.round(v || 0) : Number(v?.toFixed(3) || 0)) });

// Memory.md (authoritative) brand tokens from theme pbminfotech
const authoritative = {
  primary: chroma('#f47603'),   // Solaris-Orange (CTAs, sun symbolism)
  dark:    chroma('#02152a'),   // Navy (headings, primary surfaces)
  body:    chroma('#888888'),   // Body grey
  light:   chroma('#f7f9fa'),   // Surface alt
  onPrimary: chroma('#ffffff'),
};
const finalPrimary = authoritative.primary;
const finalNavy    = authoritative.dark;

const buildScale = (base, scaleName) => ({
  50:  chroma.mix(base, '#ffffff', 0.92, 'lab').hex(),
  100: chroma.mix(base, '#ffffff', 0.82, 'lab').hex(),
  200: chroma.mix(base, '#ffffff', 0.65, 'lab').hex(),
  300: chroma.mix(base, '#ffffff', 0.45, 'lab').hex(),
  400: chroma.mix(base, '#ffffff', 0.20, 'lab').hex(),
  500: base.hex(),
  600: chroma.mix(base, '#000000', 0.18, 'lab').hex(),
  700: chroma.mix(base, '#000000', 0.32, 'lab').hex(),
  800: chroma.mix(base, '#000000', 0.50, 'lab').hex(),
  900: chroma.mix(base, '#000000', 0.72, 'lab').hex(),
});

const result = {
  source: path.relative(projectRoot, logoPath),
  rastered: tmpPng,
  authoritative_source: 'Memory.md §Brand-Token (theme pbminfotech)',
  logo_dominant_palette: paletteRaw.map((p, i) => ({
    hex: colors[i].hex(),
    proportion: proportions[i],
  })),
  // colorthief-derived candidates (not used as final because logo PNG
  // was rasterized at low DPI and produces noisy colors)
  colorthief_primary_candidate: fmt(primary),
  colorthief_accent_candidate:  fmt(accent),
  colorthief_neutrals: neutrals.map((c) => c.hex()),
  // FINAL tokens (authoritative)
  primary: fmt(finalPrimary),
  navy:    fmt(finalNavy),
  on_primary: '#ffffff',
  body_grey:  authoritative.body.hex(),
  surface_alt: authoritative.light.hex(),
  primary_scale_solaris: buildScale(finalPrimary),
  navy_scale: buildScale(finalNavy),
  contrast: {
    primary_on_white:  Number(chroma.contrast(finalPrimary, '#ffffff').toFixed(2)),
    primary_on_navy:   Number(chroma.contrast(finalPrimary, finalNavy).toFixed(2)),
    navy_on_white:     Number(chroma.contrast(finalNavy, '#ffffff').toFixed(2)),
    white_on_primary:  Number(chroma.contrast('#ffffff', finalPrimary).toFixed(2)),
    body_on_white:     Number(chroma.contrast(authoritative.body, '#ffffff').toFixed(2)),
    primary_700_on_white: Number(chroma.contrast(buildScale(finalPrimary)[700], '#ffffff').toFixed(2)),
  },
};

console.log(JSON.stringify(result, null, 2));
