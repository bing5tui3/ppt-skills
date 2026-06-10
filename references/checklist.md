# AIDX Delivery Checklist

Use this checklist before calling an AIDX deck done. It is intentionally AIDX-only: do not apply legacy visual systems, old templates, or unrelated style rules.

## P0 · Must Pass

### 1. Correct Template

- Deck is based on `assets/template-aidx.html`.
- `<title>` is replaced with the actual deck title.
- No `[必填]` placeholders remain.
- No references to deleted templates or reference files.

```bash
rg "\\[必填\\]" path/to/index.html
```

### 2. AIDX Locked Mode

- Every page is `<section class="slide ...">`.
- Every page has `data-layout="AIDX-xx"`.
- Every page contains `<div class="stage">`.
- Layout values are only `AIDX-01` through `AIDX-10`.
- 7+ slide decks include `AIDX-02`.
- 7+ slide decks include `AIDX-03` or `AIDX-10`.
- 7+ slide decks include `AIDX-05` or `AIDX-06`.

### 3. Brand and Theme

- AIDX is the primary brand.
- WeBank is an endorsement, usually in the right meta area or footer.
- Theme variables come from `references/themes-aidx.md`.
- No custom hex colors for primary surfaces, brand colors, or status colors unless explicitly justified.
- No generic neon, cyberpunk, or blue-purple gradient visual language.

### 4. Single-File Safety

- No `/Users/...`, `file://`, local brand SVG paths, or private remote assets.
- Brand geometry is inline SVG or text lockup.
- External fonts are acceptable because content remains readable with system fallbacks.
- Local evidence images are relative paths under `images/`.

### 5. Image Slots

- Every `<img src="images/...">` has `data-image-slot`.
- Evidence screenshots prefer `data-image-slot="aidx-evidence-16x10"`.
- Screenshots preserve important text and UI state.
- Sensitive names, account numbers, customer names, and internal identifiers are masked before insertion.

### 6. Readability

- No inline font size below 14px.
- No viewport-based font sizing inside slides.
- No negative letter spacing.
- No text overlap.
- No dense tables in main narrative pages.
- If content does not fit, split the page or reduce copy.

### 7. Validation

Run:

```bash
node scripts/validate-aidx-deck.mjs path/to/index.html
```

The deck should pass with no errors. Warnings require deliberate review.

## P1 · Quality Bar

### Executive Structure

- Slide 1 makes scope, topic, impact, and ask visible.
- Slide 2 states the three most important conclusions.
- Decision pages name the recommendation, tradeoff, and next step.
- Risk pages include impact, owner or decision maker, and mitigation.
- KPI pages include context, not only numbers.
- Closing request names approval items and timing.

### Layout Rhythm

- Do not repeat the same layout three times in a row.
- Do not turn every page into a three-card grid.
- Use `slide light` only for screenshot fidelity, dense appendix material, or tables.
- Use `slide blue` for cover, section-level reset, or closing request.

### Evidence Quality

- AIDX-09 explains what the screenshot proves.
- Architecture diagrams describe capability boundaries, not every implementation detail.
- KPI visuals use the same metric labels and units across the deck.
- Roadmaps show dependency or phase order clearly.

### Interaction

- Arrow keys, scroll wheel, touch swipe, bottom dots, and ESC overview work.
- Pressing `B` toggles low-power mode and leaves all content readable.
- Browser zoom and responsive stage scaling keep slides centered.

## P2 · Final Review

- Open the deck in a browser and inspect every slide.
- Check 16:9 desktop and a narrow viewport.
- Check screenshots and generated images are sharp enough for presentation.
- Check README or exported preview screenshots if this is a repository-level change.
- Run `scripts/validate-aidx-deck.mjs`; it includes stale legacy-reference checks.
