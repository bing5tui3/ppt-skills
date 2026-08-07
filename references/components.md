# AIDX Components

Reusable components are defined in `assets/template-aidx.html`.

## Core

| Component | Use |
|---|---|
| `.slide` | Full viewport page |
| `.slide.grey` | `surface.canvas` support page |
| `.slide.dark` | Legacy `surface.subtle` light page, never a black theme |
| `.slide.accent` | `action.subtle` emphasis page |
| `.slide.split` | Split-half layouts S03/S10 |
| `.canvas-card` | Full-viewport AIDX canvas |
| `.chrome-min.brand-chrome` | AIDX page header |
| `.aidx-brand` | Inline gradient avatar + AIDX lockup |
| `.brand-meta` | WeBank/date/page metadata |
| `.aidx-footer` | Bottom source/page brand row |

## Brand Lockup

```html
<span class="aidx-brand">
  <span class="aidx-avatar-mark" aria-hidden="true">...inline light-background gradient avatar-terminal.svg with unique paint IDs...</span>
  <span class="aidx-brand-copy"><span class="aidx-brand-title">AIDX</span><span class="aidx-brand-subtitle">AIDX Review</span></span>
</span>
```

Do not point generated decks to local brand assets. Keep each inline avatar's gradient and filter IDs unique within the deck.
The standard light-theme header renders `.aidx-avatar-mark` at `40px × 40px`; keep the AIDX title and subtitle at their existing sizes.

## Typography

Use the AIDX type scale already in the template:

| Class | Use |
|---|---|
| `.h-hero`, `.h-hero-zh` | Cover-scale heading |
| `.h-xl`, `.h-xl-zh` | Main page heading |
| `.h-md`, `.h-sub` | Section heading |
| `.lead`, `.body`, `.body-sm` | Narrative text |
| `.t-meta`, `.t-cat`, `.meta-row` | Mono metadata |
| `.kpi-thin`, `.num-mega`, `.kpi-big` | Data typography |

AIDX rule still applies: the larger the text, the lighter the weight.

## Grid and Cards

| Class | Use |
|---|---|
| `.grid-12`, `.span-*` | Modular grid |
| `.grid-2-7-5`, `.grid-2-6-6` | Classic split grids |
| `.card-fill` | Neutral light card |
| `.card-accent` | One strong AIDX blue focus card |
| `.card-ink` | Pale navy-tinted emphasis card |
| `.split-half`, `.half.b-accent`, `.half.b-ink` | Split layouts |

Do not combine fill types on one card.

## Semantic Status

Status is never color-only. Every status component needs:

1. `.status-chip`
2. one matching `.status-*` class
3. the same `data-status` value
4. visible label text

```html
<span class="status-chip status-danger" data-status="danger">阻塞</span>
<span class="status-chip status-warning" data-status="warning">观察</span>
<span class="status-chip status-ai" data-status="ai">AI 已介入</span>
```

| Class | Use |
|---|---|
| `.status-success` | Completed or verified |
| `.status-warning` | Needs attention |
| `.status-danger` | Failure, blocker or material risk |
| `.status-info` | Context or tracked item |
| `.status-ai` | Explicit AI processing, suggestion or involvement |

Signal Cyan appears only through the AI status role.

## Data Series

Use `.data-series-1` through `.data-series-8` only for categorical data. Apply `.data-series-fill` or `.data-series-text` to consume the series color.

```html
<div class="data-series-1 data-series-fill" data-series-label="Platform">...</div>
```

Eight categories are the maximum. Always pair color with a visible label, value, shape or pattern.

## Opt-in High-contrast Accents

Use these utilities only when the user explicitly requests high-contrast color. They reuse the exact `Categorical / Light` palette with a validated foreground color.

```html
<span class="tag contrast-fill contrast-2">Platform</span>

<div class="contrast-box contrast-3">
  <div class="t-cat">Decision</div>
  <p class="body">优先收敛入口，再扩大试点范围。</p>
</div>

<strong class="contrast-text contrast-5">Verified</strong>
```

| Class | Use |
|---|---|
| `.contrast-1` … `.contrast-8` | Select one Categorical / Light color and its paired foreground |
| `.contrast-fill` | Apply the selected color to an existing tag, card or small element |
| `.contrast-box` | Apply the selected color plus standard text-box padding |
| `.contrast-text` | Use the selected color as foreground text only |

Do not use these classes to communicate success, warning, danger, info or AI state. Use the semantic `.status-*` components for those meanings.

## Evidence Images

| Class / slot | Use |
|---|---|
| `.frame-img.r-21x9` | S22 hero strip or S15/S16 regenerated images |
| `.frame-img.r-16x10.fit-contain` | Faithful screenshots |
| `s22-hero-21x9` | Required S22 image slot |
| `s15-grid-21x9` | S15 multi-image grid slot |
| `s16-brief-21x9` | S16 brief-card image slot |

Generated visuals are assets only. They should not contain slide headers, footers, page numbers, or logos.
