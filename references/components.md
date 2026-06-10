# AIDX Components

This file documents reusable components already defined in `assets/template-aidx.html`. Use these classes as-is when composing slides from `references/layouts-aidx.md`.

## Stage and Navigation

| Class / element | Use |
|---|---|
| `.slide` | Full viewport page container |
| `.slide.dark` | Default executive content page |
| `.slide.blue` | Cover, section reset, closing request |
| `.slide.light` | Screenshot fidelity, appendix, dense table material |
| `.stage` | Fixed 1600x900 presentation canvas |
| `.stage-body` | Main content area between chrome and footer |
| `.chrome` | Top metadata and brand row |
| `.foot` | Bottom source/page/context row |
| `#nav` | Bottom navigation dots |
| `#overview` | ESC overview grid |

Every slide must include `.stage`; do not put content directly under `.slide`.

## Brand Lockup

Use the avatar mark plus text lockup. Do not use the deprecated X-shaped mark:

```html
<div class="brand-lockup">
  <span class="aidx-avatar" aria-hidden="true">AI</span>
  <div><strong>AIDX</strong><br><span>Executive Brief</span></div>
</div>
```

To use a real avatar image, keep the same wrapper and replace the fallback initials:

```html
<span class="aidx-avatar">
  <img src="images/avatar.png" data-image-slot="aidx-brand-avatar" alt="汇报人头像">
</span>
```

Use `.deck-meta` for confidentiality, date, page, or WeBank endorsement:

```html
<div class="deck-meta"><span>CONFIDENTIAL</span><span class="meta-rule"></span><b>WeBank</b></div>
```

## Typography

| Class | Use |
|---|---|
| `.kicker` | Small mono context label |
| `.h-hero` | Cover title |
| `.h-xl` | Main slide title |
| `.h-md` | Section or module heading |
| `.lead` | High-level explanation |
| `.body` | Standard body copy |
| `.small` | Caption or support text |
| `.mono` | Operational labels |
| `.cyan`, `.blue`, `.muted` | Tokenized emphasis |

Do not use viewport-based font sizing or inline text below 14px.

## Layout Helpers

| Class | Use |
|---|---|
| `.grid-12` | 12-column grid |
| `.span-3` to `.span-12` | Grid spans |
| `.stack` | Vertical stack with 20px gap |
| `.stack-lg` | Vertical stack with 32px gap |
| `.split` | 7/5 split layout |
| `.split.reverse` | 5/7 split layout |

## Panels and Status

| Class | Use |
|---|---|
| `.panel` | Base card/module |
| `.panel.soft` | Lower-emphasis module |
| `.panel.accent` | Primary AIDX decision or highlight module |
| `.panel.cyan` | Informational highlight |
| `.panel.risk` | Risk module |
| `.panel.light` | Light evidence module |
| `.panel-label` | Mono eyebrow inside panels |
| `.panel-title` | Panel heading |
| `.status.ok` | Positive status |
| `.status.warn` | Warning status |
| `.status.risk` | Risk status |
| `.status.info` | Informational status |

Status components use color and geometry. Do not replace them with emoji.

## KPI

Use `.kpi-strip` with `.kpi`, `.kpi-label`, `.kpi-nb`, `.unit`, and `.kpi-note`.

```html
<div class="kpi-strip">
  <div class="kpi">
    <div class="kpi-label">Adoption</div>
    <div class="kpi-nb">72<span class="unit">%</span></div>
    <div class="kpi-note">试点团队周活使用率</div>
  </div>
</div>
```

Every KPI needs a label, value, and interpretation.

## Decision and Risk

| Class | Use |
|---|---|
| `.decision-grid` | Three decision cards |
| `.decision-item` | One decision card |
| `.decision-number` | Decision ordering |
| `.decision-title` | Decision title |
| `.decision-desc` | Decision explanation |
| `.risk-matrix` | 2x2 risk grid |
| `.risk-card` | One risk module |
| `.score` | Risk or priority score |

Decision cards should include recommendation, tradeoff, and next action. Risk cards should include impact and mitigation.

## Roadmap and Architecture

| Class | Use |
|---|---|
| `.roadmap` | Four-step roadmap grid |
| `.roadmap-step` | One roadmap phase |
| `.roadmap-step.done` | Completed phase state |
| `.roadmap-step.risk` | Risk phase state |
| `.arch-map` | Three-layer architecture map |
| `.arch-layer` | One architecture layer |
| `.arch-label` | Layer label |
| `.arch-cells` | Capability cells |
| `.arch-cell` | One capability |

Keep architecture maps at capability-boundary level. Do not turn them into implementation diagrams.

## Comparison and Bars

| Class | Use |
|---|---|
| `.compare` | Two-column before/after or option comparison |
| `.compare-list` | List of comparison rows |
| `.compare-row` | One comparison item |
| `.bar-list` | Vertical bar group |
| `.bar-row` | Label, track, value |
| `.bar-track` | Bar background |
| `.bar-fill` | Bar value |
| `.bar-fill.cyan`, `.bar-fill.green`, `.bar-fill.red` | State colors |

## Images

| Class | Use |
|---|---|
| `.frame-img` | Image frame |
| `.frame-img.fit-contain` | Preserve screenshot content |
| `.frame-img.r-21x9` | Wide cover/evidence asset |
| `.frame-img.r-16x10` | Default evidence screenshot |
| `.frame-img.r-16x9` | Architecture/KPI visual |
| `.frame-img.r-4x3` | Compact supporting visual |
| `.img-cap` | Caption |

All local images must include `data-image-slot`.
