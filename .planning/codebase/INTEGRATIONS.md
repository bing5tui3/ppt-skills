# External Integrations

**Analysis Date:** 2026-06-10

## APIs & External Services

**Font CDNs:**
- Google Fonts - Provides typography for static HTML deck templates.
  - SDK/Client: Browser `<link rel="preconnect">` and stylesheet links in `assets/template.html`, `assets/template-swiss.html`, `assets/template-aidx.html`, and `examples/aidx-style-c-showcase.html`
  - Auth: Not required
  - Hosts: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`

**JavaScript CDNs:**
- jsDelivr - Fallback host for Motion One when local `assets/motion.min.js` cannot be dynamically imported.
  - SDK/Client: Dynamic ESM import from `https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm` in `assets/template.html` and `assets/template-swiss.html`
  - Auth: Not required
- unpkg - Loads Lucide browser UMD bundle for icons in Style A/B templates.
  - SDK/Client: `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` in `assets/template.html` and `assets/template-swiss.html`
  - Auth: Not required
- unpkg MapLibre GL - Documented optional map component dependency.
  - SDK/Client: `https://unpkg.com/maplibre-gl@5.14.0/dist/maplibre-gl.css` and `https://unpkg.com/maplibre-gl@5.14.0/dist/maplibre-gl.js` in `references/swiss-map-component.md`
  - Auth: Not required

**Map Tiles:**
- OpenStreetMap tile server - Optional raster tile source in the Swiss map component reference.
  - SDK/Client: MapLibre raster source `https://tile.openstreetmap.org/{z}/{x}/{y}.png` in `references/swiss-map-component.md`
  - Auth: Not required

**Repository/Distribution Services:**
- GitHub - Canonical repository/source references, README badge images, screenshots, and user attachment assets.
  - SDK/Client: README links and badge/image URLs in `README.md`, `README.en.md`, and provenance text in `SKILL.md`
  - Auth: Not required for runtime use
- shields.io - README status/license/skill badges.
  - SDK/Client: Markdown badge image URLs in `README.md` and `README.en.md`
  - Auth: Not required

**Agent/AI Platform Integrations:**
- Claude Code / Codex skill runtime - The repository is consumed as an agent skill via `SKILL.md`.
  - SDK/Client: Skill metadata front matter and workflow instructions in `SKILL.md`
  - Auth: Not required by repository code
- Optional image generation workflow - Documentation tells Codex users they may use GPT-Image 2.0 / GPT-M 2.0 for generated deck imagery.
  - SDK/Client: Instructional workflow only in `SKILL.md`, `README.md`, and `README.en.md`; no API client code exists in the repository
  - Auth: Not detected

**External References:**
- Carbon Design System - Cited as a design reference for grid and motion tokens in comments in `assets/template-swiss.html`.
  - SDK/Client: Documentation links only
  - Auth: Not required
- Monocle - Cited as a visual inspiration reference in `README.md` and `README.en.md`.
  - SDK/Client: Documentation link only
  - Auth: Not required

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable
  - Client: Not applicable

**File Storage:**
- Local filesystem only.
  - Static templates and references are stored in `assets/`, `references/`, and `examples/`.
  - Generated deck workflows expect local image assets under a deck-local `images/` directory as described in `SKILL.md`.
  - `scripts/build-aidx-examples.mjs` reads `assets/template-aidx.html` and `references/layouts-aidx.md`, then writes `examples/aidx-style-c-showcase.html`.

**Caching:**
- Browser `localStorage` is used for low-power mode preferences.
  - Style A key: `deckLowPower` in `assets/template.html`
  - Style B key: low-power state key in `assets/template-swiss.html`
  - Style C key: `aidxLowPower` in `assets/template-aidx.html` and `examples/aidx-style-c-showcase.html`
- No Redis, Memcached, service worker cache, or server-side cache detected.

## Authentication & Identity

**Auth Provider:**
- None.
  - Implementation: Static browser files with no login, session, token exchange, or identity provider integration.
  - Repository installation examples use public GitHub URLs in `README.md` and `README.en.md`.

## Monitoring & Observability

**Error Tracking:**
- None detected. There is no Sentry, Datadog, OpenTelemetry, Logtail, or analytics SDK.

**Logs:**
- Browser console warnings are used for optional animation fallback failures in `assets/template.html` and `assets/template-swiss.html`.
- Node scripts print validation/build results to stdout/stderr and set process exit codes in `scripts/build-aidx-examples.mjs`, `scripts/validate-aidx-deck.mjs`, and `scripts/validate-swiss-deck.mjs`.

## CI/CD & Deployment

**Hosting:**
- Static file hosting or direct local file opening. The repository contains no deployment platform config such as Vercel, Netlify, Cloudflare Pages, Docker, or GitHub Pages workflow.

**CI Pipeline:**
- None detected. The repository has `.github/` issue and PR templates but no `.github/workflows/` directory.

## Environment Configuration

**Required env vars:**
- None detected.

**Secrets location:**
- Not applicable. No `.env` files were detected and no secret-bearing config is required by the static templates or Node scripts.
- Do not store secrets in generated decks; all template code runs client-side.

## Webhooks & Callbacks

**Incoming:**
- None. There is no server runtime and no HTTP endpoint code.

**Outgoing:**
- Browser resource fetches for fonts, icons, Motion One fallback, optional MapLibre assets, optional OpenStreetMap tiles, README badge/images, and remote documentation links.
- No programmatic webhook delivery, API mutation, or callback handler detected.

---

*Integration audit: 2026-06-10*
