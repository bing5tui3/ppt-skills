#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = process.argv[2];
const allowExperimental = process.argv.includes('--allow-experimental');
const templateMode = process.argv.includes('--template');

if (!file) {
  console.error('Usage: node scripts/validate-aidx-deck.mjs <index.html> [--template] [--allow-experimental]');
  process.exit(2);
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const brandSnapshotPath = resolve(repoRoot, 'references/aidx-colors.json');
const brand = JSON.parse(readFileSync(brandSnapshotPath, 'utf8'));
const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

function normalizeCssValue(value) {
  return value.replace(/\s+/g, '').toLowerCase();
}

function readCssVariables(source) {
  const variables = new Map();
  for (const match of source.matchAll(/(--[\w-]+)\s*:\s*([^;}{]+);/g)) {
    if (!variables.has(match[1])) variables.set(match[1], match[2].trim());
  }
  return variables;
}

const light = brand.semantic.light;
const expectedThemeTokens = {
  '--aidx-brand-core': light.brand.core,
  '--aidx-brand-action': light.brand.action,
  '--aidx-brand-signal': light.brand.signal,
  '--aidx-surface-canvas': light.surface.canvas,
  '--aidx-surface-base': light.surface.base,
  '--aidx-surface-raised': light.surface.raised,
  '--aidx-surface-subtle': light.surface.subtle,
  '--aidx-surface-sunken': light.surface.sunken,
  '--aidx-surface-inverse': light.surface.inverse,
  '--aidx-text-primary': light.text.primary,
  '--aidx-text-secondary': light.text.secondary,
  '--aidx-text-muted': light.text.muted,
  '--aidx-text-placeholder': brand.palette.navyGray.scale['400'],
  '--aidx-text-inverse': light.text.inverse,
  '--aidx-text-link': light.text.link,
  '--aidx-text-link-hover': light.text.linkHover,
  '--aidx-border-subtle': light.border.subtle,
  '--aidx-border-default': light.border.default,
  '--aidx-border-strong': light.border.strong,
  '--aidx-border-focus': light.border.focus,
  '--aidx-action-primary': light.action.primary,
  '--aidx-action-primary-hover': light.action.primaryHover,
  '--aidx-action-primary-active': light.action.primaryActive,
  '--aidx-action-on-primary': light.action.onPrimary,
  '--aidx-action-subtle': light.action.subtle,
  '--aidx-action-on-subtle': light.action.onSubtle,
  '--aidx-action-disabled': light.action.disabled,
  '--aidx-action-on-disabled': light.action.onDisabled,
  '--aidx-status-success-bg': light.status.success.background,
  '--aidx-status-success-border': light.status.success.border,
  '--aidx-status-success-text': light.status.success.text,
  '--aidx-status-warning-bg': light.status.warning.background,
  '--aidx-status-warning-border': light.status.warning.border,
  '--aidx-status-warning-text': light.status.warning.text,
  '--aidx-status-danger-bg': light.status.danger.background,
  '--aidx-status-danger-border': light.status.danger.border,
  '--aidx-status-danger-text': light.status.danger.text,
  '--aidx-status-info-bg': light.status.info.background,
  '--aidx-status-info-border': light.status.info.border,
  '--aidx-status-info-text': light.status.info.text,
  '--aidx-status-ai-bg': light.status.ai.background,
  '--aidx-status-ai-border': light.status.ai.border,
  '--aidx-status-ai-text': light.status.ai.text,
  ...Object.fromEntries(
    brand.dataVisualization.categorical.light.map((color, index) => [`--aidx-data-${index + 1}`, color]),
  ),
  '--aidx-gradient-core': brand.effects.coreGradient,
  '--aidx-gradient-ai': brand.effects.aiSignalGradient,
  '--aidx-glow-ai': brand.effects.ambientGlow,
};

const expectedLegacyAliases = {
  '--paper': 'var(--aidx-surface-base)',
  '--ink': 'var(--aidx-brand-core)',
  '--grey-1': 'var(--aidx-surface-subtle)',
  '--grey-2': 'var(--aidx-border-default)',
  '--grey-3': 'var(--aidx-text-secondary)',
  '--accent': 'var(--aidx-action-primary)',
  '--accent-on': 'var(--aidx-action-on-primary)',
  '--accent-bright': 'var(--aidx-brand-signal)',
  '--text-primary': 'var(--aidx-text-primary)',
  '--text-secondary': 'var(--aidx-text-secondary)',
  '--text-helper': 'var(--aidx-text-muted)',
  '--text-placeholder': 'var(--aidx-text-placeholder)',
  '--text-on-color': 'var(--aidx-text-inverse)',
  '--border-subtle': 'var(--aidx-border-subtle)',
  '--border-strong': 'var(--aidx-border-strong)',
};

const cssVariables = readCssVariables(html);

for (const [name, expected] of Object.entries(expectedThemeTokens)) {
  const actual = cssVariables.get(name);
  if (!actual) {
    errors.push(`Theme: missing canonical token ${name}.`);
  } else if (normalizeCssValue(actual) !== normalizeCssValue(expected)) {
    errors.push(`Theme: ${name} is ${actual}; expected ${expected} from AIDX Color System ${brand.meta.version}.`);
  }
}

for (const [name, expected] of Object.entries(expectedLegacyAliases)) {
  const actual = cssVariables.get(name);
  if (!actual) {
    errors.push(`Theme: missing legacy compatibility alias ${name}.`);
  } else if (normalizeCssValue(actual) !== normalizeCssValue(expected)) {
    errors.push(`Theme: compatibility alias ${name} must map to ${expected}.`);
  }
}

const allowedLayouts = new Set(Array.from({ length: 22 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`));
const allowedStatuses = new Set(['success', 'warning', 'danger', 'info', 'ai']);
const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlForSlides.matchAll(slideRe)].map((match, index) => ({
  idx: index + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

if (!templateMode && !slides.length) errors.push('No <section class="slide"> pages found.');

if (/data-layout="AIDX-\d+/i.test(htmlForSlides)) {
  errors.push('Found unsupported AIDX-xx layout ids. AIDX uses S01-S22 only.');
}

if (/\bclass="[^"]*\bstage\b/i.test(htmlForSlides)) {
  errors.push('Found unsupported .stage canvas. AIDX uses .canvas-card.');
}

if (/\/Users\/|file:\/\//.test(htmlForSlides)) {
  errors.push('Found local absolute path or file:// URL. Generated decks must be portable single HTML files.');
}

if (!templateMode && /\[必填\]/.test(htmlForSlides)) {
  errors.push('Found unresolved [必填] placeholder.');
}

const avatarPaintIds = [];

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

  const avatarMarkup = slide.html.match(/<span\b[^>]*class="[^"]*\baidx-avatar-mark\b[^"]*"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? '';
  if (!avatarMarkup) {
    errors.push(`Slide ${slide.idx}: missing inline avatar-terminal mark.`);
  } else {
    if (!/<linearGradient\b/i.test(avatarMarkup) || !/<radialGradient\b/i.test(avatarMarkup)) {
      errors.push(`Slide ${slide.idx}: avatar-terminal must use the official light-background gradient artwork.`);
    }

    const paintIds = [...avatarMarkup.matchAll(/<(?:linearGradient|radialGradient|filter)\b[^>]*\bid="([^"]+)"/gi)]
      .map((match) => match[1]);
    avatarPaintIds.push(...paintIds);
    const duplicatePaintIds = paintIds.filter((id, index) => paintIds.indexOf(id) !== index);
    if (duplicatePaintIds.length) {
      errors.push(`Slide ${slide.idx}: duplicate avatar paint ID(s) ${[...new Set(duplicatePaintIds)].join(', ')}.`);
    }
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

  const canvasTag = slide.html.match(/<div\b[^>]*class="[^"]*\bcanvas-card\b[^"]*"[^>]*>/i)?.[0] ?? '';
  if (/\bstyle="[^"]*\bbackground\s*:\s*(?!var\(--aidx-)[^;"]+/i.test(canvasTag)) {
    errors.push(`Slide ${slide.idx}: .canvas-card uses a non-token page background. Use an --aidx-surface-* or --aidx-action-subtle token.`);
  }

  const slideWithoutSvg = slide.html.replace(/<svg\b[\s\S]*?<\/svg>/gi, '');
  const hardcodedColors = [...new Set([...slideWithoutSvg.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((match) => match[0].toUpperCase()))];
  if (hardcodedColors.length) {
    warnings.push(`Slide ${slide.idx}: hard-coded color(s) ${hardcodedColors.join(', ')}. Prefer canonical --aidx-* tokens.`);
  }

  const legacyUses = [...new Set(
    [...slide.html.matchAll(/var\(--(paper|ink|grey-[123]|accent(?:-on|-bright)?|text-(?:primary|secondary|helper|placeholder|on-color)|border-(?:subtle|strong))\)/g)]
      .map((match) => `--${match[1]}`),
  )];
  if (legacyUses.length) {
    warnings.push(`Slide ${slide.idx}: legacy token use ${legacyUses.join(', ')}. New content should use --aidx-* roles.`);
  }

  const gradients = [...slideWithoutSvg.matchAll(/(?:repeating-)?(?:linear|radial)-gradient\([^)]*\)/gi)].map((match) => match[0]);
  const allowedEffects = new Set([brand.effects.coreGradient, brand.effects.aiSignalGradient].map(normalizeCssValue));
  for (const gradient of gradients) {
    if (/^repeating-/i.test(gradient)) continue;
    if (!allowedEffects.has(normalizeCssValue(gradient))) {
      errors.push(`Slide ${slide.idx}: unsupported colored gradient "${gradient}". Use --aidx-gradient-core, --aidx-gradient-ai, or a monochrome repeating texture.`);
    }
  }

  const statusMatches = [...slide.html.matchAll(/<([a-z][\w:-]*)\b([^>]*\bdata-status="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi)];
  const statusAttributeCount = [...slide.html.matchAll(/\bdata-status="/g)].length;

  if (statusMatches.length !== statusAttributeCount) {
    errors.push(`Slide ${slide.idx}: every data-status element must have an explicit closing tag and visible label.`);
  }

  for (const match of statusMatches) {
    const attributes = match[2];
    const status = match[3];
    const label = match[4].replace(/<[^>]+>/g, '').trim();

    if (!allowedStatuses.has(status)) {
      errors.push(`Slide ${slide.idx}: unsupported data-status="${status}". Use success, warning, danger, info, or ai.`);
    }

    if (!new RegExp(`\\bstatus-${status}\\b`).test(attributes)) {
      errors.push(`Slide ${slide.idx}: data-status="${status}" must use class status-${status}.`);
    }

    if (!label) {
      errors.push(`Slide ${slide.idx}: data-status="${status}" has no visible text. Status cannot rely on color alone.`);
    }
  }

  const statusClassTags = [...slide.html.matchAll(/<[^>]+\bclass="[^"]*\bstatus-(success|warning|danger|info|ai)\b[^"]*"[^>]*>/gi)];
  for (const match of statusClassTags) {
    if (!/\bdata-status="(?:success|warning|danger|info|ai)"/i.test(match[0])) {
      errors.push(`Slide ${slide.idx}: class status-${match[1]} is missing matching data-status.`);
    }
  }

  if (/(风险账单|RISK LEDGER)/i.test(slide.html) && !statusMatches.length) {
    errors.push(`Slide ${slide.idx}: risk ledger must map items to semantic status chips.`);
  }

  if (/var\(--aidx-brand-signal\)/.test(slide.html) && !/data-status="ai"/.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: Signal Cyan appears outside an explicit AI status.`);
  }

  const dataSeries = [...slide.html.matchAll(/\bdata-series-(\d+)\b/g)].map((match) => Number(match[1]));
  if (dataSeries.some((index) => index < 1 || index > brand.dataVisualization.maximumCategories)) {
    errors.push(`Slide ${slide.idx}: categorical data series exceed the ${brand.dataVisualization.maximumCategories}-color maximum.`);
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

const repeatedAvatarPaintIds = avatarPaintIds.filter((id, index) => avatarPaintIds.indexOf(id) !== index);
if (repeatedAvatarPaintIds.length) {
  errors.push(`Avatar gradient/filter IDs must be unique across the deck: ${[...new Set(repeatedAvatarPaintIds)].join(', ')}.`);
}

if (!templateMode && slides.length >= 8) {
  const layouts = slides.map((slide) => slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1]).filter(Boolean);
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

if (templateMode) {
  console.log(`AIDX template theme validation passed: ${Object.keys(expectedThemeTokens).length} canonical token(s), snapshot ${brand.meta.version}.`);
} else {
  console.log(`AIDX deck validation passed: ${slides.length} slide(s), color snapshot ${brand.meta.version}.`);
}
