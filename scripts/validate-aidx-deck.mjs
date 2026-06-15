#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const allowExperimental = process.argv.includes('--allow-experimental');

if (!file) {
  console.error('Usage: node scripts/validate-aidx-deck.mjs <index.html> [--allow-experimental]');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const allowedLayouts = new Set(Array.from({ length: 22 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`));
const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlForSlides.matchAll(slideRe)].map((m, idx) => ({
  idx: idx + 1,
  html: m[0],
  tag: m[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

if (!slides.length) errors.push('No <section class="slide"> pages found.');

if (/data-layout="AIDX-\d+/i.test(htmlForSlides)) {
  errors.push('Found old AIDX-xx layout ids. AIDX uses S01-S22 only.');
}

if (/\bclass="[^"]*\bstage\b/i.test(htmlForSlides)) {
  errors.push('Found old .stage canvas. AIDX uses .canvas-card.');
}

if (/\/Users\/|file:\/\//.test(htmlForSlides)) {
  errors.push('Found local absolute path or file:// URL. Generated decks must be portable single HTML files.');
}

if (/\[必填\]/.test(htmlForSlides)) {
  errors.push('Found unresolved [必填] placeholder.');
}

slides.forEach((slide) => {
  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];

  if (!layout) {
    errors.push(`Slide ${slide.idx}: missing data-layout. AIDX locked mode requires S01-S22.`);
  } else if (!allowedLayouts.has(layout)) {
    errors.push(`Slide ${slide.idx}: data-layout="${layout}" is not registered. Use S01-S22.`);
  }

  if (!/\bcanvas-card\b/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: missing .canvas-card.`);
  }

  if (!/\baidx-brand\b/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: missing .aidx-brand header with avatar-terminal.`);
  }

  if (!/(AIDX\s*·\s*WeBank|WeBank)/.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: no visible WeBank endorsement detected.`);
  }

  if (!allowExperimental && /\bdata-layout="P2[34]\b|AIDX Image Split|AIDX Evidence Grid|aidx-img-split|aidx-img-grid/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses experimental P23/P24 image structure. Use S22 or S15/S16 image-grid adaptations instead.`);
  }

  const isStatement = layout === 'S03' || layout === 'S09' || layout === 'S10';
  const topChunk = slide.html.slice(0, 1800);

  if (!isStatement && /text-align\s*:\s*center/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top title area contains text-align:center. AIDX body titles should stay left aligned.`);
  }

  if (!isStatement && /align-self\s*:\s*center/i.test(topChunk) && /<h[12]\b/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top heading appears centrally aligned. Use the original left-top title skeleton.`);
  }

  if (/<svg\b[\s\S]*?<text\b/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: SVG contains visible <text>. Put labels in HTML; keep SVG for geometry only.`);
  }

  const localImages = [...slide.html.matchAll(/<img\b[^>]*src="images\//g)];
  localImages.forEach((match, imageIndex) => {
    const imgTag = slide.html.slice(match.index, slide.html.indexOf('>', match.index) + 1);
    if (!/\bdata-image-slot="/.test(imgTag)) {
      errors.push(`Slide ${slide.idx}: local image ${imageIndex + 1} missing data-image-slot.`);
    }
  });

  const frameImageRe = /<div\b(?=[^>]*\bclass="([^"]*\bframe-img\b[^"]*)")[^>]*>[\s\S]*?<img\b(?=[^>]*\bdata-image-slot="([^"]+)")[^>]*>/g;
  const frameImages = [...slide.html.matchAll(frameImageRe)];
  frameImages.forEach((match) => {
    const className = match[1];
    const slot = match[2];
    const frameTag = match[0].match(/^<div\b[^>]*>/)?.[0] ?? '';
    if (/^s1[56]-(?:grid|brief)-21x9$/.test(slot)) {
      if (/\bfit-contain\b/.test(className)) errors.push(`Slide ${slide.idx}: ${slot} uses fit-contain. Regenerated 21:9 grid images should fill the slot.`);
      if (!/\br-21x9\b/.test(className)) errors.push(`Slide ${slide.idx}: ${slot} must use .frame-img.r-21x9.`);
      if (/height\s*:\s*\d+(?:\.\d+)?vh/i.test(frameTag)) errors.push(`Slide ${slide.idx}: ${slot} frame has fixed vh height. Use aspect-ratio instead.`);
    }
  });

  if (layout === 'S22') {
    if (!/data-image-slot="s22-hero-21x9"/.test(slide.html)) {
      errors.push(`Slide ${slide.idx}: S22 must use data-image-slot="s22-hero-21x9".`);
    }
    if (/object-position\s*:\s*top center/i.test(slide.html)) {
      errors.push(`Slide ${slide.idx}: S22 photo uses object-position:top center. Use center 35% or center center.`);
    }
  }
});

if (slides.length >= 8) {
  const layouts = slides.map((s) => s.tag.match(/\bdata-layout="([^"]+)"/)?.[1]).filter(Boolean);
  const uniqueLayouts = new Set(layouts);
  if (uniqueLayouts.size < 6) warnings.push(`Deck has ${uniqueLayouts.size} unique layouts; 8+ slide decks should use at least 6.`);
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
