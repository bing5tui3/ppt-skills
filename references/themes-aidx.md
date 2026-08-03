# AIDX Theme

The PPT framework follows **AIDX Color System v1.0.0**. The vendored snapshot at `references/aidx-colors.json` is the validation baseline.

## Color Roles

| Role | Token | Value | Use |
|---|---|---:|---|
| Identity | `--aidx-brand-core` | `#063970` | AIDX identity, brand chrome, formal labels and strong lines |
| Action | `--aidx-action-primary` | `#3A5ECF` | Decisions, selected states, links and the single page focus |
| AI signal | `--aidx-brand-signal` | `#5DADE2` | Explicit AI state, motion and small-area signal only |

Core Navy, Action Blue and Signal Cyan are different roles. Do not substitute one for another because they are all blue.

## Light Theme Tokens

```css
--aidx-surface-canvas:#F7F8FA;
--aidx-surface-base:#FFFFFF;
--aidx-surface-raised:#FFFFFF;
--aidx-surface-subtle:#EFF2F5;
--aidx-surface-sunken:#E0E5EA;
--aidx-surface-inverse:#16232F;

--aidx-text-primary:#16232F;
--aidx-text-secondary:#53616E;
--aidx-text-muted:#717F8C;
--aidx-text-placeholder:#9AA7B3;
--aidx-text-inverse:#FFFFFF;

--aidx-border-subtle:#E0E5EA;
--aidx-border-default:#C8D0D8;
--aidx-border-strong:#717F8C;
--aidx-border-focus:#3A5ECF;

--aidx-action-primary:#3A5ECF;
--aidx-action-primary-hover:#2F4CB0;
--aidx-action-primary-active:#293F8D;
--aidx-action-on-primary:#FFFFFF;
--aidx-action-subtle:#F0F4FF;
--aidx-action-on-subtle:#293F8D;
```

## Page Modes

| Class | Token mapping | Use |
|---|---|---|
| `slide` | `surface.base` | Default narrative and data page |
| `slide grey` | `surface.canvas` | Quieter support and comparison page |
| `slide dark` | `surface.subtle` | Legacy light compatibility mode; it is not a dark theme |
| `slide accent` | `action.subtle` | Cover, section reset and closing emphasis |
| `slide split` | Child surfaces | S03 / S10 split structures |

The deck remains light-first. Do not turn `slide dark` into a black command-center page.

## Status Tokens

Status must use color **plus visible text or a symbol**. Use `.status-chip`, a matching `.status-*` class and `data-status`.

| Status | Class / attribute | Meaning |
|---|---|---|
| Success | `.status-success`, `data-status="success"` | Completed or verified |
| Warning | `.status-warning`, `data-status="warning"` | Needs attention or confirmation |
| Danger | `.status-danger`, `data-status="danger"` | Failure, blocker or material risk |
| Info | `.status-info`, `data-status="info"` | Context or tracked item |
| AI | `.status-ai`, `data-status="ai"` | AI is processing, suggesting or actively involved |

Signal Cyan belongs only to the explicit AI state. It must not be used as small text on white.

## Data Visualization

Categorical charts may use `--aidx-data-1` through `--aidx-data-8`. Eight colors are the maximum, not the target.

- Start with `--aidx-data-1`.
- Use color only for actual categories, never to decorate unrelated KPI values.
- Add labels, values, shapes or patterns as a second identification channel.
- Sequential and diverging charts should use values from `references/aidx-colors.json`.

## Effects

The only approved colored effects are:

```css
--aidx-gradient-core:linear-gradient(135deg,#063970 0%,#3A5ECF 100%);
--aidx-gradient-ai:linear-gradient(135deg,#3A5ECF 0%,#5DADE2 100%);
--aidx-glow-ai:0 0 48px rgba(93, 173, 226, 0.28);
```

Monochrome dot matrices, dashed axes and repeating data patterns remain allowed because they carry structure and non-color identification. Logos, body copy, tables and normal cards stay solid.

## Compatibility Aliases

Older decks may still use `--paper`, `--ink`, `--accent`, `--grey-*`, `--text-*` and `--border-*`. The template keeps these as aliases to canonical `--aidx-*` tokens.

New slides and components must use canonical names. The validator warns when legacy aliases appear in slide content.

## Brand and Accessibility Rules

- Use the official light-background gradient `avatar-terminal.svg` inline in `.aidx-brand`; suffix its gradient and filter IDs per slide.
- Use `AIDX · WeBank` or `WeBank` endorsement in footer or right metadata.
- Normal body text requires at least 4.5:1 contrast; large text and key UI require 3:1.
- Do not recolor screenshots, partner brands, syntax highlighting or user-provided imagery.
- Do not introduce ad hoc Hex values for page surfaces, text, borders, status or charts.
- Avoid generic purple-blue palettes, decorative bokeh, neon and gradient wallpaper.
