#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const file = process.argv[2];

if (!file) {
  console.error('Usage: node scripts/validate-aidx-deck.mjs <index.html>');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const allowedLayouts = new Set(
  Array.from({ length: 10 }, (_, i) => `AIDX-${String(i + 1).padStart(2, '0')}`),
);

const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlForSlides.matchAll(slideRe)].map((match, idx) => ({
  idx: idx + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

if (!slides.length) {
  errors.push('No <section class="slide"> pages found.');
}

const layoutSeq = [];

slides.forEach((slide) => {
  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];
  layoutSeq.push(layout || '');

  if (!layout) {
    errors.push(`Slide ${slide.idx}: missing data-layout. AIDX locked mode requires AIDX-01 to AIDX-10.`);
  } else if (!allowedLayouts.has(layout)) {
    errors.push(`Slide ${slide.idx}: data-layout="${layout}" is not registered in references/layouts-aidx.md.`);
  }

  if (!/\bclass="[^"]*\bstage\b/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: missing <div class="stage">. AIDX slides must use the fixed 1600x900 stage.`);
  }

  if (/\/Users\/|file:\/\//i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: contains a local machine path. Inline brand SVG or use relative images/ assets only.`);
  }

  if (/<img\b[^>]*src="[^"]*brand[^"]*\.svg/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: references a brand SVG file. Inline the required logo so the deck remains single-file.`);
  }

  const localImages = [...slide.html.matchAll(/<img\b[^>]*src="images\//g)];
  localImages.forEach((match, imageIndex) => {
    const imgTag = slide.html.slice(match.index, slide.html.indexOf('>', match.index) + 1);
    if (!/\bdata-image-slot="/.test(imgTag)) {
      errors.push(`Slide ${slide.idx}: local image ${imageIndex + 1} missing data-image-slot.`);
    }
  });

  if (/[\u{1F300}-\u{1FAFF}]/u.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: contains emoji. Use text labels, status blocks, or inline AIDX geometry instead.`);
  }

  if (/#0ff\b|(?:color|background(?:-color)?)\s*:\s*(?:cyan|aqua)\b/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses ad hoc neon cyan. Use var(--aidx-cyan) or registered AIDX tokens.`);
  }

  if (/font-size\s*:\s*(?:[0-9.]+)\s*(?:vw|vh)/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses viewport-based font sizing. AIDX slides use fixed stage typography.`);
  }

  if (/letter-spacing\s*:\s*-[0-9.]+/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses negative letter-spacing. Keep AIDX executive pages readable.`);
  }

  const smallFontMatches = [...slide.html.matchAll(/font-size\s*:\s*([0-9.]+)px/gi)];
  smallFontMatches.forEach((match) => {
    const size = Number(match[1]);
    if (Number.isFinite(size) && size < 14) {
      errors.push(`Slide ${slide.idx}: inline font-size ${size}px is below the AIDX minimum of 14px.`);
    }
  });

  const radiusMatches = [...slide.html.matchAll(/border-radius\s*:\s*([0-9.]+)px/gi)];
  radiusMatches.forEach((match) => {
    const radius = Number(match[1]);
    if (Number.isFinite(radius) && radius > 8) {
      warnings.push(`Slide ${slide.idx}: inline border-radius ${radius}px exceeds the recommended 8px maximum.`);
    }
  });

  if (/linear-gradient|radial-gradient|box-shadow/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: contains custom gradient or shadow. Confirm this is necessary for an executive brief.`);
  }

  if (/<table\b/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: contains a table. Keep tables sparse or move dense material to appendix.`);
  }
});

for (let i = 2; i < layoutSeq.length; i += 1) {
  if (layoutSeq[i] && layoutSeq[i] === layoutSeq[i - 1] && layoutSeq[i] === layoutSeq[i - 2]) {
    warnings.push(`Slides ${i - 1}-${i + 1}: three consecutive pages use ${layoutSeq[i]}. Vary the AIDX layout rhythm.`);
  }
}

if (slides.length >= 5 && !layoutSeq.includes('AIDX-02')) {
  warnings.push('Deck has 5+ slides but no AIDX-02 executive summary page.');
}

if (slides.length >= 7 && !layoutSeq.some((layout) => layout === 'AIDX-03' || layout === 'AIDX-10')) {
  errors.push('Deck has 7+ slides but no decision/request page. Include AIDX-03 or AIDX-10.');
}

if (slides.length >= 7 && !layoutSeq.some((layout) => layout === 'AIDX-05' || layout === 'AIDX-06')) {
  errors.push('Deck has 7+ slides but no roadmap or risk page. Include AIDX-05 or AIDX-06.');
}

if (slides[0] && !/AIDX/.test(slides[0].html)) {
  warnings.push('Slide 1 does not visibly include AIDX. Cover pages should expose the AIDX brand.');
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error('AIDX deck validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`AIDX deck validation passed: ${slides.length} slide(s).`);
