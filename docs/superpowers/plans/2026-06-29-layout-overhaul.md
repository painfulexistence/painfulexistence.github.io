# Layout Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the navbar to the top, enlarge hero text, replace stacked engine cards with a side-by-side video-header grid, and add a ghosted teaser section below the marquee.

**Architecture:** Three files change. `global.css` carries token + navbar style changes. `Home.jsx` adds top padding to clear the new navbar. `Portfolio.jsx` is fully rewritten from a stacked full-viewport layout to a two-column grid with video headers and a closing teaser section.

**Tech Stack:** React (Vite), Emotion styled-components, GSAP + ScrollTrigger, global CSS custom properties.

## Global Constraints

- Never hardcode font sizes, colors, or spacing — always reference `var(--token-name)` from `global.css`
- Emotion component selectors (`${StyledComp}`) require `@emotion/babel-plugin`; use `.classname` selectors instead
- All animation via GSAP; no CSS `transition` for entrance animations
- Video elements: `autoplay muted loop playsInline` — all four attributes required for autoplay to work cross-browser
- No actual video files required — `src` placeholders are fine; browser silently skips missing media
- Commit after every task

---

### Task 1: Navbar — Top Horizontal Bar

**Files:**
- Modify: `src/styles/global.css` — `.navbar`, `.navbar-logo`, `.navbar-links`, `.navbar-links a/button`, `.navbar-status`, mobile `@media` block

**What this does:** Repositions the fixed capsule nav from right-side vertical to full-width top horizontal. Logo left, links in a row, status right. Mobile bottom-bar stays unchanged.

- [ ] **Step 1: Open `src/styles/global.css` and locate the `.navbar` block (line ~185)**

The block to replace starts at `.navbar {` and ends just before the `/* Mobile */` `@media` block. Replace the entire desktop `.navbar` block and its child rules with:

```css
/* ============================================================
   NAVBAR — Top horizontal bar
   ============================================================ */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding: 0 32px;
  height: 52px;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  border-radius: 0;
}

.navbar-logo {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-bottom: 0;
  border-bottom: none;
  width: auto;
  text-align: left;
}

.navbar-links {
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: auto;
}

.navbar-links a,
.navbar-links button {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  display: block;
  width: auto;
  padding: 4px 0;
  letter-spacing: 0.06em;
  transition: color var(--t-fast);
}

.navbar-links a:hover,
.navbar-links button:hover {
  color: var(--accent);
}

.navbar-links a.active {
  color: var(--accent);
}

.navbar-status {
  padding-top: 0;
  border-top: none;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.navbar-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
  animation: breathe 2.4s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px #4ade80; }
  50%       { opacity: 0.4; box-shadow: none; }
}
```

- [ ] **Step 2: Verify the mobile `@media (max-width: 767px)` block is unchanged**

The mobile block should remain exactly as it was (bottom horizontal bar). No edits needed. Confirm it reads:

```css
@media (max-width: 767px) {
  .navbar {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    transform: none;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 0;
    border: none;
    border-top: 1px solid var(--line);
    padding: 10px 20px;
    gap: 0;
    height: auto;
  }
  /* ... rest of mobile rules unchanged */
}
```

- [ ] **Step 3: Manual verification — run dev server and check navbar**

```bash
npm run dev
```

Open browser. Confirm:
- Navbar is pinned to top, full width, ~52px tall
- Logo (`LC`) is left-aligned
- Links are a horizontal row in the middle
- `VULKAN: OK` + green dot is right-aligned
- Scrolling doesn't reveal content behind navbar (it will overlap hero — that's fixed in Task 2)
- On mobile (resize to < 767px): bottom bar still shows

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: move navbar to top horizontal bar"
```

---

### Task 2: Hero Padding + Larger Text Tokens

**Files:**
- Modify: `src/styles/global.css` — `--fs-hero`, `--lh-hero` tokens
- Modify: `src/sections/Home.jsx` — `HeroSection` padding-top

**What this does:** Enlarges the hero name and adds top padding so content clears the 52px navbar.

- [ ] **Step 1: Update type tokens in `src/styles/global.css`**

Find and replace in the `:root` block:

```css
/* BEFORE */
--fs-hero: clamp(52px, 8vw, 96px);
--lh-hero: 0.95;

/* AFTER */
--fs-hero: clamp(72px, 11vw, 140px);
--lh-hero: 0.9;
```

- [ ] **Step 2: Add top padding offset to `HeroSection` in `src/sections/Home.jsx`**

Find the `HeroSection` styled component (line ~6). Change `padding`:

```js
/* BEFORE */
const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 8vw 0 10vw;
    position: relative;

    @media (max-width: 900px) {
        justify-content: center;
        padding: 80px 8vw;
    }
`

/* AFTER */
const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 52px 8vw 0 10vw;
    position: relative;

    @media (max-width: 900px) {
        justify-content: center;
        padding: 132px 8vw 80px;
    }
`
```

- [ ] **Step 3: Manual verification**

With dev server running:
- Hero name (`LOÏC CHEN`) should be noticeably larger — fills the left half of the screen
- No content is hidden behind the navbar on load
- Scramble animation still plays on mount
- Typewriter role line still appears after name

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/sections/Home.jsx
git commit -m "feat: enlarge hero text and add navbar clearance padding"
```

---

### Task 3: Portfolio — Side-by-Side Video Card Grid

**Files:**
- Modify: `src/sections/Portfolio.jsx` — full rewrite of layout; marquee and TICKER constant kept

**What this does:** Replaces the alternating full-viewport `EngineCard` layout with a two-column grid of double-bezel cards, each topped with an autoplay video. Scroll-triggered entrance animates both cards in together.

- [ ] **Step 1: Rewrite `src/sections/Portfolio.jsx`**

Replace the entire file content with:

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const WorksSection = styled.div`
    padding: 120px 10vw 0;

    @media (max-width: 767px) {
        padding: 80px 6vw 0;
    }
`

const SectionHeader = styled.div`
    .label {
        font-family: var(--font-mono);
        font-size: var(--fs-mono-md);
        color: var(--accent);
        letter-spacing: var(--ls-mono-wide);
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    h2 {
        font-family: var(--font-display);
        font-size: var(--fs-section-title);
        font-weight: var(--fw-hero);
        color: var(--text-primary);
        letter-spacing: var(--ls-heading);
        margin-bottom: 48px;
    }
`

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    opacity: 0;
    transform: translateY(20px);

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`

const CardOuter = styled.div`
    background: rgba(9, 9, 11, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: border-color var(--t-normal);

    &:hover {
        border-color: rgba(0, 229, 255, 0.2);
    }
`

const CardInner = styled.div`
    background: var(--surface-2);
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    margin: 6px;
    border-radius: 2px;
    overflow: hidden;
    transition: border-color var(--t-normal);

    .card-outer:hover & {
        border-color: rgba(0, 229, 255, 0.18);
    }
`

const CardVideo = styled.video`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    filter: grayscale(0.5) brightness(0.85);
`

const CardBody = styled.div`
    padding: 24px 24px 28px;
`

const AccentLine = styled.div`
    width: 40px;
    height: 2px;
    background: var(--accent);
    margin-bottom: 18px;
    border-radius: 1px;
`

const EngineName = styled.h2`
    font-family: var(--font-display);
    font-size: var(--fs-heading);
    font-weight: var(--fw-heading);
    line-height: var(--lh-heading);
    color: var(--text-primary);
    margin-bottom: 10px;
`

const TechLine = styled.p`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    margin-bottom: 18px;
    text-transform: uppercase;
`

const FeatureList = styled.ul`
    list-style: none;
    margin-bottom: 24px;

    li {
        font-family: var(--font-body);
        font-size: var(--fs-body-sm);
        color: var(--text-muted);
        margin-bottom: 7px;
        padding-left: 14px;
        position: relative;
        line-height: var(--lh-body-sm);

        &::before {
            content: '//';
            position: absolute;
            left: 0;
            color: var(--accent);
            font-family: var(--font-mono);
            font-size: var(--fs-mono-xs);
            top: 1px;
        }
    }
`

const SiteLink = styled.a`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-md);
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: var(--ls-mono);
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: color var(--t-fast);

    .arrow {
        display: inline-block;
        transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover { color: var(--accent); }
    &:hover .arrow { transform: translateX(4px); }
`

const MarqueeWrap = styled.div`
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 10px 0;
    background: var(--surface-1);
    margin-top: 80px;
`

const MarqueeTrack = styled.div`
    display: flex;
    white-space: nowrap;
    animation: marquee 28s linear infinite;

    @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
    }
`

const MarqueeText = styled.span`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    text-transform: uppercase;
    padding-right: 48px;
`

const TICKER = 'VULKAN 1.3 // COMPUTE SHADERS // PBR RENDERING // CASCADED SHADOW MAPS // BINDLESS TEXTURES // RENDER GRAPHS // EMSCRIPTEN // WASM // '

const ENGINES = [
    {
        name: 'Atmospheric',
        tech: 'C++ · OpenGL 4.6 · Bullet Physics · Emscripten',
        features: [
            'PBR material pipeline (Cook-Torrance BRDF)',
            'Cascaded shadow maps & omnidirectional point shadows',
            'Post-process stack: HDR, Bloom, SSAO, FXAA',
            'Cross-platform: Native + WebAssembly (Emscripten)',
            'Entity-Component System architecture',
        ],
        href: 'https://verse.lucidum.dev/atmospheric/',
        videoSrc: '/videos/atmospheric.mp4',
    },
    {
        name: 'Project Vapor',
        tech: 'C++20 · Vulkan 1.3 · WASM',
        features: [
            'Render graph with auto-barrier synchronization',
            'Bindless texture array & GPU-driven rendering',
            'Custom Vulkan memory allocator integration',
            'Thread-safe ring buffer for GPU uploads',
            'Ray-traced shadow maps',
        ],
        href: 'https://verse.lucidum.dev/vapor/',
        videoSrc: '/videos/vapor.mp4',
    },
]

export default function Portfolio() {
    const gridRef = useRef(null)

    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return

        gsap.to(grid, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
        })

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <div id="engines">
            <WorksSection>
                <SectionHeader>
                    <p className="label">// 01 · MY WORKS</p>
                    <h2>My Works</h2>
                </SectionHeader>

                <CardGrid ref={gridRef}>
                    {ENGINES.map((engine) => (
                        <CardOuter key={engine.name} className="card-outer">
                            <CardInner className="card-inner">
                                <CardVideo
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    src={engine.videoSrc}
                                />
                                <CardBody>
                                    <AccentLine />
                                    <EngineName>{engine.name}</EngineName>
                                    <TechLine>{engine.tech}</TechLine>
                                    <FeatureList>
                                        {engine.features.map((f) => (
                                            <li key={f}>{f}</li>
                                        ))}
                                    </FeatureList>
                                    <SiteLink href={engine.href} target="_blank" rel="noopener noreferrer">
                                        OPEN ENGINE SITE <span className="arrow">→</span>
                                    </SiteLink>
                                </CardBody>
                            </CardInner>
                        </CardOuter>
                    ))}
                </CardGrid>
            </WorksSection>

            <MarqueeWrap>
                <MarqueeTrack>
                    <MarqueeText>{TICKER}</MarqueeText>
                    <MarqueeText>{TICKER}</MarqueeText>
                </MarqueeTrack>
            </MarqueeWrap>
        </div>
    )
}
```

- [ ] **Step 2: Manual verification**

With dev server running, scroll to the My Works section. Confirm:
- Two cards appear side by side
- Each card has a black video area (video silently absent since files don't exist — area should be empty/black, not broken)
- Card borders glow cyan on hover
- Both cards fade in together when scrolled into view
- On mobile width (< 767px): cards stack to single column
- Marquee ticker scrolls below the grid

- [ ] **Step 3: Commit**

```bash
git add src/sections/Portfolio.jsx
git commit -m "feat: replace stacked engine layout with side-by-side video card grid"
```

---

### Task 4: Teaser Section — "Something Big is coming soon."

**Files:**
- Modify: `src/sections/Portfolio.jsx` — add `TeaserSection` styled component and JSX after `<MarqueeWrap>`

**What this does:** Adds a full-viewport ghosted teaser section below the marquee. Text fades from opacity 0 to 0.12 on scroll entry.

- [ ] **Step 1: Add `TeaserSection` styled component to `Portfolio.jsx`**

After the `MarqueeText` styled component definition (before the `TICKER` constant), add:

```jsx
const TeaserSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const TeaserText = styled.p`
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 80px);
    font-weight: 800;
    color: var(--text-primary);
    opacity: 0;
    letter-spacing: var(--ls-hero);
    text-align: center;
`
```

- [ ] **Step 2: Add a `teaserRef` and GSAP animation in the `Portfolio` component**

Add `teaserRef` alongside `gridRef`:

```jsx
const gridRef   = useRef(null)
const teaserRef = useRef(null)
```

Add the teaser animation inside the existing `useEffect`, after the grid animation block and before the `return` cleanup:

```jsx
const teaser = teaserRef.current
if (teaser) {
    gsap.to(teaser, {
        opacity: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: teaser,
            start: 'top 75%',
            toggleActions: 'play none none none',
        },
    })
}
```

- [ ] **Step 3: Add JSX for the teaser after `</MarqueeWrap>`**

```jsx
<TeaserSection>
    <TeaserText ref={teaserRef}>Something Big is coming soon.</TeaserText>
</TeaserSection>
```

- [ ] **Step 4: Manual verification**

Scroll past the marquee. Confirm:
- A full-viewport dark section appears
- After scrolling the text into view, it fades to a very dim ghosted state (~10% opacity)
- No other elements in the section — just the text on black

- [ ] **Step 5: Commit**

```bash
git add src/sections/Portfolio.jsx
git commit -m "feat: add ghosted teaser section below marquee"
```

---

## Self-Review

**Spec coverage:**
- [x] Navbar top horizontal bar — Task 1
- [x] `--fs-hero` + `--lh-hero` token update — Task 2
- [x] Hero `padding-top` to clear navbar — Task 2
- [x] Side-by-side video card grid — Task 3
- [x] Double-bezel cards with video header — Task 3
- [x] Scroll-triggered entrance (grid together) — Task 3
- [x] Marquee unchanged below grid — Task 3
- [x] Teaser section `min-height: 100vh`, centered, ghosted text — Task 4
- [x] GSAP fade to `opacity: 0.12` on scroll — Task 4

**Placeholder scan:** None found. All steps include complete code.

**Type consistency:** `gridRef` and `teaserRef` both typed as `useRef(null)`. `CardOuter` uses `className="card-outer"` for Emotion selector compatibility (matches global constraint). `ScrollTrigger.getAll().forEach(t => t.kill())` cleanup covers both triggers registered in the single `useEffect`.
