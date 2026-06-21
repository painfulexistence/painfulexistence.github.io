# Personal Brand Landing Page — Design Spec
_Date: 2026-06-22_

## Context

Rebuilding `painfulexistence.github.io` as a personal brand site for Loïc Chen, a Render & Engine Engineer with deep expertise in C++ game engine development, computer graphics, and real-time VFX. The site doubles as a portfolio showcase for two self-built game engines: **Atmospheric** (OpenGL) and **Project Vapor** (Vulkan).

A defining future enhancement: the landing page background will embed **DevVerse**, a game built with Loïc's own engine, running inside an `<iframe>`. Players traverse a track past various works — the game itself is the portfolio.

---

## Visual Identity: Shibuya Goth-Tech（澀谷暗黑機能風）

Inspired by `gpt-taste` and `high-end-visual-design` principles. The aesthetic rejects the common AI-generated tropes (purple gradients, frosted glass cards) in favour of obsidian-dark hardware precision that matches both the engineer's technical background and personal style (blue-streak hair, dark fashion).

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| Background base | `#020202` (obsidian black) | Page / canvas base |
| Surface 1 | `#09090b` (matte carbon) | Card outer shell |
| Surface 2 | `#0a0a0c` | Card inner core |
| Accent | `#00e5ff` (electric cyan) | Brand highlight — references blue hair streak + emission shader glow |
| Text primary | `#e8e8e8` | Body copy |
| Text muted | `#666680` | Telemetry labels, captions |

### Typography

| Role | Font | Notes |
|---|---|---|
| Body | Plus Jakarta Sans | Primary readable font |
| Display / hero | Syne (wide) | Avant-garde headings |
| Code / telemetry | Space Mono | Compiler logs, HUD data, nav labels |

### Texture & Atmosphere

- **Film grain overlay** — fine noise filter (`<canvas>` or SVG feTurbulence) simulating analog film / hardware screen texture
- **3D starfield background** — existing Three.js `StarryBackground`, recolored: fog + canvas `#020202`, particles shifted to electric cyan-blue tint
- **Future: DevVerse iframe** — game running in background, player navigates a track past works; replaces Three.js starfield when ready

---

## Site Structure

| Route / Section | Description |
|---|---|
| `/` (Hero) | Landing — editorial split layout |
| `/` (Portfolio) | Two-engine case study grid |
| `/` (Experiences) | Work history in system-log format |
| `/about` | Separate page — personal spec bento |
| CV download link | Inline in nav or hero CTA |

### Portfolio Scope Decision

**Landing page shows only the two self-built engines.** Commercial projects appear only in the Experiences log + downloadable CV. Rationale: maximum signal-to-noise for engine/renderer hiring; personal engines are unambiguous solo proof of low-level mastery; prevents visual inconsistency with the Goth-Tech aesthetic.

---

## Layout Breakdown

### 1. Hero — Editorial Split

```
┌─────────────────────────────────────────────────────────┐
│  [LEFT 55%]                    [RIGHT 45%]              │
│                                                         │
│  LOÏC CHEN                     ┌──────────────────┐    │
│  (Syne, large)                 │ GPU TELEMETRY    │    │
│                                │ Frame: 0.83ms    │    │
│  Render & Engine Engineer      │ Tri: 2.4M        │    │
│  ──────────────────────        │ Particles: 80k   │    │
│  [Inline texture image         │ VULKAN: ●OK      │    │
│   — dark mesh / shader grid]   └──────────────────┘    │
│                                                         │
│  [View Engines ↗]  [Download CV ↗]                     │
└─────────────────────────────────────────────────────────┘
```

- **Inline typography images**: generated "dark woven mesh" and "C++ shader wireframe vector" assets embedded directly into the heading treatment
- **GPU telemetry panel**: right-side HUD displaying simulated Vulkan 1.3 render stats (frame time, triangle count, particle count, pipeline state)
- **Button-in-button CTA**: arrow `↗` has its own circular frame; hover triggers micro spring-physics displacement

### 2. Navbar — Right-Side Floating Capsule

- Vertical, fixed to right edge
- High-intensity `backdrop-filter: blur` on semi-transparent dark shell
- Items styled as monospace abbreviations: `[00] HOME`, `[01] ENGINES`, `[02] WORK`
- Bottom status indicator: breathing green `VULKAN: OK` pulse dot
- Mobile fallback: horizontal bar at bottom

### 3. Portfolio — Dual-Engine Case Study (2-column)

No Masonry / no 6-item grid. Two large cards side-by-side (or staggered vertically on mobile):

**Card: Project Vapor** (Vulkan 1.3 / C++20)
- Render graph, auto-barrier synchronization
- Custom VMA integration, thread-safe ring buffer
- Bindless texture array, GPU-driven rendering, ray-traced shadows

**Card: Atmospheric** (OpenGL 4.6 / C++ / Bullet Physics)
- PBR material pipeline (Cook-Torrance BRDF)
- Cascaded shadow maps, omnidirectional point shadows
- Post-process stack: HDR, Bloom, SSAO, FXAA
- Cross-platform: Native + WebAssembly (Emscripten)

Each card uses the **Concentric Double-Bezel system**:
- Outer shell: `border: 1px solid rgba(255,255,255,0.05)`, dark translucent bg
- Inner core: inset, deeper background, top-edge inset highlight shadow → hardware-slot haptic feel
- Images: grayscale + high-contrast filter at rest; full color on hover (smooth transition)

**Infinite Marquee ticker** below cards:
```
VULKAN API // COMPUTE SHADERS // PBR RENDERING // CASCADED SHADOW MAPS // BINDLESS TEXTURES //
```

### 4. Experiences — System Log Format

```
│ [SYS_LOG // COMMERCIAL_HIGHLIGHTS]
│
│ • LyraVR (VR Gameplay Programmer, 2021–2022)
│   VR audio core components, physics interaction systems
│
│ • Clubon (Full-Stack + Game Dev, 2019–2021)
│   Netflix x "The Victims' Game" ARG — PixiJS, millions of plays
│
│ • NTU Digital Learning Center (Full-Stack, 2018–2019)
│
│ [Full CV compiled → Download PDF ↗]
```

### 5. About — Separate Page (`/about`)

Personal spec displayed as system bento grid:

```
┌─────────────────────────────────────────┐
│ SYSTEM: LOÏC CHEN                       │
├──────────────┬──────────────────────────┤
│ SPECIALTY    │ Engine & Renderer Prog   │
│ STACK        │ C++20 / Vulkan / WASM    │
│ STYLE        │ Goth · Blue streak       │
│              │ Dark fashion             │
├──────────────┴──────────────────────────┤
│ GAMES PLAYED                            │
│ DARK SOULS · BLOODBORNE · HOLLOW KNIGHT │
└─────────────────────────────────────────┘
```

---

## Component Specs

### Cursor

Custom cursor with physics lag:
- Outer ring: radar/sonar circle, slow follow with spring delay
- Inner dot: solid, snaps immediately to pointer
- On interactive elements: outer ring contracts, accent color glow

### Double-Bezel Card

```css
/* Outer shell */
.card-outer {
  background: rgba(9, 9, 11, 0.6);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 4px;
}
/* Inner core */
.card-inner {
  background: #0a0a0c;
  border: 1px solid rgba(255,255,255,0.03);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  margin: 6px;
  border-radius: 2px;
}
/* Hover accent */
.card-outer:hover .card-inner {
  border-color: rgba(0, 229, 255, 0.3);
}
```

---

## Technical Stack

- **Framework**: React (Vite), existing codebase at `painfulexistence.github.io`
- **Styling**: Emotion styled-components + global CSS tokens
- **Animation**: GSAP + ScrollTrigger (existing), `motion` library for spring physics
- **3D**: Three.js via `@react-three/fiber` (existing starfield, recolored)
- **Emotion note**: Component selectors (`${StyledComp}:hover &`) require `@emotion/babel-plugin`; use className-based selectors instead to avoid runtime errors (already fixed in prior session)
- **Future**: DevVerse game iframe replacing Three.js starfield background

---

## Known Issues Fixed in Prior Session

- Emotion `Component selectors can only be used in conjunction with @emotion/babel-plugin` error: resolved by replacing `${CardOuter}:hover &` with `.project-card-outer:hover &` className selectors in `Project.jsx`

---

## Files Affected

| File | Change |
|---|---|
| `src/styles/global.css` | Design tokens, double-bezel styles, cursor HUD, noise filter |
| `src/components/Cursor.jsx` | Radar ring + spring-lag physics cursor |
| `src/components/Navbar.jsx` | Right-side floating capsule nav |
| `src/components/Project.jsx` | Double-bezel card system |
| `src/components/StarryBackground.jsx` | Particle color + fog recolor to obsidian/cyan |
| `src/sections/Home.jsx` | Editorial split hero + telemetry HUD |
| `src/sections/Portfolio.jsx` | Dual-engine case study + infinite marquee |
| `src/sections/Work.jsx` | System-log experience cards |
| `src/sections/About.jsx` | Personal spec bento grid |
| `src/App.jsx` | Film grain overlay, background glow, scroll safety |
| `DESIGN.md` | Updated design token spec |

---

## Open Questions / Next Steps

- [ ] Finalize visual comparison between Approach A (2-col editorial split) and Approach B (single-col deep case study) for Portfolio section — use `/taste` or `frontend-design` skill for mockups
- [ ] Confirm CV download link format (hosted PDF vs GitHub release asset)
- [ ] DevVerse iframe integration timeline — placeholder Three.js background until game is ready
- [ ] `/about` as separate route (React Router) vs scroll section
- [ ] Whether to include a "View Source on GitHub" link per engine card
