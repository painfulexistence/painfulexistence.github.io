# Material Dark — Personal Brand Redesign Spec
_Date: 2026-06-22_
_Designer: Claude (Material Dark proposal)_
_Status: Approved for implementation_

---

## Core Concept

This site represents a person, not just a portfolio. Loïc is someone who builds his own rendering engines instead of using Unity — the same impulse that drives obsidian-dark fashion, blue hair streaks, and precise nail art. The visual language should feel like that: deliberate, weighted, not performing "engine engineer aesthetic" but simply being it.

**Defining question answered at every design decision:** does this feel like a person with taste, or a resume with animation?

---

## Confirmed Design Decisions

| Decision | Choice |
|---|---|
| Portfolio scope | Two self-built engines only on landing |
| Engine pages | External — `verse.lucidum.dev/atmospheric/` and `verse.lucidum.dev/vapor/` |
| About | Separate page (`/about`), independent from landing scroll flow |
| About content | 4 sentences of real language, no spec tables |
| Navbar | Ghost / disappearing top bar (replaces existing side nav) |
| Portfolio layout | Two full-viewport Case Study sections, not grid |

---

## Visual Identity

### Color Tokens

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#0a0908` | Warm black — slight brown undertone, not cold digital |
| `--surface-1` | `#131210` | Card / section background |
| `--surface-2` | `#1a1816` | Elevated elements |
| `--accent-blue` | `#4cc9f0` | Electric blue — primary accent |
| `--accent-purple` | `#6b5b9e` | Low-sat foggy purple — secondary, used sparingly |
| `--accent-bronze` | `#b8934a` | Oxidised bronze — tertiary, for dates / captions |
| `--text-primary` | `#e8e4df` | Warm white — not pure `#fff` |
| `--text-muted` | `#6b665f` | Captions, labels |
| `--line` | `rgba(232,228,223,0.08)` | Dividers, timeline line |

**Overall feeling:** You walk into a studio with the lights off. A monitor glows softly. Things have weight.

### Texture Layers (in z-order, all `pointer-events: none`)

1. **Three.js particle canvas** — existing, recolored (see below)
2. **Film grain overlay** — `<canvas>` animated noise, `opacity: 0.025`, `mix-blend-mode: overlay`
3. **Horizontal scanline** — repeating CSS gradient, `1px` lines, `opacity: 0.015` — CRT residue, almost invisible
4. **Radial vignette** — `radial-gradient` from transparent center to `rgba(0,0,0,0.4)` edges

### Three.js Starfield Adjustments

From current (`#001e0f` fog, green-tinted particles) to:
- Canvas / fog background: `#0a0908`
- Particle color: `#4cc9f0` at `opacity: 0.6` (electric blue tint)
- Particle count: reduce by 40%
- Particle speed: reduce by 40%
- Result: sparse dust floating in a dim beam of light, not a space scene

---

## Typography

**Pairing: Syne + Manrope + Space Mono**

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Hero name | Syne | 700 | Name, section titles |
| Body | Manrope | 300–500 | Paragraphs, descriptions |
| Data / Code | Space Mono | 400 | Dates, tech tags, captions — used minimally |

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
```

**Why Syne:** Uneven character widths create deliberate avant-garde tension without being loud. Matches the aesthetic precision of the brand.

**Why Manrope:** Geometric but warm; reads well at low brightness. Does not feel corporate.

**Space Mono constraint:** Only use for actual data — engine build date, render API version, year ranges. Never for decorative "look like code" text.

---

## Page Structure

```
/ (landing)
├── Hero
├── Portfolio: Atmospheric
├── Portfolio: Project Vapor
└── Experiences

/about
```

CV download lives in the Hero CTA and Experiences footer — not its own section.

---

## Section Designs

### Hero — "The Still Before"

Full viewport. Three.js canvas underneath. No split layout.

**Foreground (centered vertically, left-aligned at ~10vw):**

```
LOÏC CHEN
──────────────────────────
Render & Engine Engineer
```

- Name: Syne 700, `clamp(56px, 8vw, 96px)`, letter-spacing `0.04em`
- **Text mask effect:** name rendered as a CSS `background-clip: text` mask — Three.js particles show through the letterforms. Implementation: `color: transparent; background: canvas-snapshot or live WebGL texture; background-clip: text`
- If text mask is too costly perf-wise: fallback to `color: var(--text-primary)` with a subtle `text-shadow: 0 0 60px rgba(76,201,240,0.15)`
- Role line: Manrope 300, `18px`, `--text-muted`, appears character by character at 40ms/char delay after name settles (not Scramble — straight sequential `opacity: 0 → 1`)
- Horizontal rule: `1px solid var(--line)`, width `120px`, appears via `width: 0 → 120px` transition between name and role

**Bottom-left corner:**
```
scroll ↓
```
Space Mono 11px, `--text-muted`, blinking cursor `|` at 1.2s interval. Fades out when user scrolls past 20vh.

**Scroll exit:** Name fades to `opacity: 0` + `filter: blur(8px)` as scroll position passes 60vh. Role line fades to `opacity: 0` at 40vh. Canvas stays.

**Hero CTAs:**

Two text-only links, bottom-right, Manrope 14px:
- `View Engines ↓` — smooth scroll to Portfolio section
- `Download CV ↗` — PDF link, opens new tab

Hover: underline animates left-to-right (`width: 0 → 100%`, 200ms).

---

### Portfolio Section — Atmospheric

Full viewport height section. Horizontal split.

```
┌──────────────────────────────────────────────────────┐
│                                    │                 │
│   [Engine screenshot / render      │  Atmospheric    │
│    image, 58% width]               │  ───────────    │
│                                    │  C++ · OpenGL   │
│   Subtle parallax: image moves     │  4.6 · WASM     │
│   at 0.6× scroll speed             │                 │
│                                    │  PBR · CSM      │
│                                    │  SSAO · Bloom   │
│                                    │  HDR · FXAA     │
│                                    │                 │
│                                    │  [→ Open Engine │
│                                    │     Site]       │
└──────────────────────────────────────────────────────┘
```

**Right panel (no border, no card box):**
- Engine name: Syne 700, `36px`
- Thin horizontal rule: `40px`, accent-blue, appears via grow animation on section enter
- Tech line: Space Mono 12px, `--text-muted`, comma-separated
- Feature tags: Manrope 13px, `--text-muted`, each on own line with `·` prefix
- CTA: `[→ Open Engine Site]` links to `https://verse.lucidum.dev/atmospheric/`
  - Style: no box, no border, just text + arrow. Hover: arrow shifts right `4px`, 200ms spring

**Image treatment:**
- No grayscale filter — the render output speaks for itself
- Subtle `border-radius: 2px` on image
- On section enter (ScrollTrigger): image clips in from left via `clipPath: inset(0 100% 0 0) → inset(0 0% 0 0)`

---

### Portfolio Section — Project Vapor

Same structure as Atmospheric section, mirrored (image right, text left) for visual rhythm variation.

Links to `https://verse.lucidum.dev/vapor/`

Tech line: `C++20 · Vulkan 1.3 · WASM`
Features: based on actual Project Vapor capabilities (to be confirmed when filling content).

---

### Experiences — Timeline

Left-anchored vertical line, `2px solid var(--line)`.

Each entry:
```
●  LyraVR
   2021 – 2022
   VR Gameplay Programmer
```

- Node: `6px` solid circle, `var(--accent-blue)`, on the line
- Company: Syne 600, `20px`
- Date: Space Mono 11px, `--text-muted`
- Role: Manrope 400, `15px`, `--text-muted`
- No cards, no borders, no boxes

Three entries (existing data):
1. LyraVR — VR Gameplay Programmer (2021–2022)
2. Clubon — Full-Stack Web Developer & Game Programmer (2019–2021)
3. Digital Learning Center, NTU — Full-Stack Web Developer (2018–2019)

**Section footer:**
```
Full project history compiled in CV
[Download PDF ↗]
```
Manrope 14px. Same underline-grow hover as Hero CTAs.

---

## Navbar — Ghost Top Bar

**Default state: invisible.** `opacity: 0`, `pointer-events: none`.

**Reveal triggers (either):**
1. Cursor enters top 80px of viewport
2. Scroll velocity = 0 for 1.5 consecutive seconds (user has stopped reading)

**Reveal animation:** `translateY(-100%) → translateY(0)`, 250ms ease-out. Bar slides in from above.

**Hide triggers:**
1. Cursor leaves top 200px of viewport (after 800ms debounce)
2. User begins scrolling again

**Visual spec:**
```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 52px;
  backdrop-filter: blur(12px);
  background: rgba(10, 9, 8, 0.7);
  border-bottom: 1px solid var(--line);
  z-index: 100;
}
```

**Contents:**
- Left: `LOÏC` — Syne 700, 15px (home link)
- Right: `Engines · Work · About · CV ↗` — Manrope 13px, `--text-muted`
- Active section indicator: `--accent-blue` color on current link only

**Mobile (< 768px):** always-visible slim bar at bottom, same content, `height: 48px`.

---

## About Page (`/about`)

Separate route. Not part of landing scroll.

**Layout:** Single column, max-width `560px`, centered. Top padding `20vh`.

**Content structure:**
```
About

[4 sentences, Manrope 18px, line-height 1.8]

← Back
```

- Page title "About": Syne 700, 48px, `--text-primary`
- Body text: Manrope 18px, line-height 1.8, `--text-primary`
- **Content to write:** 4 genuine sentences. Suggested territory:
  - Why you build engines (not just use them)
  - What the blue hair / dark aesthetic means to you (or deliberately skip explanation — let it exist)
  - What you're currently interested in / working toward
  - Something that isn't about work
- Back link: `← Back` bottom-left, same text-link style

**Optional:** one image (personal photo or a render you love) floated left, max `280px` wide, `border-radius: 2px`. If no photo: fine — white space works.

Same Three.js background canvas as landing (shared component).

---

## Cursor

Inherited from existing `Cursor.jsx`, refined:

- Inner dot: `6px` solid, `var(--accent-blue)`, snaps to pointer (no lag)
- Outer ring: `28px`, `1px solid rgba(76,201,240,0.4)`, follows with `lerp(0.12)` lag
- On hover over links/buttons: outer ring contracts to `16px`, `border-color` intensifies to `rgba(76,201,240,0.8)`
- On click: outer ring pulses `scale(1.4) → scale(1)`, 200ms

---

## Animation System

### Entrance Animations (ScrollTrigger)

| Element | Animation | Duration |
|---|---|---|
| Portfolio image | `clipPath: inset(0 100% 0 0) → inset(0 0% 0 0)` | 700ms ease-out |
| Portfolio text block | `opacity: 0 + translateX(24px) → natural` | 500ms, 150ms after image starts |
| Timeline nodes | Stagger: each node fades in 80ms apart, top to bottom | — |
| Section titles | `opacity: 0 + translateY(16px) → natural` | 400ms |

### Microinteractions

| Element | Hover state |
|---|---|
| All text CTAs | Underline grows left→right, `200ms ease-out` |
| Engine site link `→` | Arrow shifts `+4px` X, spring `stiffness: 300, damping: 20` |
| Timeline company names | Color shifts to `--text-primary` from `--text-muted` |

### Page Load Sequence

1. `0ms` — Black screen
2. `0–400ms` — Particles emerge from center outward (Three.js `opacity: 0 → 1`, `scale: 0.3 → 1`)
3. `400–700ms` — Name appears (Syne text, `opacity: 0 → 1`)
4. `700–900ms` — Horizontal rule grows
5. `900ms+` — Role line types in character by character

### `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  /* All clipPath, translateX/Y animations: replace with opacity-only */
  /* Particle count: reduce to 30% */
  /* No scanline, no film grain canvas */
}
```

---

## Technical Notes

### Stack

Existing: React + Vite + Emotion styled-components + GSAP + Three.js / `@react-three/fiber`

No stack change proposed. Additions:
- `motion` (already in package.json) for spring physics on cursor + arrow microinteractions
- Film grain: `<canvas>` with `requestAnimationFrame` noise, detached from React render cycle

### Emotion Component Selector Constraint

Do **not** use `${StyledComponent}:hover &` pattern — this requires `@emotion/babel-plugin` which is not configured. Use `className`-based selectors instead:

```jsx
// ❌
const Inner = styled.div`
  ${Outer}:hover & { color: red; }
`

// ✓
<Outer className="card-outer">
  <Inner className="card-inner" />
</Outer>

// CSS:
.card-outer:hover .card-inner { color: red; }
```

### DevVerse iframe (Future)

Reserve `id="devverse-bg"` on the Three.js container div. When DevVerse is ready:
- Replace `<Canvas>` with `<iframe src="..." />` at same position/z-index
- Three.js component becomes fallback / loading state

### Route: `/about`

If not already using React Router, add:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Route: '/' → App (landing)
// Route: '/about' → About page
```

Vite config will need `base` and `404.html → index.html` redirect for GitHub Pages SPA routing.

---

## Open Questions

- [ ] What content goes on the Project Vapor engine site (`verse.lucidum.dev/vapor/`) — to be confirmed for Portfolio section feature list
- [ ] Personal photo on `/about` — yes / no / render image instead
- [ ] Text-mask hero effect — confirm acceptable perf on target devices, or use glow fallback
- [ ] CV file location — hosted in repo `public/` or external URL

---

## Files to Modify

| File | Change |
|---|---|
| `src/styles/global.css` | New token set, typography imports, scanline/vignette textures |
| `src/components/StarryBackground.jsx` | Recolor particles to cyan-blue, reduce count+speed, warm black fog |
| `src/components/Cursor.jsx` | Refine to 6px dot + 28px ring with lerp lag |
| `src/components/Navbar.jsx` | Ghost top bar with show/hide scroll + cursor logic |
| `src/sections/Home.jsx` | Full-viewport hero, text mask, sequential role type-in |
| `src/sections/Portfolio.jsx` | Two full-viewport Case Study sections replacing Masonry grid |
| `src/sections/Work.jsx` | Vertical timeline, no cards |
| `src/App.jsx` | Film grain canvas overlay, load sequence, route wiring |
| `src/pages/About.jsx` _(new)_ | Standalone `/about` page |
