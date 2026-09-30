# Medic AI — Design System

Vercel-inspired clarity (black/white) + Linear-style dense lists. Prioritize one clear action, concise copy, and quiet surfaces.

## Tokens (source of truth: `src/styles/tokens.css`)

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FFFFFF` | `#0B0B0B` |
| `--surface` | `#FAFAFA` | `#111111` |
| `--fg` | `#0A0A0A` | `#F5F5F5` |
| `--muted` | `#6B6B6B` | `#9A9A9A` |
| `--border` | `#E6E6E6` | `#262626` |
| `--accent` | `#F26522` | `#F26522` |
| `--status-ok` | `#16A34A` | `#16A34A` |
| `--status-warn` | `#D97706` | `#D97706` |
| `--status-danger` | `#DC2626` | `#DC2626` |

## Typography

- **Family:** Inter (`@fontsource/inter`, weights 400, 600, 700)
- **Mobile scale:** 12, 14, 16, 20, 28, 40 px
- **Web scale:** 12, 13, 14, 16, 20, 24, 32, 48 px
- **Heading tracking:** 0
- **Body line-height:** 1.5

## Radius & spacing

- Input 8px, card 12px, chip 999px
- 4px grid: 4, 8, 12, 16, 24, 32, 48, 64

## Components

- **Primary button:** black on light / white on dark (not accent)
- **Accent (#F26522):** AI indicator, active tab dot, one link — max 1–2 per screen
- **Status colors:** small text, dots, and outline badges only
- **Cards:** prefer divider lists; when needed use a 1px border and 12px radius, no shadow
- **Sheet/modal shadow:** use the restrained `--shadow-elevated` token
- **Motion:** 150–200ms ease-out; respect `prefers-reduced-motion`
- **Icons:** lucide-react, stroke 1.5

## Layout

- **App:** 390×844 phone frame on desktop; tab bar 44px min touch targets
- **Pro:** sidebar 240px, topbar 56px, content max 1280px

## Anti-patterns

- No gradients, glass effects, or decorative AI patterns
- No repeated accent fills, colored CTA buttons, or several colored badges on one screen
- No repeated bold weights, long helper copy, or multi-level card nesting
- Prefer one-line metadata and divider-based lists over repetitive cards

## Content

- Uzbek (Latin), apostrophes `ʻ` and `’` — all copy in `src/content/uz.ts`
