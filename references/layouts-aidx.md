# Layouts · AIDX Swiss

AIDX Swiss uses the original Swiss `S01-S22` layout structure. It does not use the older `AIDX-01..10` stage layouts.

Every slide must be:

```html
<section class="slide" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    ...
  </div>
</section>
```

## Locked Mode

- Use only `S01` through `S22` for `data-layout`.
- Preserve Swiss grid structure, left-top title axis, hairline rules, straight modules, and large/light typography.
- Use `.canvas-card`, not `.stage`.
- Use AIDX brand chrome on every page.
- Do not invent P23/P24 or freeform evidence walls. Single hero image uses S22; multi-image grids adapt S15/S16.
- SVG may draw geometry only. Visible labels belong in HTML.

## AIDX Brand Chrome

Use this header pattern unless a split layout needs one header per half:

```html
<header class="chrome-min brand-chrome">
  <div class="l">
    <span class="aidx-brand">
      <span class="aidx-avatar-mark" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">

          <!-- === 1. Blue outer glow === -->
          <path d="M 24 4 C 40 4 44 12 44 22 C 44 28 43 33 42 37 C 41 41 39 42 36 40 C 33 38 31 34 30 28 C 29 22 31 18 36 18 C 34 14 30 16 24 16 C 18 16 14 14 12 18 C 17 18 19 22 18 28 C 17 34 15 38 12 40 C 9 42 7 41 6 37 C 5 33 4 28 4 22 C 4 12 8 4 24 4 Z"
            fill="#3A5ECF" stroke="#3A5ECF" stroke-width="5" stroke-linejoin="round"/>
          <ellipse cx="24" cy="24" rx="14" ry="15"
            fill="#3A5ECF" stroke="#3A5ECF" stroke-width="5"/>

          <!-- === 2. Hair (BEHIND face, one continuous path) === -->
          <path d="M 24 4 C 40 4 44 12 44 22 C 44 28 43 33 42 37 C 41 41 39 42 36 40 C 33 38 31 34 30 28 C 29 22 31 18 36 18 C 34 14 30 16 24 16 C 18 16 14 14 12 18 C 17 18 19 22 18 28 C 17 34 15 38 12 40 C 9 42 7 41 6 37 C 5 33 4 28 4 22 C 4 12 8 4 24 4 Z"
            fill="#063970"/>

          <!-- === 3. Face === -->
          <ellipse cx="24" cy="24" rx="14" ry="15" fill="white"/>

          <!-- === 4. Hair crown (inner edge higher at y=16) === -->
          <path d="M 24 4 C 40 4 44 12 44 22 C 38 20 32 16 24 16 C 16 16 10 20 4 22 C 4 12 8 4 24 4 Z"
            fill="#063970"/>

          <!-- === 5. Bangs === -->
          <path d="
            M 14 22
            C 15 16 19 13 24 13
            C 29 13 33 15 35 19
            C 31 18 27 17.5 24 18
            C 20 18.5 16 20 14 22 Z
          " fill="#063970"/>

          <!-- === 6. Eyes: terminal >- === -->
          <polyline points="16,25 21,28.5 16,32" fill="none" stroke="#063970"
            stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="29" y1="28.5" x2="35" y2="28.5" stroke="#063970"
            stroke-width="2.8" stroke-linecap="round"/>

        </svg>
      </span>
      <span class="aidx-brand-copy"><span class="aidx-brand-title">AIDX</span><span class="aidx-brand-subtitle">Executive Brief</span></span>
    </span>
  </div>
  <div class="r brand-meta"><span>CONFIDENTIAL</span><span class="brand-rule"></span><b>WeBank</b><span>01 / NN</span></div>
</header>
```

Use this footer pattern when the layout has a normal bottom row:

```html
<footer class="aidx-footer"><span>Executive Brief</span><span><b>AIDX</b> · WeBank</span></footer>
```

## Registered Layouts

| ID | Name | Structure to preserve | Best use |
|---|---|---|---|
| S01 | Index Cover | Three cover rows, large number/name rhythm | Cover or section opener |
| S02 | Vertical Timeline + KPI | Left-top heading, vertical timeline, bottom KPI row | Evolution with metrics |
| S03 | Split Statement | Two full-height halves, statement plus explanation | Strong thesis or transition |
| S04 | Six Cells | 2x3 cell grid | Six equal concepts |
| S05 | Three Layers | Three stacked/layered blocks | Three-part model |
| S06 | KPI Tower | Four unequal KPI towers | Comparable quantitative metrics |
| S07 | Horizontal Bar | Ranked horizontal bars | 5-10 comparable values |
| S08 | Duo Compare | Two mirrored columns with center rule | Before/after, option A/B |
| S09 | Dot Matrix Statement | Large statement plus matrix geometry | Breathing thesis page |
| S10 | Split Closing | Split closing statement plus takeaways | Final request or manifesto |
| S11 | Horizontal Timeline | Axis with 4-7 nodes | Process or staged rollout |
| S12 | Manifesto + Banner | Large statement and full-width banner | Chapter close |
| S13 | Three Forces | Left hero block and three cards | Three forces or arguments |
| S14 | Loop Diagram | Steps plus geometric loop | Feedback loops |
| S15 | Matrix + Hero Stat | Matrix grid plus bottom hero stat | 8-12 items plus total |
| S16 | Multi-card Brief | 3x2 micro cards | Six notes or signals |
| S17 | System Diagram | Layered system map and explanations | Capability or architecture map |
| S18 | Why Now | Three progressive columns with bottom numbers | Timing argument |
| S19 | Four Cards | Top hairline and four equal columns | Four modules or principles |
| S20 | Stacked KPI Ledger | Rows with giant numbers | KPI ledger |
| S21 | Tech Spec Sheet | Large title, KPI grid, vertical bars | Technical benchmark/spec |
| S22 | Image Hero | 60% top image strip, title overlay, bottom KPIs | Product/case evidence |

## Layout Selection

For an 8-10 page executive brief, prefer:

| Page | Layout | Role |
|---|---|---|
| 1 | S01 | Cover / scope |
| 2 | S03 or S18 | Main conclusion |
| 3 | S08 | Decision comparison |
| 4 | S20 or S06 | KPI evidence |
| 5 | S11 | Roadmap |
| 6 | S17 or S14 | System / architecture |
| 7 | S15 or S16 | Evidence matrix |
| 8 | S22 | Screenshot or case hero |
| 9 | S10 | Closing request |

## Image Slots

| Layout | Slot | Ratio |
|---|---|---|
| S22 | `s22-hero-21x9` | 21:9 |
| S15 | `s15-grid-21x9` | 21:9 per grid item |
| S16 | `s16-brief-21x9` | 21:9 per brief card |

All local `images/...` assets must include `data-image-slot`.