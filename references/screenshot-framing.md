# AIDX Screenshot Framing

AIDX screenshots are evidence. Treat them as proof for a conclusion, decision, risk, or progress signal. Preserve meaning first; styling supports readability and trust.

## Default Slots

| Use | Ratio | Recommended layout |
|---|---|---|
| Evidence screenshot | 16:10 | `AIDX-09` with `.frame-img.r-16x10.fit-contain` |
| Product/workflow proof | 16:10 | `AIDX-09` or a `slide light` appendix |
| Architecture supplement | 16:9 | `AIDX-07` or inline generated visual |
| KPI supplement | 16:9 | `AIDX-04` support panel |
| Social cover | 21:9 / 1:1 / 3:4 / 16:9 | Generated from `image-prompts.md` |

## HTML Requirements

```html
<figure class="frame-img r-16x10 fit-contain" data-image-slot="aidx-evidence-16x10">
  <img src="images/07-workflow-evidence.png" alt="AIDX workflow evidence">
</figure>
```

- Local files live under `images/`.
- Every local image needs `data-image-slot`.
- Use useful `alt` text.
- Do not use `/Users/...`, `file://`, private remote URLs, or local brand SVG paths.

## Faithful Adaptation

Use faithful adaptation when the screenshot is evidence:

- Preserve important text, numbers, UI hierarchy, status indicators, and error states.
- Do not invent UI controls or metrics.
- Do not crop out evidence needed to support the slide conclusion.
- Mask sensitive names, account identifiers, customer data, tokens, private URLs, and internal secrets.
- Prefer `slide light` when the original screenshot is light and contains dense text.

## Programmatic Framing

When the original screenshot is already usable:

1. Place it on a 16:10 canvas.
2. Add clear margins around the screenshot.
3. Use a quiet AIDX support surface:
   - Light evidence canvas: `#f5f7fb` with subtle `#d8dde8` grid lines.
   - Dark evidence canvas: `#0F0F11` with subtle `#242428` grid lines and low-opacity AIDX blue/cyan lines.
4. Keep corners at 6px or less.
5. Avoid heavy shadows; use thin borders instead.

## Redesign Through Image Generation

Use generated redesign only when:

- The source screenshot is too long, narrow, cluttered, or low-resolution.
- The content is conceptual and does not need exact UI fidelity.
- Sensitive information makes direct screenshot use impractical.

Prompt source: `references/image-prompts.md`, Type 1.

## Placement Rules

- Explain what the screenshot proves in nearby text.
- Do not repeat every visible button or label.
- Add one callout only if it materially improves comprehension.
- Keep captions short and factual.
- Do not place screenshot edges behind nav dots or browser-safe margins.

## Final Checks

- Screenshot text is readable at presentation size.
- Important content is not cropped.
- Sensitive data is masked.
- The image slot name matches its use.
- Validator passes.
