# Coding Conventions

**Analysis Date:** 2026-06-10

## Naming Patterns

**Files:**
- Use lowercase kebab-case for maintained scripts and reference documents: `scripts/validate-aidx-deck.mjs`, `scripts/validate-swiss-deck.mjs`, `scripts/build-aidx-examples.mjs`, `references/layouts-aidx.md`, `references/swiss-layout-lock.md`.
- Use style-specific suffixes for templates and references: `assets/template.html` for Style A, `assets/template-swiss.html` for Style B, `assets/template-aidx.html` for Style C, with matching docs in `references/themes-swiss.md`, `references/layouts-swiss.md`, `references/themes-aidx.md`, and `references/layouts-aidx.md`.
- Use generated example names that include the style and purpose: `examples/aidx-style-c-showcase.html`.

**Functions:**
- Use camelCase for JavaScript helper functions and runtime hooks: `resetAnims`, `revealStatic`, `window.__playSlide`, and `window.__pipeAdvance` in `assets/template.html` and `assets/template-swiss.html`.
- Keep Node scripts mostly top-level and data-driven. Add named helper functions only when logic repeats or the section becomes hard to scan, following the direct style in `scripts/validate-aidx-deck.mjs` and `scripts/validate-swiss-deck.mjs`.

**Variables:**
- Use camelCase for local values: `htmlForSlides`, `allowedLayouts`, `layoutSeq`, `localImages`, `smallFontMatches`, `outputPath`.
- Use all caps for animation constants in browser runtime code: `EASE`, `EASE_PROD`, `EASE_ENTRY_EXP` in `assets/template.html` and `assets/template-swiss.html`.
- Prefer semantic names over abbreviations in Node scripts. Short names such as `idx`, `m`, `dx`, `dy`, `tx`, and `ty` are acceptable inside tight event or regex callbacks in `assets/template.html` and `scripts/validate-swiss-deck.mjs`.

**Types:**
- Not applicable. The repository uses JavaScript ESM scripts and HTML/CSS templates, not TypeScript.

## Code Style

**Formatting:**
- No formatter config is present. Preserve the local style of each file.
- JavaScript scripts in `scripts/*.mjs` use 2-space indentation, semicolons, single quotes, trailing commas in multiline calls/arrays, and concise top-level control flow.
- Template runtime code in `assets/template.html` and `assets/template-swiss.html` is more compact and uses inline arrow callbacks such as `el=>{...}`; when editing a template, match the surrounding style instead of reformatting large script blocks.
- Markdown references use descriptive headings, tables, and fenced code blocks for layout contracts, as in `references/layouts-aidx.md` and `references/swiss-layout-lock.md`.

**Linting:**
- No ESLint, Prettier, Biome, or package manifest lint command is detected.
- Treat the validators as the primary style guards for generated decks: `scripts/validate-aidx-deck.mjs` enforces AIDX constraints and `scripts/validate-swiss-deck.mjs` enforces Swiss layout constraints.

## Import Organization

**Order:**
1. Node built-in imports at the top of `.mjs` files, using the `node:` prefix: `node:fs`, `node:path`, `node:url`.
2. Constants derived from process args or repo paths: `file`, `allowExperimental`, `repoRoot`, `templatePath`, `layoutsPath`, `outputPath`.
3. Parsed input and mutable validation state: `html`, `htmlForSlides`, `errors`, `warnings`, `slides`.

**Path Aliases:**
- No path aliases are configured.
- Use relative filesystem paths resolved from the script location when scripts need repo files. `scripts/build-aidx-examples.mjs` derives `repoRoot` from `import.meta.url` and resolves `assets/template-aidx.html`, `references/layouts-aidx.md`, and `examples/aidx-style-c-showcase.html`.

## Error Handling

**Patterns:**
- CLI usage errors print to stderr and exit with status `2`, as in `scripts/validate-aidx-deck.mjs` and `scripts/validate-swiss-deck.mjs`.
- Validation scripts collect all `errors` and `warnings` before reporting. Use this pattern for new validators so users get a complete correction list in one run.
- Validation failures print a clear heading, print one bullet per issue, and exit with status `1`: `AIDX deck validation failed:` in `scripts/validate-aidx-deck.mjs` and `Swiss deck validation failed:` in `scripts/validate-swiss-deck.mjs`.
- Build-time missing required content should throw an `Error` with the missing contract named, as in `scripts/build-aidx-examples.mjs` for missing layouts and unresolved placeholders.
- Browser template fallbacks should preserve readability. `assets/template.html` and `assets/template-swiss.html` catch local and CDN Motion import failures, warn once, and reveal `[data-anim]` content statically.

## Logging

**Framework:** console

**Patterns:**
- Use `console.error` for usage errors and validation failures in CLI scripts.
- Use `console.warn` for non-blocking issues and browser fallback diagnostics.
- Use `console.log` only for successful terminal summaries such as `AIDX deck validation passed`, `Swiss deck validation passed`, and `Wrote ${outputPath}`.
- Avoid noisy logs in templates; runtime logs should explain degraded behavior, not normal navigation.

## Comments

**When to Comment:**
- Use comments to mark large template subsystems or explain fallback behavior. The Motion loader in `assets/template.html` uses a block comment to document local-first loading, CDN fallback, runtime hooks, and static fallback behavior.
- Keep validation logic self-documenting through error text and variable names. `scripts/validate-aidx-deck.mjs` and `scripts/validate-swiss-deck.mjs` rely mostly on readable rule checks instead of inline comments.
- In reference docs, encode rules as explicit headings and tables, not hidden comments. `references/layouts-aidx.md` and `references/swiss-layout-lock.md` are the source of truth for deck-generation constraints.

**JSDoc/TSDoc:**
- Not used. Do not introduce JSDoc unless adding exported reusable APIs; current scripts are CLI utilities and templates.

## Function Design

**Size:** Keep validator scripts as linear passes over parsed slides. Add small helpers for repeated parsing only after multiple validators need the same behavior.

**Parameters:** Prefer direct local constants and explicit file arguments from `process.argv`. Current scripts accept the deck path as `process.argv[2]`; `scripts/validate-swiss-deck.mjs` also accepts `--allow-experimental`.

**Return Values:** CLI scripts communicate success/failure through exit codes and terminal output, not returned objects. Browser runtime functions mutate DOM state and expose only the minimal global hooks needed by navigation.

## Module Design

**Exports:** Scripts do not export functions. They execute as CLIs via `#!/usr/bin/env node` and top-level ESM.

**Barrel Files:** Not used.

**Deck Contract Modules:**
- Treat `SKILL.md` as the workflow and behavioral source for agents using the skill.
- Treat `references/layouts-aidx.md`, `references/layouts-swiss.md`, `references/layouts.md`, and `references/swiss-layout-lock.md` as prescriptive layout contracts.
- Treat `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html` as golden runtime/template files. Preserve navigation, ESC overview, low-power mode, image slot conventions, and Motion fallback behavior when editing them.

---

*Convention analysis: 2026-06-10*
