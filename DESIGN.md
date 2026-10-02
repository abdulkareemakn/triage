---
version: alpha
name: Triage design system
colors:
  background: "oklch(0.9814 0.0045 258.32)"
  foreground: "oklch(0.2157 0.0224 257.29)"
  card: "oklch(1 0 0)"
  card-foreground: "{colors.foreground}"
  popover: "{colors.card}"
  popover-foreground: "{colors.foreground}"
  primary: "oklch(0.3777 0.1061 258.94)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.9630 0.0062 255.48)"
  secondary-foreground: "oklch(0.2903 0.0231 256.42)"
  muted: "{colors.secondary}"
  muted-foreground: "oklch(0.4606 0.0261 256.80)"
  accent: "oklch(0.9399 0.0259 259.05)"
  accent-foreground: "oklch(0.3106 0.0879 259.05)"
  destructive: "oklch(0.4545 0.1735 23.48)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.9244 0.0087 264.52)"
  input: "oklch(0.6312 0.0217 260.16)"
  ring: "oklch(0.5346 0.1296 258.70)"
  dark-background: "oklch(0.1801 0.0191 255.77)"
  dark-foreground: "{colors.background}"
  dark-card: "{colors.foreground}"
  dark-card-foreground: "{colors.background}"
  dark-popover: "oklch(0.2908 0.0247 258.35)"
  dark-popover-foreground: "{colors.background}"
  dark-primary: "oklch(0.7142 0.1079 258.74)"
  dark-primary-foreground: "oklch(0.2348 0.0671 258.73)"
  dark-secondary: "oklch(0.2908 0.0247 258.35)"
  dark-secondary-foreground: "{colors.background}"
  dark-muted: "oklch(0.2659 0.0236 256.43)"
  dark-muted-foreground: "oklch(0.7158 0.0184 256.31)"
  dark-accent: "oklch(0.3106 0.0879 259.05)"
  dark-accent-foreground: "oklch(0.9399 0.0259 259.05)"
  dark-destructive: "oklch(0.8549 0.0786 25.58)"
  dark-destructive-foreground: "oklch(0.1488 0.0216 259.63)"
  dark-border: "oklch(0.3192 0.0258 260.06)"
  dark-input: "oklch(0.5313 0.0218 255.61)"
  dark-ring: "{colors.dark-primary}"
typography:
  body:
    fontFamily: '"PP Mori", system-ui, sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  heading:
    fontFamily: "Domine, Georgia, serif"
    fontSize: 1.875rem
    fontWeight: 600
    lineHeight: 1.2
  code:
    fontFamily: '"Space Mono", ui-monospace, monospace'
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.625rem
components:
  body:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
  secondary-button:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
  muted-copy:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body}"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
  destructive-action:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.md}"
  muted-surface:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
  accent-surface:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
  field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
  input-surface:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.foreground}"
  dark-surfaces:
    backgroundColor: "{colors.dark-background}"
    textColor: "{colors.dark-foreground}"
  dark-card:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-card-foreground}"
  dark-popover:
    backgroundColor: "{colors.dark-popover}"
    textColor: "{colors.dark-popover-foreground}"
  dark-primary-button:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.dark-primary-foreground}"
  dark-secondary-button:
    backgroundColor: "{colors.dark-secondary}"
    textColor: "{colors.dark-secondary-foreground}"
  dark-muted-surface:
    backgroundColor: "{colors.dark-muted}"
    textColor: "{colors.dark-muted-foreground}"
  dark-accent-surface:
    backgroundColor: "{colors.dark-accent}"
    textColor: "{colors.dark-accent-foreground}"
  dark-destructive-action:
    backgroundColor: "{colors.dark-destructive}"
    textColor: "{colors.dark-destructive-foreground}"
  dark-field:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-foreground}"
---

## Overview

The approved direction is a calm, professional workspace for software teams. [Plane](https://github.com/makeplane/plane) and [Kaneo](https://github.com/usekaneo/kaneo) are the main open-source references; [Linear](https://linear.app/) is a secondary visual reference. Study their hierarchy and interaction patterns without copying their branding or assuming their features belong in Triage.

The semantic palette is defined for Triage in light and dark modes. Typography is selected for Triage: PP Mori for body and interface text, Domine for headings, and Space Mono for code.

## Colors

The palette uses slate-tinted surfaces with navy primary actions and distinct red destructive states. Values were supplied in hex and are stored as equivalent OKLCH values in CSS. Light tokens map directly to `:root` in `apps/client/src/styles.css`; `dark-*` tokens map to the `.dark` block. The current destructive button uses a translucent destructive fill and destructive-colored text. Add status or chart colors only when a feature needs them.

## Typography

PP Mori is bundled locally for body and interface text. Domine is bundled locally for headings, and Space Mono is self-hosted through Fontsource for code. Body text starts at the browser default size; heading leading stays compact, and code remains secondary to body text. Preserve browser text scaling.

## Layout

Use the existing Tailwind spacing scale, content-driven breakpoints, and readable measure. Keep primary actions and form targets usable at narrow widths and 200% zoom.

## Elevation & Depth

Prefer borders and surface contrast over decorative shadows. Add a small, documented elevation only for overlays or clearly separated navigation.

## Shapes

The radius family is intentionally moderate and concentric: nested controls should not appear rounder than their container.

## Components

Use Base UI shadcn primitives from `apps/client/src/components/ui`, semantic color utilities, visible keyboard focus, and explicit labels. Feature compositions belong in `apps/client/src/components`.

## Do's and Don'ts

- Do use semantic tokens and the configured icon family.
- Do keep destructive states recognizable with more than color alone.
- Don't add one-off hex values or a second general-purpose icon library.
- Don't change copied shadcn defaults without reconciling this document.

## Iconography

Use Tabler from `@tabler/icons-react` for interface icons. Keep its 2px default stroke and `currentColor`; use the surrounding component's icon sizing, or 16px for inline actions and 20px for standalone navigation icons. Align icons with their label baselines, and give icon-only controls an accessible name. Brand identities may use official brand assets; brand icons are not a replacement for interface icons.

## Implementation

The implementation uses Base UI, shadcn CSS variables, Tailwind v4, and `components.json`. Typography maps to Tailwind's `font-sans`, `font-serif`, and `font-mono` families; PP Mori and Domine are bundled locally, and Space Mono is self-hosted through Fontsource. `DESIGN.md` is canonical; shadcn configuration and CSS are implementations that must be reconciled after changes. Validate with `pnpm design:lint`.

The lint report may identify `ring` and dark border/input as unreferenced tokens because they are focus and control-boundary values rather than text foregrounds; they remain documented implementation roles in CSS.
