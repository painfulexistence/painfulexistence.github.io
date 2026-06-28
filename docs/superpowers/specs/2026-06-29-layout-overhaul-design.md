# Layout Overhaul — Design Spec
_Date: 2026-06-29_

## Context

Iteration on the existing Goth-Tech theme (`theme/goth-tech` branch). Four targeted layout and content changes to the landing page. No visual identity changes — all tokens, fonts, and overlays remain as-is.

---

## Changes

### 1. Navbar — Top Horizontal Bar

**From**: Right-side vertical floating capsule (`position: fixed; top: 50%; right: 24px; flex-direction: column`).

**To**: Full-width horizontal bar pinned to top of viewport.

Layout:
```
┌────────────────────────────────────────────────────────────────┐
│  LC      [00] HOME  [01] ENGINES  [02] ABOUT  [CV] ↗   ● VULKAN: OK │
└────────────────────────────────────────────────────────────────┘
```

- `position: fixed; top: 0; left: 0; right: 0` — full width
- `flex-direction: row; align-items: center; justify-content: space-between`
- Same `backdrop-filter: blur(16px)` glass dark shell, `border-bottom: 1px solid var(--line)`
- Logo (`LC`) left-aligned, links center-left, status indicator right
- `border-radius: 0` (edge-to-edge)
- Height: `~52px`
- Hero section gets `padding-top` offset to clear the navbar height (e.g. `80px`)
- Mobile: collapses to same horizontal bottom bar (existing behavior — no change needed)

**Files**: `src/styles/global.css` (`.navbar`, `.navbar-logo`, `.navbar-links`, `.navbar-status`)

---

### 2. Hero — Larger Display Text

**From**: `--fs-hero: clamp(52px, 8vw, 96px)`

**To**: `clamp(72px, 11vw, 140px)`

- Update token in `global.css`
- `--lh-hero` tightened to `0.9` (from `0.95`) to keep two-line stack compact
- No other changes to hero layout or animations

**Files**: `src/styles/global.css` (`--fs-hero`, `--lh-hero`)

---

### 3. My Works — Side-by-Side Card Grid with Video Header

**From**: Two full-viewport alternating stacked `EngineCard` sections (image left/right split, scroll-triggered reveal).

**To**: Two-column card grid, both cards visible simultaneously. Each card has a video header.

#### Card Structure

```
┌──────────────────────┐  ┌──────────────────────┐
│  [video autoplay]    │  │  [video autoplay]    │
│  ─────────────────   │  │  ─────────────────   │
│  Engine Name         │  │  Engine Name         │
│  tech · stack        │  │  tech · stack        │
│  // feature 1        │  │  // feature 1        │
│  // feature 2        │  │  // feature 2        │
│  OPEN ENGINE SITE →  │  │  OPEN ENGINE SITE →  │
└──────────────────────┘  └──────────────────────┘
```

- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px`
- Each card uses the **double-bezel system** (`card-outer` / `card-inner`) — same as existing
- Video element: `<video autoplay muted loop playsInline>` with `width: 100%; aspect-ratio: 16/9; object-fit: cover`
- Video files: placeholder `src` attributes pointing to `/videos/atmospheric.mp4` and `/videos/vapor.mp4` — not required to exist at implementation time (cards degrade gracefully if missing)
- Scroll-triggered entrance: both cards fade in together (single ScrollTrigger on the grid container), not staggered left/right
- Hover: no image grayscale toggle needed (video plays always) — card border accent-glow on hover is sufficient
- Mobile (`max-width: 767px`): `grid-template-columns: 1fr` (single column stack)
- Section header (`// 01 · MY WORKS`) stays as-is above the grid
- Marquee ticker stays below the grid, unchanged

**Refactor note**: The existing `EngineCard` component and its `EngineSection` full-viewport layout can be removed entirely. Replace `Portfolio.jsx` with the new grid layout. The `ImageWrap` / `InfoOuter` / `InfoCard` / `InfoCardInner` styled components are also replaced.

**Files**: `src/sections/Portfolio.jsx` (full rewrite of layout; keep data constants and marquee)

---

### 4. Below Marquee — "Something Big is coming soon." Teaser

**New section** added directly after the `<MarqueeWrap>` in `Portfolio.jsx` (or as a standalone section in `App.jsx` after `<Portfolio />`).

- `min-height: 100vh`
- Vertically and horizontally centered content
- Single line of text: `Something Big is coming soon.`
- Font: `var(--font-display)` (Syne), `clamp(36px, 6vw, 80px)`, weight `800`
- Color: `var(--text-primary)` at very low opacity: `opacity: 0.12`
- No border, no card, no label — just the ghosted text on obsidian black
- GSAP fade-in on scroll: animates from `opacity: 0` to `opacity: 0.12` when entering viewport
- No other content in this section

**Files**: `src/sections/Portfolio.jsx` (add `TeaserSection` styled component after marquee)

---

## Files Affected

| File | Change |
|---|---|
| `src/styles/global.css` | Navbar top-bar styles; `--fs-hero` / `--lh-hero` token update |
| `src/sections/Home.jsx` | Add `padding-top` to `HeroSection` to clear navbar height |
| `src/sections/Portfolio.jsx` | Full rewrite: side-by-side video cards + teaser section |

---

## Out of Scope

- No changes to `Cursor.jsx`, `StarryBackground.jsx`, `App.jsx`, `Work.jsx`, `About.jsx`
- No new routes
- No actual video files required — placeholders are acceptable
- No changes to color tokens, typography scale (except `--fs-hero`), or overlays
