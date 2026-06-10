# Codebase Concerns

**Analysis Date:** 2026-06-10

## Tech Debt

**No package manifest or repeatable task runner:**
- Issue: The repo has runnable Node scripts but no `package.json`, lockfile, `npm` scripts, pinned Node version, or dependency metadata. Validation commands are documented manually in `README.md`, `README.en.md`, `CONTRIBUTING.md`, `references/checklist.md`, and `examples/README.md`.
- Files: `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`, `scripts/build-aidx-examples.mjs`, `README.md`, `README.en.md`, `CONTRIBUTING.md`, `examples/README.md`
- Impact: Contributors must discover and run raw `node scripts/...` commands manually. CI, local setup, and future automation cannot rely on a single standard command.
- Fix approach: Add a minimal `package.json` with `validate:swiss`, `validate:aidx`, `build:aidx-example`, and `test` scripts. Add a Node version declaration such as `.nvmrc` or `engines.node`, then update `README.md`, `README.en.md`, and `CONTRIBUTING.md` to point at the scripts.

**Template, layout docs, and validators must be edited in lockstep:**
- Issue: The documented workflow requires synchronized edits across template HTML, layout reference markdown, layout lock docs, and validator scripts. The repo does not enforce this coupling.
- Files: `README.md`, `README.en.md`, `assets/template-swiss.html`, `references/layouts-swiss.md`, `references/swiss-layout-lock.md`, `scripts/validate-swiss-deck.mjs`, `assets/template-aidx.html`, `references/layouts-aidx.md`, `scripts/validate-aidx-deck.mjs`
- Impact: A layout can be added to docs without CSS support, or CSS can be added without validator support. Generated decks then fail visually even if the touched file looks correct in isolation.
- Fix approach: Add consistency checks that compare registered `data-layout` values and required CSS classes across `references/layouts-swiss.md`, `references/swiss-layout-lock.md`, `assets/template-swiss.html`, and `scripts/validate-swiss-deck.mjs`; do the same for `references/layouts-aidx.md`, `assets/template-aidx.html`, and `scripts/validate-aidx-deck.mjs`.

**Large monolithic HTML templates:**
- Issue: Runtime JavaScript, CSS, WebGL/canvas code, example slide placeholders, animation recipes, and documentation comments live in single HTML files. `assets/template-swiss.html` is 2,419 lines; `assets/template.html` is 858 lines; `assets/template-aidx.html` is 400 lines.
- Files: `assets/template-swiss.html`, `assets/template.html`, `assets/template-aidx.html`
- Impact: Small runtime fixes are hard to isolate and review. Visual regressions can be introduced by unrelated edits because navigation, rendering, low-power mode, animation recipes, and slide skeletons share one file.
- Fix approach: Keep the distributed output as single-file HTML, but author from smaller source partials or at least split documented sections in a build script. Validate the generated single-file templates after assembly.

**AIDX example generator uses broad text replacement:**
- Issue: `scripts/build-aidx-examples.mjs` transforms `references/layouts-aidx.md` by applying many `replaceAll` calls against prose and markup strings.
- Files: `scripts/build-aidx-examples.mjs`, `references/layouts-aidx.md`, `examples/aidx-style-c-showcase.html`
- Impact: Minor copy edits in `references/layouts-aidx.md` can silently leave sample text unresolved or produce partially updated examples. The final placeholder check only catches `[必填]` and abbreviated stage content.
- Fix approach: Move AIDX sample content into structured data keyed by `data-layout`, or use explicit placeholder tokens in `references/layouts-aidx.md` instead of replacing natural-language strings.

## Known Bugs

**AIDX initial slide query parameter is ignored:**
- Symptoms: `assets/template-aidx.html` always opens slide 1 because initialization calls `go(0)` and does not read `?slide=N`. Style A and Style B templates support `?slide=N`.
- Files: `assets/template-aidx.html`, `assets/template.html`, `assets/template-swiss.html`, `examples/aidx-style-c-showcase.html`
- Trigger: Open an AIDX deck with a URL such as `index.html?slide=5`; the deck remains on slide 1.
- Workaround: Navigate manually with keyboard, wheel, touch, or nav buttons.

**AIDX keyboard shortcut can throw when the key value is not a printable string:**
- Symptoms: The AIDX keydown handler calls `e.key.toLowerCase()` without guarding `e.key`. Style A and Style B guard `e.key` before lowercasing.
- Files: `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`, `assets/template.html`, `assets/template-swiss.html`
- Trigger: Browser or assistive technology emits a keydown event where `e.key` is missing or not a string.
- Workaround: None in-template. Match the guarded pattern from `assets/template.html` and `assets/template-swiss.html`.

**AIDX low-power state is not initialized to false:**
- Symptoms: `window.__lowPowerMode` is only set when `localStorage.getItem('aidxLowPower') === '1'`; otherwise it remains undefined until the user toggles low-power mode.
- Files: `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`
- Trigger: Load an AIDX deck for the first time, then inspect or depend on `window.__lowPowerMode`.
- Workaround: Runtime checks currently treat undefined as false, but future code can misread the state. Initialize `window.__lowPowerMode = false` before checking localStorage.

## Security Considerations

**Generated decks execute arbitrary inline HTML and script in a browser:**
- Risk: The skill outputs static HTML decks. If untrusted source content is inserted directly into templates, it can execute script, event-handler attributes, unsafe URLs, or CSS that exfiltrates data when the deck is opened.
- Files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `references/layouts.md`, `references/layouts-swiss.md`, `references/layouts-aidx.md`
- Current mitigation: Validators check a few forbidden patterns such as local machine paths, missing image slots, SVG text in Swiss decks, emojis, and ad hoc colors.
- Recommendations: Add a generated-deck sanitizer or validator checks for `<script>`, inline `on*=` event handlers, `javascript:` URLs, remote tracking pixels, and unexpected remote origins in generated content sections.

**Runtime templates load third-party scripts from CDNs:**
- Risk: Decks depend on remote scripts for icons and animation fallback. `assets/template.html` and `assets/template-swiss.html` load Lucide from `https://unpkg.com/...`; both also fall back to Motion from `https://cdn.jsdelivr.net/...`. `references/swiss-map-component.md` uses MapLibre from `https://unpkg.com/...`.
- Files: `assets/template.html`, `assets/template-swiss.html`, `references/swiss-map-component.md`, `assets/motion.min.js`
- Current mitigation: Motion has a local fallback at `assets/motion.min.js`; Lucide and MapLibre examples do not have a local fallback or integrity pin.
- Recommendations: Vendor critical browser libraries locally or add Subresource Integrity where CDN usage remains necessary. Document that offline single-file expectations exclude remote icon/map dependencies unless vendored.

**LocalStorage access is not guarded:**
- Risk: Privacy-restricted browser contexts, embedded webviews, or strict file/browser settings can throw on `localStorage.getItem` or `localStorage.setItem`, breaking deck initialization or the low-power toggle.
- Files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`
- Current mitigation: Not detected.
- Recommendations: Wrap localStorage reads and writes in `try/catch`, and keep low-power state in memory when persistence is unavailable.

## Performance Bottlenecks

**ESC overview clones full slide DOM trees:**
- Problem: Overview mode rebuilds the grid by cloning every slide, including media, SVGs, canvases, and nested animated elements.
- Files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`
- Cause: `buildOverview()` calls `cloneNode(true)` for each slide on every overview open.
- Improvement path: Cache overview thumbnails after first build, strip heavy children from clones, or render lightweight title/number cards for large decks.

**WebGL/canvas animation loops run continuously outside low-power mode:**
- Problem: Style A, Style B, and AIDX backgrounds use active `requestAnimationFrame` loops while the deck is open.
- Files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`
- Cause: Background loops start at load and continue until low-power mode is enabled. Style A and Style B cap DPR at 2; AIDX also caps DPR at 2, but all still render every frame.
- Improvement path: Pause animation when the document is hidden, reduce frame rate for non-hero slides, and preserve the current low-power controls as the explicit user override.

**Swiss template re-reads CSS accent color every frame:**
- Problem: `assets/template-swiss.html` calls `readAccent()` inside the WebGL draw callback on every frame.
- Files: `assets/template-swiss.html`
- Cause: The shader reads `getComputedStyle(document.documentElement)` each frame instead of updating the accent value only when theme state changes.
- Improvement path: Cache accent RGB and recompute it when a theme/accent class changes or before starting the grid loop.

## Fragile Areas

**Regex-based HTML parsing in validators:**
- Files: `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`
- Why fragile: Both validators identify slide sections with regular expressions and inspect tags using additional regexes. Nested `</section>` text, unusual attribute ordering, single quotes, uppercase tags, or generated markup with comments can evade or confuse checks.
- Safe modification: Keep current regex checks for quick CLI feedback, but add DOM-based validation using a parser such as `parse5` once a package manifest exists.
- Test coverage: No automated tests cover validator false positives, false negatives, malformed HTML, or alternate valid formatting.

**AIDX validator is less strict than Swiss validator:**
- Files: `scripts/validate-aidx-deck.mjs`, `scripts/validate-swiss-deck.mjs`, `scripts/build-aidx-examples.mjs`, `examples/aidx-style-c-showcase.html`
- Why fragile: Swiss validation bans visible SVG `<text>` and enforces detailed image-slot rules. AIDX validation allows SVG `<text>` in the generated example and does not enforce comparable geometry/text separation rules.
- Safe modification: Decide whether AIDX permits SVG text for evidence mockups. If not, add an AIDX validator rule and rewrite `scripts/build-aidx-examples.mjs`; if yes, document the exception in `references/layouts-aidx.md`.
- Test coverage: `node scripts/validate-aidx-deck.mjs examples/aidx-style-c-showcase.html` passes, but this only proves the current example fits current rules.

**Documentation contains extensive behavioral requirements that validators do not enforce:**
- Files: `references/checklist.md`, `references/layouts.md`, `references/layouts-swiss.md`, `references/layouts-aidx.md`, `references/components.md`, `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`
- Why fragile: Many rules around theme rhythm, screenshot framing, layout choice, WebGL visibility, low-power behavior, and visual QA are human-only checklist items.
- Safe modification: Promote high-risk checklist items into validator checks first: missing theme class, too many same-theme slides in a row, local image paths without slots, remote image origins, and unsupported layout names.
- Test coverage: Not detected beyond manual PR checklist items in `.github/pull_request_template.md` and `CONTRIBUTING.md`.

**Minified vendored dependency is committed without provenance metadata:**
- Files: `assets/motion.min.js`, `assets/template.html`, `assets/template-swiss.html`
- Why fragile: The templates import Motion as a local fallback, but the vendored file is minified and hard to review. The code references Motion `11.11.17`, but there is no package manifest or checksum.
- Safe modification: Record source version and checksum in documentation or regenerate `assets/motion.min.js` through a repeatable script.
- Test coverage: No automated check confirms that `assets/motion.min.js` exports the API used by template animation code.

## Scaling Limits

**Deck runtime assumes moderate slide counts:**
- Current capacity: Templates work well for typical presentation decks, and the AIDX example contains 10 slides.
- Limit: Navigation dots, ESC overview cloning, and `deck.style.width = total * 100vw` become unwieldy for very large decks.
- Scaling path: Add a compact navigation mode and lazy overview rendering for decks above a threshold such as 30 slides.

**Single-file template approach limits reuse and review:**
- Current capacity: Three complete visual systems are maintained as standalone HTML templates.
- Limit: Shared runtime behavior such as navigation, low-power mode, overview rendering, keyboard handling, and animation fallback is duplicated across `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html`.
- Scaling path: Extract shared runtime modules at authoring time and generate single-file deliverables from those sources.

## Dependencies at Risk

**Lucide CDN dependency:**
- Risk: Icon rendering requires `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js` in Style A and Style B templates, and `latest` is not pinned to a stable version.
- Impact: Offline decks or CDN failures lose icon rendering; upstream breaking changes can alter icons or initialization behavior.
- Migration plan: Vendor a pinned Lucide bundle locally, use a fixed CDN version with SRI, or inline only the icons used by generated decks.

**MapLibre CDN example dependency:**
- Risk: `references/swiss-map-component.md` instructs users to load MapLibre CSS and JS from `https://unpkg.com/maplibre-gl@5.14.0/...`.
- Impact: Map slides depend on network availability and CDN integrity, conflicting with the single-file/offline deck positioning unless users understand the exception.
- Migration plan: Document map components as network-dependent examples or provide a vendored/local static map alternative.

**Unmanaged Node runtime dependency:**
- Risk: Scripts use ESM and modern Node APIs but the repo does not declare a supported Node version.
- Impact: Contributors on older Node versions can hit syntax/runtime failures without a clear setup error.
- Migration plan: Add `.nvmrc`, `engines.node`, or both, then run validators in CI against that version.

## Missing Critical Features

**No continuous integration workflow:**
- Problem: There is no `.github/workflows/` pipeline to run validators, regenerate examples, or catch broken template/reference edits.
- Blocks: Automated enforcement of the PR checklist and confidence that sample decks remain valid.

**No automated visual regression coverage:**
- Problem: The project depends on layout fidelity, but there are no Playwright/browser screenshot tests for dense text slides, image slides, overview mode, navigation, low-power mode, or generated examples.
- Blocks: Safe refactoring of large templates and confident updates to layout CSS.

**No Style A validator:**
- Problem: Style B and Style C have validators; Style A only has documentation and checklist coverage.
- Blocks: Automated checks for Style A theme classes, image slots, local paths, unsafe remote content, and layout constraints.

## Test Coverage Gaps

**Validator behavior is untested:**
- What's not tested: Allowed layout lists, malformed slide detection, missing `data-image-slot`, local path detection, style rule checks, warning/error exit codes, and false-positive cases.
- Files: `scripts/validate-swiss-deck.mjs`, `scripts/validate-aidx-deck.mjs`
- Risk: Validators can regress silently and either block valid decks or pass invalid ones.
- Priority: High

**Template runtime behavior is manually tested only:**
- What's not tested: Keyboard navigation, wheel/touch navigation, ESC overview, URL slide parameter behavior, low-power persistence, animation fallback, WebGL/canvas start-stop behavior, and offline behavior.
- Files: `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `examples/aidx-style-c-showcase.html`
- Risk: Runtime regressions appear only during manual browser review or user presentations.
- Priority: High

**Example generation has no snapshot or round-trip test:**
- What's not tested: `scripts/build-aidx-examples.mjs` output stability, absence of unresolved placeholders, and consistency with `scripts/validate-aidx-deck.mjs`.
- Files: `scripts/build-aidx-examples.mjs`, `examples/aidx-style-c-showcase.html`, `references/layouts-aidx.md`
- Risk: Documentation edits can break the showcase or leave stale sample content.
- Priority: Medium

**Documentation constraints are not executable:**
- What's not tested: Checklist rules in `references/checklist.md`, Style B lock rules in `references/swiss-layout-lock.md`, screenshot framing rules in `references/screenshot-framing.md`, and component usage rules in `references/components.md`.
- Files: `references/checklist.md`, `references/swiss-layout-lock.md`, `references/screenshot-framing.md`, `references/components.md`
- Risk: Future agents may follow older or partial instructions and produce decks that violate the intended design system.
- Priority: Medium

---

*Concerns audit: 2026-06-10*
