# Codebase Structure

**Analysis Date:** 2026-06-10

## Directory Layout

```text
guizang-ppt-skill/
├── SKILL.md                         # Agent-facing skill workflow and trigger metadata
├── README.md                        # Chinese project overview, install, and usage guide
├── README.en.md                     # English project overview, install, and usage guide
├── CONTRIBUTING.md                  # Contribution guidance
├── SPONSORS.md                      # Sponsorship/support information
├── LICENSE                          # Project license
├── assets/                          # Runtime HTML templates, local JS dependency, image backgrounds
│   ├── template.html                # Style A electronic magazine deck template
│   ├── template-swiss.html          # Style B Swiss deck template
│   ├── template-aidx.html           # Style C AIDX deck template
│   ├── motion.min.js                # Local animation dependency used by templates
│   └── screenshot-backgrounds/      # Reusable screenshot framing backgrounds
├── references/                      # Layout, theme, checklist, prompt, and component contracts
│   ├── layouts.md                   # Style A layout skeletons and generation rules
│   ├── layouts-swiss.md             # Style B locked layout skeletons and generation rules
│   ├── layouts-aidx.md              # Style C locked layout skeletons and generation rules
│   ├── themes.md                    # Style A theme variable presets
│   ├── themes-swiss.md              # Style B theme variable presets
│   ├── themes-aidx.md               # Style C theme variable presets
│   ├── checklist.md                 # Cross-style generation and visual QA checklist
│   └── *.md                         # Prompt, component, map, screenshot, and lock references
├── scripts/                         # Node scripts for validation and example generation
│   ├── validate-swiss-deck.mjs      # Swiss locked-layout validator
│   ├── validate-aidx-deck.mjs       # AIDX locked-layout validator
│   └── build-aidx-examples.mjs      # AIDX showcase generator
├── examples/                        # Generated example decks and example docs
│   ├── aidx-style-c-showcase.html   # AIDX generated showcase deck
│   └── README.md                    # Example usage notes
└── .planning/codebase/              # GSD codebase mapping documents
```

## Directory Purposes

**Root:**
- Purpose: Package the skill and public documentation.
- Contains: Skill contract, README files, license, contribution docs, sponsorship docs, and top-level repository metadata.
- Key files: `SKILL.md`, `README.md`, `README.en.md`, `CONTRIBUTING.md`, `LICENSE`, `SPONSORS.md`

**`assets/`:**
- Purpose: Store all runtime assets required to create generated decks.
- Contains: Three deck templates, Motion One local script, and screenshot background image assets.
- Key files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `assets/motion.min.js`

**`assets/screenshot-backgrounds/`:**
- Purpose: Store reusable backgrounds for programmatic screenshot framing.
- Contains: Style-specific `.webp` background assets.
- Key files: `assets/screenshot-backgrounds/style-a/kraft-paper.webp`, `assets/screenshot-backgrounds/style-a/dune.webp`, `assets/screenshot-backgrounds/style-b/ikb-dot-gradient.webp`, `assets/screenshot-backgrounds/style-b/lemon-grid.webp`

**`references/`:**
- Purpose: Store the source-of-truth writing, layout, theme, validation, screenshot, and image-generation guidance consumed by agents.
- Contains: Layout skeletons, theme tokens, checklists, image prompt recipes, screenshot framing rules, Swiss map component guidance, and Swiss layout lock rules.
- Key files: `references/layouts.md`, `references/layouts-swiss.md`, `references/layouts-aidx.md`, `references/themes.md`, `references/themes-swiss.md`, `references/themes-aidx.md`, `references/checklist.md`, `references/swiss-layout-lock.md`

**`scripts/`:**
- Purpose: Store executable maintenance and validation scripts.
- Contains: Node `.mjs` scripts that validate finished decks and regenerate examples.
- Key files: `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`, `scripts/build-aidx-examples.mjs`

**`examples/`:**
- Purpose: Store generated decks that demonstrate correct usage.
- Contains: HTML showcase deck and documentation for examples.
- Key files: `examples/aidx-style-c-showcase.html`, `examples/README.md`

**`.planning/codebase/`:**
- Purpose: Store GSD architecture, structure, stack, testing, convention, and concern maps.
- Contains: Generated mapping documents consumed by GSD planning/execution commands.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`

**`.github/`:**
- Purpose: Store GitHub repository metadata and workflows if present.
- Contains: Repository automation/configuration files.
- Key files: Files under `.github/`

**`.serena/`:**
- Purpose: Store local agent/indexing cache data.
- Contains: Cache and memory files for local tooling.
- Key files: `.serena/cache/`, `.serena/memories/`

## Key File Locations

**Entry Points:**
- `SKILL.md`: Primary skill entry point and orchestration contract for agents.
- `assets/template.html`: Style A deck template copied into generated project decks.
- `assets/template-swiss.html`: Style B Swiss deck template copied into generated project decks.
- `assets/template-aidx.html`: Style C AIDX deck template copied into generated project decks.
- `scripts/validate-swiss-deck.mjs`: CLI validator for Swiss generated decks.
- `scripts/validate-aidx-deck.mjs`: CLI validator for AIDX generated decks.
- `scripts/build-aidx-examples.mjs`: CLI generator for the AIDX showcase example.

**Configuration:**
- `SKILL.md`: Skill metadata front matter (`name`, `description`) and workflow rules.
- `.gitignore`: Git ignore rules.
- `references/themes.md`: Style A CSS variable theme presets.
- `references/themes-swiss.md`: Style B CSS variable theme presets.
- `references/themes-aidx.md`: Style C CSS variable theme presets.

**Core Logic:**
- `assets/template.html`: Style A browser runtime logic, deck navigation, overview mode, WebGL backgrounds, and animations.
- `assets/template-swiss.html`: Style B browser runtime logic, Swiss canvas-card model, grid/ASCII canvases, navigation, overview mode, and animation recipes.
- `assets/template-aidx.html`: Style C browser runtime logic, fixed-stage scaling, signal canvas, navigation, overview mode, and AIDX brand shell.
- `references/layouts.md`: Style A slide skeleton source.
- `references/layouts-swiss.md`: Style B slide skeleton source.
- `references/layouts-aidx.md`: Style C slide skeleton source.
- `references/checklist.md`: Manual QA and generation safety rules.

**Validation:**
- `scripts/validate-swiss-deck.mjs`: Validates Swiss generated HTML decks.
- `scripts/validate-aidx-deck.mjs`: Validates AIDX generated HTML decks.
- `references/swiss-layout-lock.md`: Defines Swiss registered layout constraints consumed by humans and mirrored by validator rules.
- `references/checklist.md`: Defines manual QA checks for all styles.

**Examples:**
- `examples/aidx-style-c-showcase.html`: Complete Style C example output.
- `examples/README.md`: Example documentation.

**Documentation:**
- `README.md`: Chinese overview, installation, and usage.
- `README.en.md`: English overview, installation, and usage.
- `CONTRIBUTING.md`: Contribution workflow.
- `SPONSORS.md`: Sponsor documentation.

## Naming Conventions

**Files:**
- Root skill file uses uppercase `SKILL.md`.
- Public docs use uppercase conventional names: `README.md`, `README.en.md`, `CONTRIBUTING.md`, `SPONSORS.md`, `LICENSE`.
- Templates use `template[-style].html`: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`.
- References use lower-kebab-case Markdown: `references/layouts-swiss.md`, `references/screenshot-framing.md`, `references/swiss-map-component.md`.
- Scripts use lower-kebab-case ESM filenames with `.mjs`: `scripts/validate-swiss-deck.mjs`, `scripts/build-aidx-examples.mjs`.
- Example decks use lower-kebab-case `.html`: `examples/aidx-style-c-showcase.html`.
- Screenshot background assets use semantic lower-kebab-case `.webp`: `assets/screenshot-backgrounds/style-b/ikb-dot-gradient.webp`.

**Directories:**
- Top-level functional directories use lowercase plural nouns: `assets/`, `references/`, `scripts/`, `examples/`.
- Screenshot background variants use style buckets: `assets/screenshot-backgrounds/style-a/`, `assets/screenshot-backgrounds/style-b/`.
- GSD maps live under `.planning/codebase/`.

**Slide Layout IDs:**
- Style A uses descriptive layout sections in `references/layouts.md`; it does not require `data-layout`.
- Style B uses Swiss locked IDs `S01` through `S22`, plus `SWISS-COVER-ASCII` and `SWISS-CLOSING-ASCII` in the validator.
- Style C uses AIDX locked IDs `AIDX-01` through `AIDX-10`.

**CSS Classes:**
- Shared conceptual class names can differ by style. Treat `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html` as isolated class namespaces.
- Style B page surfaces use `.canvas-card` as the primary slide content shell.
- Style C page surfaces use `.stage` as the fixed 1600x900 content shell.
- Local image slots use `data-image-slot` attributes with style-specific names such as `s22-hero-21x9` or `aidx-evidence-16x10`.

## Where to Add New Code

**New Style Family:**
- Primary code: Add a new template under `assets/template-{style}.html`.
- Layout docs: Add matching layout references under `references/layouts-{style}.md`.
- Theme docs: Add matching theme references under `references/themes-{style}.md`.
- Workflow: Update `SKILL.md` style selection, template copy instructions, and validation/self-check flow.
- Tests/validation: Add a validator under `scripts/validate-{style}-deck.mjs` if the style has locked layouts.

**New Style A Layout:**
- Primary code: Add the CSS/runtime support to `assets/template.html` only if existing classes cannot express the layout.
- Layout skeleton: Add the pasteable `<section>` skeleton to `references/layouts.md`.
- QA rules: Add relevant checks to `references/checklist.md`.

**New Swiss Layout or Swiss Component:**
- Primary code: Prefer adapting an existing `S01`-`S22` skeleton in `references/layouts-swiss.md`.
- Layout registry: Update `references/swiss-layout-lock.md` when adding or changing registered Swiss constraints.
- Template support: Add necessary classes to `assets/template-swiss.html`.
- Validator support: Update `scripts/validate-swiss-deck.mjs` if the layout introduces new required attributes or forbidden patterns.
- Component docs: Put reusable advanced patterns in `references/`, following `references/swiss-map-component.md`.

**New AIDX Layout:**
- Primary code: Add CSS support to `assets/template-aidx.html`.
- Layout skeleton: Add or update the registered skeleton in `references/layouts-aidx.md`.
- Validator support: Update `scripts/validate-aidx-deck.mjs` if new layout IDs, image slots, or deck rhythm rules are required.
- Example output: Update `scripts/build-aidx-examples.mjs` and regenerate `examples/aidx-style-c-showcase.html`.

**New Validator:**
- Implementation: Add a Node ESM script under `scripts/`.
- Dependencies: Prefer Node built-ins such as `node:fs`, `node:path`, and `node:url`; there is no package manifest in this repo.
- Output pattern: Accumulate warnings and errors, print all findings, exit `1` on errors and `2` on incorrect CLI usage, following `scripts/validate-swiss-deck.mjs` and `scripts/validate-aidx-deck.mjs`.

**New Example Deck:**
- Implementation: Add generated HTML under `examples/`.
- Documentation: Update `examples/README.md`.
- Generator: If the example is derived from references, add or extend a script under `scripts/` so the example is reproducible.

**New Screenshot Backgrounds:**
- Assets: Add `.webp` files under `assets/screenshot-backgrounds/style-a/` or `assets/screenshot-backgrounds/style-b/`.
- Guidance: Update `references/screenshot-framing.md` with usage, ratio, and placement guidance.

**Utilities:**
- Shared helper scripts: Add to `scripts/`.
- Shared generation guidance: Add to `references/`.
- Browser runtime helpers: Keep inside the relevant template in `assets/` so generated decks remain self-contained.

## Special Directories

**`assets/`:**
- Purpose: Runtime source assets for generated decks.
- Generated: No
- Committed: Yes

**`assets/screenshot-backgrounds/`:**
- Purpose: Static image assets for screenshot framing.
- Generated: No
- Committed: Yes

**`references/`:**
- Purpose: Source-of-truth guidance and layout contracts.
- Generated: No
- Committed: Yes

**`scripts/`:**
- Purpose: Local executable validation and generation tooling.
- Generated: No
- Committed: Yes

**`examples/`:**
- Purpose: Demonstration outputs.
- Generated: Partially; `examples/aidx-style-c-showcase.html` is generated by `scripts/build-aidx-examples.mjs`.
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning and codebase intelligence documents.
- Generated: Yes
- Committed: Project-dependent

**`.serena/`:**
- Purpose: Local agent cache and memory data.
- Generated: Yes
- Committed: Project-dependent

**`.github/`:**
- Purpose: GitHub repository automation/configuration.
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-06-10*
