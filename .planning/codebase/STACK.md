# Technology Stack

**Analysis Date:** 2026-06-10

## Languages

**Primary:**
- HTML5 - Single-file browser presentation templates in `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, and `examples/aidx-style-c-showcase.html`
- CSS3 - Embedded design systems, layout tokens, responsive slide styling, WebGL/canvas presentation modes, and print-like typography inside `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html`
- JavaScript ES modules - Browser deck runtime and Node validation/build scripts in `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, `scripts/build-aidx-examples.mjs`, `scripts/validate-aidx-deck.mjs`, and `scripts/validate-swiss-deck.mjs`

**Secondary:**
- Markdown - Skill contract, usage documentation, design references, layout catalogs, and checklists in `SKILL.md`, `README.md`, `README.en.md`, and `references/*.md`
- YAML - GitHub issue templates in `.github/ISSUE_TEMPLATE/bug_report.yml`, `.github/ISSUE_TEMPLATE/feature_request.yml`, `.github/ISSUE_TEMPLATE/question.yml`, and `.github/ISSUE_TEMPLATE/config.yml`

## Runtime

**Environment:**
- Browser runtime - Generated decks are static HTML files opened directly in a modern browser; templates depend on DOM APIs, keyboard/touch/wheel events, WebGL, Canvas 2D, Web Animations, `localStorage`, `matchMedia`, and dynamic `import()`
- Node.js - Scripts use ESM `.mjs`, shebang `#!/usr/bin/env node`, `process.argv`, `process.exit`, and built-in `node:fs`, `node:path`, and `node:url` modules in `scripts/build-aidx-examples.mjs`, `scripts/validate-aidx-deck.mjs`, and `scripts/validate-swiss-deck.mjs`
- Version pinning: Not detected. There is no `.nvmrc`, `.node-version`, `package.json`, or `engines` declaration in the repository.

**Package Manager:**
- Not detected. No `package.json`, `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lockb`, or `bun.lock` is present.
- Lockfile: missing

## Frameworks

**Core:**
- Static browser platform - The project ships complete HTML/CSS/JS deck templates rather than a web application framework; use `assets/template.html`, `assets/template-swiss.html`, and `assets/template-aidx.html` as copyable runtime bases.
- Codex/Claude skill format - The skill entry point is `SKILL.md` with YAML front matter (`name`, `description`) and operational instructions for agent use.
- WebGL - Style A and Style B use shader/canvas backgrounds through `bootGL()` in `assets/template.html` and `assets/template-swiss.html`.
- Canvas 2D - Style B uses ASCII/background canvas effects in `assets/template-swiss.html`; Style C uses the signal background canvas in `assets/template-aidx.html`.
- Web Animations API - Style C uses built-in browser animation primitives and does not rely on Motion One; see `assets/template-aidx.html`.

**Testing:**
- Custom Node validators - `scripts/validate-swiss-deck.mjs` validates Swiss locked-layout decks and `scripts/validate-aidx-deck.mjs` validates AIDX fixed-stage decks.
- Test runner framework: Not detected. There is no Jest, Vitest, Playwright, or Node test config.

**Build/Dev:**
- `scripts/build-aidx-examples.mjs` - Generates `examples/aidx-style-c-showcase.html` from `assets/template-aidx.html` and `references/layouts-aidx.md`.
- Shell/browser preview - Decks are static HTML and can be opened directly; no dev server is required by the repository.
- GitHub issue/PR templates - Contribution workflow metadata lives in `.github/pull_request_template.md` and `.github/ISSUE_TEMPLATE/*.yml`.

## Key Dependencies

**Critical:**
- Motion One 11.11.17 - Local offline copy in `assets/motion.min.js`; Style A/B templates first import `./assets/motion.min.js`, then fall back to `https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm` in `assets/template.html` and `assets/template-swiss.html`.
- Google Fonts - Runtime font loading from `fonts.googleapis.com` and `fonts.gstatic.com` in `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, and `examples/aidx-style-c-showcase.html`.
- Lucide UMD - Icon runtime loaded from `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js` in `assets/template.html` and `assets/template-swiss.html`.

**Infrastructure:**
- Node built-ins only - `scripts/build-aidx-examples.mjs`, `scripts/validate-aidx-deck.mjs`, and `scripts/validate-swiss-deck.mjs` use only built-in Node modules; no install step is required.
- Bundled static image assets - Screenshot backgrounds are stored under `assets/screenshot-backgrounds/style-a/` and `assets/screenshot-backgrounds/style-b/`.
- Optional MapLibre reference - `references/swiss-map-component.md` documents a MapLibre GL map component using CDN assets and OpenStreetMap raster tiles; it is reference material, not included in the core templates.

## Configuration

**Environment:**
- Runtime configuration is template-local CSS variables and HTML placeholders, not environment variables.
- Style A theme variables live in `assets/template.html` and are documented in `references/themes.md`.
- Style B Swiss theme variables live in `assets/template-swiss.html` and are documented in `references/themes-swiss.md`.
- Style C AIDX fixed brand variables live in `assets/template-aidx.html` and are documented in `references/themes-aidx.md`.
- Generated decks must replace title placeholders in `assets/template.html`, `assets/template-swiss.html`, or `assets/template-aidx.html` before delivery.
- `.env` files: Not detected during scan. Do not add secrets to this repository; generated decks are static client-side files.

**Build:**
- No bundler config detected. There is no Vite, Webpack, Rollup, TypeScript, Babel, ESLint, Prettier, or package-manager configuration.
- Build-like scripts are standalone Node commands:
  - `node scripts/build-aidx-examples.mjs`
  - `node scripts/validate-swiss-deck.mjs <index.html> [--allow-experimental]`
  - `node scripts/validate-aidx-deck.mjs <index.html>`
- Documentation and reference content live in `SKILL.md`, `README.md`, `README.en.md`, and `references/*.md`.

## Platform Requirements

**Development:**
- Use a modern browser with JavaScript enabled for deck preview; WebGL and Canvas 2D improve visual quality but low-power/static modes keep content readable.
- Use Node.js with ESM `.mjs` support for scripts in `scripts/`.
- No dependency installation is needed for repository scripts because they use only Node built-ins.
- For Style A/B deck animation, keep `assets/motion.min.js` available next to copied templates or allow the jsDelivr fallback in `assets/template.html` and `assets/template-swiss.html`.

**Production:**
- Deployment target is static HTML plus optional local image assets in an `images/` directory, as described in `SKILL.md`.
- Generated decks can be hosted on any static file host or opened from disk.
- Network access improves font/icon/animation availability through Google Fonts, unpkg, and jsDelivr, but templates include local fallback behavior for Motion One animation failure.
- The project license is AGPL-3.0 in `LICENSE`.

---

*Stack analysis: 2026-06-10*
