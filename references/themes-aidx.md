# AIDX Theme

AIDX uses the registered layout structure, light management-review canvas, AIDX blue/navy, subtle grid lines, and WeBank endorsement.

## Fixed Variables

Use these variables in `assets/template-aidx.html`. Do not introduce ad hoc theme colors for primary surfaces.

```css
--paper:#ffffff;
--paper-rgb:255,255,255;
--ink:#063970;
--ink-rgb:6,57,112;
--grey-1:#f5f8fc;
--grey-2:#d7dde8;
--grey-3:#56606f;
--accent:#3A5ECF;
--accent-rgb:58,94,207;
--accent-on:#ffffff;
--accent-bright:#5DADE2;
--text-primary:#101216;
--text-secondary:#56606f;
--text-helper:#6b7280;
--text-placeholder:#9ca3af;
--text-on-color:#ffffff;
--border-subtle:#d7dde8;
--border-strong:#aeb8c7;
```

## Page Modes

| Class | Visual treatment | Use |
|---|---|---|
| `slide` | White canvas | Default narrative and data pages |
| `slide grey` | Light blue-gray canvas | Dense comparison, appendix, quieter support pages |
| `slide accent` | Pale AIDX blue canvas | Cover, section reset, closing emphasis |
| `slide dark` | Pale navy-tinted canvas | Compatibility only; not a black page |
| `slide split` | Two full-height halves | S03 / S10 split statement structures |

The layout class semantics are preserved, but all modes stay in the AIDX light family. Do not restore full black or full saturated-blue pages as the default.

## Brand Rules

- Use the inline `avatar-terminal.svg` mark in the top-left `.aidx-brand` lockup.
- Use text `AIDX · WeBank` in footer or right meta; do not place full logo artwork by default.
- Keep AIDX primary and WeBank as endorsement.
- Do not reference local brand paths such as `/Users/.../brand/*.svg` in generated decks.

## Color Discipline

- AIDX blue `#3A5ECF` is the only strong accent.
- Navy `#063970` is used for brand, metadata, strong lines, and important text.
- Cyan `#5DADE2` is a secondary signal only.
- Risk/progress colors may appear only in small status elements.
- Avoid gradients, glow-heavy cyberpunk styling, decorative bokeh, and purple-blue generic tech palettes.
