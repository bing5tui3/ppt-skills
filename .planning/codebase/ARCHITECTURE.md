<!-- refreshed: 2026-06-10 -->
# Architecture

**Analysis Date:** 2026-06-10

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Agent Skill Interface                     │
│                         `SKILL.md`                           │
├──────────────────┬──────────────────┬───────────────────────┤
│   Style A        │   Style B        │    Style C            │
│ `assets/template.html` │ `assets/template-swiss.html` │ `assets/template-aidx.html` │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Layout and Theme Contracts                  │
│ `references/layouts.md`, `references/layouts-swiss.md`,      │
│ `references/layouts-aidx.md`, `references/themes*.md`        │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Generated Single-File HTML Decks and Validation             │
│  `index.html` outputs, `scripts/validate-*.mjs`, `examples/` │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Skill workflow | Defines trigger terms, clarification workflow, style selection, template copy steps, image conventions, validation steps, and delivery rules for agents. | `SKILL.md` |
| Style A template | Provides the electronic magazine HTML deck shell: CSS tokens, slide layout helpers, dual WebGL backgrounds, slide navigation, overview mode, and Motion One animation hooks. | `assets/template.html` |
| Style B template | Provides the Swiss Style HTML deck shell: Carbon-like spacing tokens, locked slide shell, canvas-card model, WebGL grid, ASCII canvas support, navigation, overview, and layout-specific animation recipes. | `assets/template-swiss.html` |
| Style C template | Provides the AIDX executive brief shell: fixed 1600x900 stage, AIDX brand tokens, scaled stage runtime, navigation, overview, signal canvas, and executive slide primitives. | `assets/template-aidx.html` |
| Style A layouts | Supplies copy-paste slide skeletons, theme rhythm rules, image ratio rules, and Motion recipe guidance for Style A decks. | `references/layouts.md` |
| Style B layouts | Supplies locked Swiss layout skeletons and prescriptive constraints for `S01` through `S22`. | `references/layouts-swiss.md` |
| Style C layouts | Supplies locked AIDX layout skeletons and constraints for `AIDX-01` through `AIDX-10`. | `references/layouts-aidx.md` |
| Swiss validator | Enforces `data-layout`, registered layout names, local image slot metadata, forbidden SVG text, and several Swiss layout safety rules. | `scripts/validate-swiss-deck.mjs` |
| AIDX validator | Enforces `data-layout`, `.stage`, local path safety, image slot metadata, emoji/color/font constraints, and executive deck rhythm checks. | `scripts/validate-aidx-deck.mjs` |
| AIDX example generator | Builds the committed AIDX showcase by extracting registered layouts from `references/layouts-aidx.md` and inserting them into `assets/template-aidx.html`. | `scripts/build-aidx-examples.mjs` |
| Examples | Stores generated sample decks that demonstrate registered layout usage. | `examples/aidx-style-c-showcase.html`, `examples/README.md` |
| Image background assets | Stores reusable screenshot framing backgrounds for Style A and Style B image workflows. | `assets/screenshot-backgrounds/` |

## Pattern Overview

**Overall:** Static skill package with template-driven single-file HTML generation.

**Key Characteristics:**
- `SKILL.md` is the orchestration layer. It tells agents when to use the skill, which questions to ask, which template to copy, which reference files to load, and which validation steps to run.
- Runtime behavior lives inside the HTML templates. Generated decks are self-contained HTML files with inline CSS and JavaScript; no build system or app server is required.
- Layout contracts are documented as pasteable HTML skeletons in `references/`. Style B and Style C use locked layout IDs enforced by Node validation scripts.
- Style systems are separate. Do not mix classes between `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html`; same class names can have different meanings.

## Layers

**Skill Orchestration Layer:**
- Purpose: Select style, collect requirements, define generation workflow, and point agents to the correct template/reference files.
- Location: `SKILL.md`
- Contains: Trigger metadata, style selection matrix, clarification checklist, image generation rules, screenshot handling rules, template copy commands, and self-check flow.
- Depends on: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `references/*.md`, `scripts/*.mjs`
- Used by: Codex, Claude Code, Cursor, or other local agents that load the skill.

**Template Runtime Layer:**
- Purpose: Provide ready-to-run browser deck shells for generated slides.
- Location: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`
- Contains: Inline CSS design systems, slide container markup, navigation dots, keyboard/wheel/touch controls, overview mode, low-power mode, canvas/WebGL effects, and animation orchestration.
- Depends on: Browser DOM APIs, Canvas/WebGL APIs, Google Fonts, and local `assets/motion.min.js` fallback/loader patterns.
- Used by: Generated `index.html` deck files and example decks.

**Layout Contract Layer:**
- Purpose: Define allowed slide skeletons and per-style constraints.
- Location: `references/layouts.md`, `references/layouts-swiss.md`, `references/layouts-aidx.md`, `references/swiss-layout-lock.md`, `references/checklist.md`
- Contains: Pasteable `<section class="slide ...">` blocks, required class structures, image slot rules, title alignment rules, theme rhythm rules, and validation checklist items.
- Depends on: CSS classes and runtime assumptions in the matching template.
- Used by: Agents generating deck slide content and validators checking finished decks.

**Theme and Asset Guidance Layer:**
- Purpose: Provide reusable design tokens, image prompt patterns, screenshot framing backgrounds, and component patterns.
- Location: `references/themes.md`, `references/themes-swiss.md`, `references/themes-aidx.md`, `references/image-prompts.md`, `references/screenshot-framing.md`, `references/components.md`, `assets/screenshot-backgrounds/`
- Contains: Theme variable blocks, prompt recipes, screenshot canvas framing rules, and reusable component guidance.
- Depends on: Matching template CSS variables and image slot ratios.
- Used by: Deck generation and optional image/screenshot workflows.

**Validation and Generation Scripts Layer:**
- Purpose: Automate safety checks and maintain sample outputs.
- Location: `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`, `scripts/build-aidx-examples.mjs`
- Contains: Regex-based HTML extraction, `data-layout` validation, AIDX `.stage` enforcement, image slot checks, style-specific anti-pattern checks, and AIDX showcase generation.
- Depends on: Node.js built-ins (`node:fs`, `node:path`, `node:url`) and the structural conventions in `assets/` and `references/`.
- Used by: Agents and maintainers after generating or changing decks.

**Example Output Layer:**
- Purpose: Demonstrate correct generated artifacts.
- Location: `examples/aidx-style-c-showcase.html`, `examples/README.md`
- Contains: A complete AIDX deck generated from `references/layouts-aidx.md` and `assets/template-aidx.html`.
- Depends on: `scripts/build-aidx-examples.mjs` for regeneration.
- Used by: Maintainers and agents as a concrete reference.

## Data Flow

### Primary Deck Generation Path

1. Agent loads the skill and chooses a style based on user intent (`SKILL.md:1`).
2. Agent asks only the needed clarification questions and selects Style A, Style B, or Style C (`SKILL.md:20`).
3. Agent copies the matching template into the target deck path (`SKILL.md:148`).
4. Agent reads the matching layout and theme references before writing slide sections (`references/layouts.md:1`, `references/layouts-swiss.md:1`, `references/layouts-aidx.md:1`).
5. Agent replaces `<!-- SLIDES_HERE -->` or the equivalent marker with generated `<section class="slide ...">` blocks (`assets/template.html:487`, `assets/template-swiss.html:1226`, `assets/template-aidx.html:201`).
6. Browser runtime discovers `.slide` elements, builds navigation, and transforms `#deck` on navigation events (`assets/template.html:623`, `assets/template-swiss.html:1486`, `assets/template-aidx.html:213`).
7. Agent runs the relevant validator for Swiss or AIDX decks (`scripts/validate-swiss-deck.mjs:1`, `scripts/validate-aidx-deck.mjs:1`).

### Style A Runtime Flow

1. The deck shell creates two fixed background canvases, `#bg-dark` and `#bg-light` (`assets/template.html:475`).
2. Slide theme classes (`light`, `dark`, `hero light`, `hero dark`) drive body-level background switching (`references/layouts.md:121`).
3. Keyboard, wheel, touch, and nav dot events call `go(n)` to translate `#deck` (`assets/template.html:638`).
4. Animation setup reveals elements with `data-anim`; static fallback keeps content visible if animation loading fails (`assets/template.html:762`).

### Style B Runtime Flow

1. The deck runs in `body.canvas-mode` with full-viewport `.canvas-card` slide surfaces (`assets/template-swiss.html:642`).
2. Locked slide sections include `data-layout="Sxx"` and optional `data-animate` recipes (`references/layouts-swiss.md:15`).
3. Navigation, overview mode, and low-power mode are wired in the template runtime (`assets/template-swiss.html:1486`).
4. Layout-specific animation recipes run based on the slide recipe and current index (`assets/template-swiss.html:1629`).
5. ASCII canvas backgrounds are discovered and animated independently for slides that include `canvas.ascii-bg` (`assets/template-swiss.html:2320`).

### Style C Runtime Flow

1. Each slide uses `<section class="slide ..."><div class="stage">...</div></section>` (`references/layouts-aidx.md:14`).
2. `fitStage()` scales the fixed 1600x900 `.stage` to the current viewport (`assets/template-aidx.html:222`).
3. `setTheme()` updates body-level nav/theme state from the current slide (`assets/template-aidx.html:227`).
4. Navigation, overview, keyboard, wheel, and touch handlers call `go(index)` (`assets/template-aidx.html:252`).
5. The signal canvas starts/stops with low-power changes (`assets/template-aidx.html:325`).

### AIDX Example Regeneration Flow

1. `scripts/build-aidx-examples.mjs` reads `assets/template-aidx.html` and `references/layouts-aidx.md` (`scripts/build-aidx-examples.mjs:7`).
2. It extracts `<section class="slide...">` blocks and indexes them by `data-layout` (`scripts/build-aidx-examples.mjs:14`).
3. It orders layouts `AIDX-01` through `AIDX-10` and replaces placeholders with sample content (`scripts/build-aidx-examples.mjs:11`).
4. It replaces the template slide placeholder and writes `examples/aidx-style-c-showcase.html` (`scripts/build-aidx-examples.mjs:133`).

**State Management:**
- Generated decks keep slide index in local JavaScript variables such as `current` or `idx` inside the template runtime (`assets/template.html:623`, `assets/template-swiss.html:1486`, `assets/template-aidx.html:217`).
- Low-power mode is global body state (`body.low-power`) and templates expose style-specific low-power events (`ppt-low-power-change`, `swiss-low-power-change`, `aidx-low-power-change`) (`assets/template.html:620`, `assets/template-swiss.html:1483`, `assets/template-aidx.html:395`).
- AIDX responsive scale is stored in CSS variable `--deck-scale` (`assets/template-aidx.html:40`, `assets/template-aidx.html:222`).

## Key Abstractions

**Skill Contract:**
- Purpose: Defines how an agent should transform a user request into a finished deck.
- Examples: `SKILL.md`
- Pattern: Progressive workflow document with explicit style selection, required questions, copy steps, references, and validation.

**HTML Deck Template:**
- Purpose: Provides a complete browser runtime and visual system.
- Examples: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`
- Pattern: Single HTML file with inline CSS and inline JavaScript. Generated content is inserted at a slide placeholder.

**Slide Section:**
- Purpose: Represents one page in the horizontal deck.
- Examples: `references/layouts.md`, `references/layouts-swiss.md`, `references/layouts-aidx.md`
- Pattern: `<section class="slide ...">...</section>`; Style B and C require `data-layout`.

**Locked Layout ID:**
- Purpose: Makes generated slide structure checkable.
- Examples: `data-layout="S01"` in `references/layouts-swiss.md`, `data-layout="AIDX-01"` in `references/layouts-aidx.md`
- Pattern: Registry plus validator. Swiss uses `S01`-`S22`; AIDX uses `AIDX-01`-`AIDX-10`.

**Image Slot:**
- Purpose: Binds local images to intended layout ratios and validator rules.
- Examples: `data-image-slot="s22-hero-21x9"` in Swiss rules, `data-image-slot="aidx-evidence-16x10"` in AIDX rules.
- Pattern: Attribute on image or figure elements, required when using `images/...` sources.

**Low-Power Mode:**
- Purpose: Disable expensive animation/canvas loops while preserving readable slides.
- Examples: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`
- Pattern: Toggle `body.low-power`, stop requestAnimationFrame loops, dispatch a style-specific event, keep content visible.

## Entry Points

**Skill Entry Point:**
- Location: `SKILL.md`
- Triggers: User asks for magazine-style PPT, Swiss Style PPT, AIDX executive brief, horizontal swipe deck, generated cover, or screenshot redesign.
- Responsibilities: Route to a style, ask clarification questions, copy a template, use references, validate, and preview.

**Style A Template Entry Point:**
- Location: `assets/template.html`
- Triggers: Agent copies it to a target deck `index.html`.
- Responsibilities: Render Style A slides, background canvases, navigation, overview, and animations.

**Style B Template Entry Point:**
- Location: `assets/template-swiss.html`
- Triggers: Agent copies it to a target deck `index.html`.
- Responsibilities: Render Swiss locked-layout decks with canvas-card pages, grid/ASCII backgrounds, navigation, overview, low-power mode, and animation recipes.

**Style C Template Entry Point:**
- Location: `assets/template-aidx.html`
- Triggers: Agent copies it to a target deck `index.html` or `scripts/build-aidx-examples.mjs` uses it for the showcase.
- Responsibilities: Render AIDX executive decks with fixed-stage scaling, brand chrome, navigation, overview, and signal canvas.

**Swiss Validator Entry Point:**
- Location: `scripts/validate-swiss-deck.mjs`
- Triggers: `node scripts/validate-swiss-deck.mjs <index.html> [--allow-experimental]`
- Responsibilities: Validate Swiss slide layout IDs, experimental layout use, title alignment risks, SVG text, image slots, and S22/S15/S16 image constraints.

**AIDX Validator Entry Point:**
- Location: `scripts/validate-aidx-deck.mjs`
- Triggers: `node scripts/validate-aidx-deck.mjs <index.html>`
- Responsibilities: Validate AIDX layout IDs, `.stage` presence, local path leaks, brand SVG references, image slots, emoji, ad hoc colors, font sizing, and required deck rhythm.

**AIDX Showcase Builder Entry Point:**
- Location: `scripts/build-aidx-examples.mjs`
- Triggers: `node scripts/build-aidx-examples.mjs`
- Responsibilities: Generate `examples/aidx-style-c-showcase.html` from registered AIDX layouts.

## Architectural Constraints

- **Threading:** Browser runtime is single-threaded JavaScript with requestAnimationFrame loops for WebGL/canvas effects in `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html`.
- **Global state:** Templates use module/global variables and body classes for current slide, low-power mode, theme state, and motion readiness (`assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`).
- **Circular imports:** Not applicable. The repository has no module graph for application code; scripts use direct Node built-in imports only.
- **Single-file delivery:** Generated decks are expected to be standalone HTML. AIDX validator rejects local machine paths and external brand SVG references (`scripts/validate-aidx-deck.mjs:43`).
- **Style isolation:** A deck uses one template and one reference family. Do not combine Style A classes with Style B or Style C slide skeletons (`references/layouts-swiss.md:3`).
- **Locked-layout enforcement:** Style B and Style C generated slides must include registered `data-layout` values (`scripts/validate-swiss-deck.mjs:31`, `scripts/validate-aidx-deck.mjs:34`).
- **Secret handling:** Environment files are not part of the architecture. No `.env` contents are required or read.

## Anti-Patterns

### Mixing Style Families

**What happens:** A slide from `references/layouts-swiss.md` is pasted into `assets/template.html`, or AIDX `.stage` content is pasted into a Swiss deck.
**Why it's wrong:** Class names overlap while semantics differ; typography, spacing, runtime behavior, and validators assume one template family.
**Do this instead:** Choose one template from `assets/template.html`, `assets/template-swiss.html`, or `assets/template-aidx.html`, then use only its matching references: `references/layouts.md`, `references/layouts-swiss.md`, or `references/layouts-aidx.md`.

### Inventing Locked Layout Names

**What happens:** Swiss decks add `data-layout="P23"` or custom layout names, or AIDX decks add names outside `AIDX-01` through `AIDX-10`.
**Why it's wrong:** Validators reject unregistered layouts, and downstream agents rely on the registry to know which skeleton is intended.
**Do this instead:** Use Swiss `S01`-`S22` from `references/layouts-swiss.md` and `references/swiss-layout-lock.md`, or AIDX `AIDX-01`-`AIDX-10` from `references/layouts-aidx.md`.

### Missing Image Slot Metadata

**What happens:** Generated decks reference `images/...` without `data-image-slot`.
**Why it's wrong:** Validators cannot verify the image belongs to a known ratio/slot, and future agents cannot safely replace assets.
**Do this instead:** Add `data-image-slot` to local images or image figures according to the relevant layout reference, then run `scripts/validate-swiss-deck.mjs` or `scripts/validate-aidx-deck.mjs`.

### Local Machine Paths in Generated Decks

**What happens:** A generated deck references `/Users/...`, `file://...`, or external brand SVG files.
**Why it's wrong:** Single-file decks become non-portable and can leak local paths.
**Do this instead:** Use relative `images/...` paths for user assets, inline required brand SVG geometry, and validate with `scripts/validate-aidx-deck.mjs`.

## Error Handling

**Strategy:** Validation scripts accumulate errors and warnings, print all findings, and exit with nonzero status on errors.

**Patterns:**
- Missing CLI file argument prints usage and exits with status `2` in `scripts/validate-swiss-deck.mjs` and `scripts/validate-aidx-deck.mjs`.
- Validation errors are accumulated in arrays, printed as bullet-style console output, and followed by `process.exit(1)` (`scripts/validate-swiss-deck.mjs:90`, `scripts/validate-aidx-deck.mjs:105`).
- Warnings do not fail validation unless the script also records errors (`scripts/validate-swiss-deck.mjs:85`, `scripts/validate-aidx-deck.mjs:100`).
- `scripts/build-aidx-examples.mjs` throws when required layouts or placeholders are missing, preventing incomplete example generation.

## Cross-Cutting Concerns

**Logging:** Node scripts use `console.log`, `console.warn`, and `console.error` directly in `scripts/*.mjs`. Browser templates do not expose structured logging.

**Validation:** Swiss and AIDX decks use dedicated validators in `scripts/`. Style A relies on `references/checklist.md` and visual/browser review rather than a dedicated validator.

**Authentication:** Not applicable. This repository contains static assets, references, and local scripts only.

**Accessibility:** Templates include ARIA labels for navigation/overview and hidden decorative canvases such as `aria-hidden="true"` in `assets/template-aidx.html`. Generated slide content must preserve readable text and avoid putting labels only inside SVG for Swiss decks.

**Performance:** Templates provide low-power modes that stop canvas/WebGL/animation loops. Preserve `body.low-power` handling when editing `assets/template.html`, `assets/template-swiss.html`, or `assets/template-aidx.html`.

---

*Architecture analysis: 2026-06-10*
