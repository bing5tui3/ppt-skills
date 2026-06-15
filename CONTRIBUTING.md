# Contributing to aidx-ppt-skill

Thanks for helping improve `aidx-ppt-skill`.

This repository is AIDX-only. Keep changes focused on the AIDX / WeBank executive brief system and avoid reintroducing generic presentation themes.

## Before You Change Templates

Read these files first:

- `SKILL.md`
- `assets/template-aidx.html`
- `references/themes-aidx.md`
- `references/layouts-aidx.md`
- `references/checklist.md`
- `scripts/validate-aidx-deck.mjs`

## Change Rules

- Keep AIDX as the primary brand and WeBank as endorsement.
- Keep the AIDX `.slide` + `.canvas-card` model.
- Preserve registered `S01-S22` layout structures.
- Do not add unregistered layout names unless you update `references/layouts-aidx.md` and `scripts/validate-aidx-deck.mjs` together.
- Do not use local machine paths, external private brand SVGs, emoji status icons, or ad hoc neon colors.
- If a local image appears in a deck, it must live under `images/` and include `data-image-slot`.
- If README visuals change, regenerate `assets/readme/aidx-cover.webp` and `assets/readme/aidx-executive-summary.webp`.

## Validation

Regenerate the showcase:

```bash
node scripts/build-aidx-examples.mjs
```

Validate the showcase:

```bash
node scripts/validate-aidx-deck.mjs examples/aidx-showcase.html
```

The validator includes stale legacy-reference checks. Run it before submitting changes.

## Pull Request Checklist

- [ ] AIDX showcase still builds.
- [ ] AIDX validator passes.
- [ ] README screenshots still match the current showcase.
- [ ] No stale legacy style references remain.
- [ ] Documentation and examples match the changed API, classes, and layout rules.
