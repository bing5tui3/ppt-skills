# AIDX Screenshot Framing

Screenshots are evidence. Preserve meaning first; styling only improves readability and fit.

## Slots

| Use | Ratio | Layout |
|---|---|---|
| Main case evidence | 21:9 | S22 with `data-image-slot="s22-hero-21x9"` |
| Faithful UI evidence | 16:10 | S08/S15/S16 support area with `.frame-img.r-16x10.fit-contain` |
| Multi-image evidence | 21:9 each | S15 `s15-grid-21x9` or S16 `s16-brief-21x9` |
| Architecture/KPI supplement | 16:9 | S17/S20/S21 support visual |

## HTML Requirements

```html
<div class="frame-img r-21x9" data-image-slot="s22-hero-21x9">
  <img src="images/08-workflow-proof.png" alt="AIDX workflow proof">
</div>
```

- Local files live under `images/`.
- Every local image needs `data-image-slot`.
- Use useful `alt` text.
- Do not use `/Users/...`, `file://`, private remote URLs, or local brand SVG paths.

## Faithful Adaptation

Use faithful adaptation when the screenshot is proof:

- Preserve important text, numbers, UI hierarchy, status indicators, and error states.
- Do not invent UI controls or metrics.
- Do not crop out evidence needed to support the slide conclusion.
- Mask sensitive names, accounts, tokens, URLs, customer data, and internal secrets.
- Use `.fit-contain` for dense screenshots.

## S22 Placement

- S22 hero visuals should be close to 21:9.
- For photos, keep the subject in the central safe area and avoid `object-position:top center`.
- For UI visuals, regenerate or frame to 21:9 when possible.
- Do not let captions or KPI rows overlap the bottom nav dots.

## Final Checks

- Screenshot text is readable at presentation size.
- Important content is not cropped.
- Sensitive data is masked.
- Slot names match the chosen Sxx layout.
- `node scripts/validate-aidx-deck.mjs path/to/index.html` passes.