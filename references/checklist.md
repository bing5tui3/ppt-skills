# AIDX Delivery Checklist

Use this before calling an AIDX deck done.

## P0 · Must Pass

### Template and Structure

- Deck is based on `assets/template-aidx.html`.
- The template uses AIDX `.slide` + `.canvas-card`, not `.stage`.
- Every page has `data-layout="Sxx"` from `S01` to `S22`.
- No `data-layout="AIDX-xx"` remains.
- No `[必填]` placeholders remain.

### Brand

- Each page has AIDX brand chrome with the official light-background gradient `avatar-terminal.svg` inlined.
- Footer or right meta includes `AIDX · WeBank` or `WeBank` endorsement.
- No `/Users/.../brand/*.svg`, `file://`, or private remote logo path appears in the generated deck.
- Give every inline avatar instance unique gradient and filter IDs.
- Use the inline gradient `avatar-terminal.svg` mark as default chrome.

### Theme

- Use `references/themes-aidx.md` variables.
- Canonical `--aidx-*` values match `references/aidx-colors.json`.
- New slide content uses canonical `--aidx-*` roles; legacy aliases are compatibility-only.
- Pages stay in the light AIDX family: `surface.base`, `surface.canvas`, `surface.subtle`, and `action.subtle`.
- `slide dark` is not a black command-center page.
- Risk and progress states use `.status-chip`, a matching `data-status`, and visible status text.
- Signal Cyan appears only in explicit AI state, motion or a small AI signal.
- Categorical charts use no more than eight series and retain a non-color identification channel.
- Colored effects are limited to `--aidx-gradient-core`, `--aidx-gradient-ai`, and `--aidx-glow-ai`.
- No generic neon, cyberpunk, purple-blue glow, gradient wallpaper, or decorative blobs.

### Layout Fidelity

- Preserve the chosen Sxx skeleton: title axis, split halves, matrices, timelines, KPI rows, and image strip placement.
- Top narrative headings stay left aligned except statement layouts S03/S09/S10.
- Do not invent P23/P24 or freeform evidence grids.
- SVG contains no visible text; labels are HTML.

### Images

- Local images live under `images/`.
- Every local image has `data-image-slot`.
- S22 uses `data-image-slot="s22-hero-21x9"`.
- Screenshot evidence preserves important text and masks sensitive data.

### Validation

Run:

```bash
node scripts/validate-aidx-deck.mjs assets/template-aidx.html --template
node scripts/validate-aidx-deck.mjs path/to/index.html
```

The deck should pass with no errors.

## P1 · Quality Bar

- 8+ slide decks use at least 6 different Sxx layouts.
- Avoid repeating the same body structure three times in a row.
- KPI pages include metric context and units.
- Decision pages state recommendation, tradeoff, and next action.
- Risk content names impact, owner or decision maker, and mitigation.
- Pressing `B` toggles low-power mode while leaving content readable.
- Arrow keys, wheel, touch swipe, bottom dots, and ESC overview work.
