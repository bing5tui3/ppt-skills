# AIDX Components

Reusable components are defined in `assets/template-aidx.html`.

## Core

| Component | Use |
|---|---|
| `.slide` | Full viewport page |
| `.slide.grey` | Light blue-gray support page |
| `.slide.accent` | Pale AIDX blue emphasis page |
| `.slide.split` | Split-half layouts S03/S10 |
| `.canvas-card` | Full-viewport AIDX canvas |
| `.chrome-min.brand-chrome` | AIDX page header |
| `.aidx-brand` | Inline avatar + AIDX lockup |
| `.brand-meta` | WeBank/date/page metadata |
| `.aidx-footer` | Bottom source/page brand row |

## Brand Lockup

```html
<span class="aidx-brand">
  <span class="aidx-avatar-mark" aria-hidden="true">...inline avatar-terminal.svg...</span>
  <span class="aidx-brand-copy"><span class="aidx-brand-title">AIDX</span><span class="aidx-brand-subtitle">Executive Brief</span></span>
</span>
```

Do not point generated decks to local brand assets.

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

## Evidence Images

| Class / slot | Use |
|---|---|
| `.frame-img.r-21x9` | S22 hero strip or S15/S16 regenerated images |
| `.frame-img.r-16x10.fit-contain` | Faithful screenshots |
| `s22-hero-21x9` | Required S22 image slot |
| `s15-grid-21x9` | S15 multi-image grid slot |
| `s16-brief-21x9` | S16 brief-card image slot |

Generated visuals are assets only. They should not contain slide headers, footers, page numbers, or logos.