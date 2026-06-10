# Testing Patterns

**Analysis Date:** 2026-06-10

## Test Framework

**Runner:**
- Not detected. There is no `package.json`, `jest.config.*`, `vitest.config.*`, or `*.test.*` / `*.spec.*` suite in the repository.
- Current verification is performed through Node CLI validators in `scripts/validate-aidx-deck.mjs` and `scripts/validate-swiss-deck.mjs`, plus manual deck QA described in `CONTRIBUTING.md`.

**Assertion Library:**
- Not detected. Validator scripts use explicit `if` checks, `errors.push(...)`, `warnings.push(...)`, and `process.exit(...)`.

**Run Commands:**
```bash
node scripts/validate-aidx-deck.mjs path/to/index.html              # Validate an AIDX deck
node scripts/validate-swiss-deck.mjs path/to/index.html             # Validate a Swiss deck
node scripts/validate-swiss-deck.mjs path/to/index.html --allow-experimental  # Permit experimental Swiss structures
node scripts/build-aidx-examples.mjs                                # Rebuild examples/aidx-style-c-showcase.html
```

## Test File Organization

**Location:**
- No formal test directory is present.
- Verification scripts live in `scripts/`.
- Generated/manual examples live in `examples/`, especially `examples/aidx-style-c-showcase.html`.
- Testable layout contracts live in `references/`, including `references/layouts-aidx.md` and `references/swiss-layout-lock.md`.

**Naming:**
- Use `validate-<style>-deck.mjs` for deck validators, following `scripts/validate-aidx-deck.mjs` and `scripts/validate-swiss-deck.mjs`.
- Use `build-<style>-examples.mjs` for example generators, following `scripts/build-aidx-examples.mjs`.

**Structure:**
```text
scripts/
├── validate-aidx-deck.mjs       # AIDX locked-mode validator
├── validate-swiss-deck.mjs      # Swiss layout-lock validator
└── build-aidx-examples.mjs      # Example generation smoke check

examples/
└── aidx-style-c-showcase.html   # Generated example deck
```

## Test Structure

**Suite Organization:**
```javascript
const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const slides = [...htmlForSlides.matchAll(slideRe)].map((match, idx) => ({
  idx: idx + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

slides.forEach((slide) => {
  if (!condition) {
    errors.push(`Slide ${slide.idx}: actionable message.`);
  }
});
```

**Patterns:**
- Parse the whole HTML once, stripping comments before slide validation.
- Extract slides with a single `<section class="slide">` regex and attach `idx`, `html`, and opening `tag`.
- Use rule-specific checks inside one `slides.forEach(...)` pass.
- Collect warnings and errors separately.
- Print warnings before errors.
- Exit `1` when any blocking errors exist and print a success line only when no errors remain.

## Mocking

**Framework:** Not detected

**Patterns:**
```javascript
const html = readFileSync(file, 'utf8');
const slides = [...htmlForSlides.matchAll(slideRe)].map((match, idx) => ({
  idx: idx + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));
```

**What to Mock:**
- Not applicable for current scripts. They read real HTML files and validate text patterns directly.
- If formal unit tests are added, create small HTML fixture strings for specific layout violations rather than mocking filesystem behavior.

**What NOT to Mock:**
- Do not mock the registered layout IDs from `references/layouts-aidx.md` or `references/swiss-layout-lock.md`; validators should reflect those contracts directly.
- Do not mock browser navigation behavior when changing templates. Use a real browser check for keyboard arrows, wheel/touch navigation, ESC overview, low-power mode, and Motion fallback behavior described in `CONTRIBUTING.md`.

## Fixtures and Factories

**Test Data:**
```html
<section class="slide dark" data-layout="AIDX-02">
  <div class="stage">
    ...
  </div>
</section>
```

**Location:**
- No dedicated fixture directory exists.
- Use `examples/aidx-style-c-showcase.html` as the current example artifact for AIDX smoke validation.
- Use temporary generated `index.html` files when running `scripts/validate-aidx-deck.mjs` or `scripts/validate-swiss-deck.mjs` against deck output.

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# Not available; no coverage tool is configured.
```

## Test Types

**Unit Tests:**
- Not used. Validator logic is currently exercised by running the CLI scripts against real or generated decks.

**Integration Tests:**
- Current integration-style checks validate complete deck HTML files.
- `scripts/validate-aidx-deck.mjs` checks registered `AIDX-01` to `AIDX-10` layouts, required `.stage`, local machine paths, brand SVG references, `data-image-slot`, emoji, ad hoc cyan, viewport font sizing, negative letter spacing, minimum inline font size, excessive radius warnings, custom gradient/shadow warnings, table warnings, layout rhythm, required executive summary, decision/request page, roadmap/risk page, and AIDX cover branding.
- `scripts/validate-swiss-deck.mjs` checks registered Swiss layouts, experimental P23/P24 usage, top-title alignment, SVG visible text, local image slot binding, S15/S16 image-frame ratio rules, S22 image slot requirements, and unsafe `object-position:top center`.

**E2E Tests:**
- Not automated.
- Manual QA is expected for template changes. `CONTRIBUTING.md` requires checking at least one dense text slide, one image slide, navigation, ESC overview, and low-power mode.

## Common Patterns

**Async Testing:**
```javascript
let motion;
try {
  motion = await import('./assets/motion.min.js');
} catch(e1) {
  try {
    motion = await import('https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm');
  } catch(e2) {
    console.warn('[motion] local + CDN both failed, disabling animations', e1, e2);
  }
}
```
- Async behavior exists in browser template runtime code, not in automated tests.
- When changing `assets/template.html` or `assets/template-swiss.html`, verify both local Motion loading and static fallback behavior.

**Error Testing:**
```javascript
if (errors.length) {
  console.error('AIDX deck validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
```
- New validators should preserve this pattern so CI or shell scripts can depend on exit status.

---

*Testing analysis: 2026-06-10*
