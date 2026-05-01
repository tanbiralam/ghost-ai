# UI Context

## Theme

Dark only. No light mode. The visual language is a **frosted obsidian** technical workspace — cool near-black backgrounds with a blue tint, layered glass-like surfaces, and electric blue / indigo accent colors for interactive elements.

All colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Components must use these tokens — no hardcoded hex values or raw Tailwind color classes like `slate-*`.

| Role             | CSS Variable           | Hex / Value                |
| ---------------- | ---------------------- | -------------------------- |
| Page background  | `--bg-base`            | `#07080c`                  |
| Surface          | `--bg-surface`         | `#0e1018`                  |
| Elevated surface | `--bg-elevated`        | `#141720`                  |
| Subtle surface   | `--bg-subtle`          | `#1a1e28`                  |
| Default border   | `--border-default`     | `#232838`                  |
| Subtle border    | `--border-subtle`      | `#323a50`                  |
| Primary text     | `--text-primary`       | `#eef1f8`                  |
| Secondary text   | `--text-secondary`     | `#b8c2d8`                  |
| Muted text       | `--text-muted`         | `#6e7a96`                  |
| Faint text       | `--text-faint`         | `#404a5e`                  |
| Brand accent     | `--accent-primary`     | `#2e8fff` (electric blue)  |
| Brand dim        | `--accent-primary-dim` | `rgba(46, 143, 255, 0.12)` |
| AI accent        | `--accent-ai`          | `#5b4ef8` (indigo-violet)  |
| AI text          | `--accent-ai-text`     | `#9d93ff`                  |
| Error            | `--state-error`        | `#f55a5c`                  |
| Success          | `--state-success`      | `#2ecc8a`                  |
| Warning          | `--state-warning`      | `#f5b731`                  |

Tailwind utility names map to these variables. Use `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.

## Typography

| Role      | Font       | CSS Variable        |
| --------- | ---------- | ------------------- |
| UI text   | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

Both fonts are loaded via `next/font/google` and applied as CSS variables on the `<html>` element. The base `body` uses Geist Sans with `antialiased`.

## Border Radius

Radius increases with surface depth — smaller for inner elements, larger for outer containers.

| Context           | Class         |
| ----------------- | ------------- |
| Inline / small UI | `rounded-xl`  |
| Cards / panels    | `rounded-2xl` |
| Modal / overlay   | `rounded-3xl` |

## Canvas

### Node Color Palette

8 defined color pairs. Each pair specifies a dark node fill and a vivid contrasting text color tuned for readability on the dark canvas. Defined in `types/canvas.ts` as `NODE_COLORS`.

| Node fill | Text color | Character              |
| --------- | ---------- | ---------------------- |
| `#1a1e28` | `#dce3f0`  | Neutral cool (default) |
| `#0c1e40` | `#4da6ff`  | Blue                   |
| `#14103a` | `#9d93ff`  | Indigo                 |
| `#06202e` | `#38c6f0`  | Cyan                   |
| `#1e0e32` | `#c47aff`  | Purple                 |
| `#3a1618` | `#ff6166`  | Red                    |
| `#0d2018` | `#4dd9a0`  | Green                  |
| `#1e1508` | `#e8a040`  | Amber                  |

Default node color: `#1a1e28` with `#dce3f0` text.

### Edge Style

Smooth-step path with an arrow marker. Default edge color: `#b8c2d8`. Stroke width is thin — edges are visually secondary to nodes.

### Node Shapes

6 supported shapes, defined in `types/canvas.ts` as `NODE_SHAPES`. Complex shapes (diamond, hexagon, cylinder) are rendered as inline SVGs rather than CSS borders.

- `rectangle` — default general-purpose node
- `diamond` — decision / gateway
- `circle` — event / endpoint
- `pill` — service / process
- `cylinder` — database / storage
- `hexagon` — external system / boundary

### Connection Handles

Small white circular handles, hidden by default, revealed on node hover. Appear at all four sides of a node.

### Canvas Background

React Flow `<Background>` component. Canvas sits on the base background color.

## Component Library

shadcn/ui on top of Tailwind. No custom design system. Components live in `components/ui/`. Use the `shadcn` CLI to add new components rather than writing them from scratch.

## Layout Patterns

- Editor workspace: full-viewport layout — floating sidebar overlay on the left, center canvas, slide-over AI sidebar on the right.
- Sidebars: floating overlay with dark semi-transparent background and subtle border.
- Modals and dialogs: centered overlay, `rounded-3xl`, dark background with backdrop blur.
- Navbar: top bar with dark background and bottom border.

## Icons

Lucide React. Stroke-based icons only — no filled variants. Icon sizes: `h-4 w-4` for inline, `h-5 w-5` for buttons, `h-8 w-8` for feature icons in empty states.
