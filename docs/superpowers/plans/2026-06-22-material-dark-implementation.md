# Material Dark — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `painfulexistence.github.io` with the Material Dark visual identity — Syne/Manrope/Space Mono typography, warm obsidian palette, ghost navbar, full-viewport engine case studies, vertical timeline, and a standalone `/about` route.

**Architecture:** Existing React + Vite + Emotion + GSAP + Three.js stack is kept intact. We replace the entire visual layer (CSS tokens, all section components, Navbar, Cursor, StarryBackground) and add React Router for the `/about` route. `style.css` is already dead (commented out in `main.jsx`) and stays that way.

**Tech Stack:** React 19, Emotion styled-components, GSAP + ScrollTrigger, Three.js via @react-three/fiber, `motion` (already in package.json), React Router DOM (new install), Vite.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/styles/global.css` | Modify | All CSS custom properties, font import, scanline/vignette, cursor, reduced-motion |
| `src/components/StarryBackground.jsx` | Modify | Recolor particles + fog to warm-black/cyan |
| `src/components/Cursor.jsx` | Modify | 6px dot + 28px lagging ring, hover contraction, click pulse |
| `src/components/Navbar.jsx` | Rewrite | Ghost top bar, show/hide on cursor-top + scroll-stop, CV download link |
| `src/sections/Home.jsx` | Rewrite | Full-viewport hero, sequential role type-in, scroll-exit blur |
| `src/sections/Portfolio.jsx` | Rewrite | Two full-viewport engine case study sections with clipPath reveal |
| `src/sections/Work.jsx` | Rewrite | Vertical timeline, no cards |
| `src/pages/About.jsx` | Create | Standalone `/about` page, same canvas background |
| `src/App.jsx` | Modify | Add React Router, film grain canvas overlay, load sequence, remove old sections wiring |
| `public/cv/loic-chen-cv.pdf` | Add | CV file for download (placeholder path — real file to be added manually) |

---

## Task 1: Install React Router and update global CSS tokens

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Install react-router-dom**

```bash
cd /Users/loicchen/Desktop/code/etc/painfulexistence.github.io
bun add react-router-dom
```

Expected: `react-router-dom` added to `package.json` dependencies.

- [ ] **Step 2: Replace global.css with Material Dark tokens**

Replace the entire contents of `src/styles/global.css`:

```css
/* ============================================================
   MATERIAL DARK — Design Tokens
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

:root {
  /* Colors */
  --bg:            #0a0908;
  --surface-1:     #131210;
  --surface-2:     #1a1816;
  --accent-blue:   #4cc9f0;
  --accent-purple: #6b5b9e;
  --accent-bronze: #b8934a;
  --text-primary:  #e8e4df;
  --text-muted:    #6b665f;
  --line:          rgba(232, 228, 223, 0.08);

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body:    'Manrope', sans-serif;
  --font-mono:    'Space Mono', monospace;

  /* Spacing */
  --spacing-xs:  10px;
  --spacing-sm:  20px;
  --spacing-md:  32px;
  --spacing-lg:  64px;
  --spacing-xl:  96px;

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --t-fast:   150ms;
  --t-normal: 250ms;
  --t-slow:   700ms;
}

/* ============================================================
   RESET & BASE
   ============================================================ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 400;
  color: var(--text-primary);
  background-color: var(--bg);
  line-height: 1.6;
  cursor: none;
  -webkit-font-smoothing: antialiased;
}

/* ============================================================
   CURSOR
   ============================================================ */

.cursor-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-blue);
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width var(--t-fast), height var(--t-fast), background var(--t-fast);
}

.cursor-ring {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(76, 201, 240, 0.4);
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width var(--t-normal), height var(--t-normal), border-color var(--t-normal);
}

.cursor-ring.is-hovering {
  width: 16px;
  height: 16px;
  border-color: rgba(76, 201, 240, 0.8);
}

.cursor-ring.is-clicking {
  width: 38px;
  height: 38px;
}

/* ============================================================
   SCANLINE & VIGNETTE (pointer-events: none overlays)
   ============================================================ */

.scanline-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.015) 2px,
    rgba(0, 0, 0, 0.015) 4px
  );
}

.vignette-overlay {
  position: fixed;
  inset: 0;
  z-index: 51;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

/* ============================================================
   FILM GRAIN CANVAS
   ============================================================ */

#film-grain {
  position: fixed;
  inset: 0;
  z-index: 52;
  pointer-events: none;
  opacity: 0.025;
  mix-blend-mode: overlay;
}

/* ============================================================
   NAVBAR
   ============================================================ */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(10, 9, 8, 0.7);
  border-bottom: 1px solid var(--line);
  z-index: 100;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform var(--t-normal) var(--ease-out),
              opacity var(--t-normal) var(--ease-out);
}

.navbar.visible {
  transform: translateY(0);
  opacity: 1;
}

.navbar-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.05em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  list-style: none;
}

.navbar-links a {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--t-fast);
  position: relative;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-blue);
  transition: width var(--t-normal) var(--ease-out);
}

.navbar-links a:hover {
  color: var(--text-primary);
}

.navbar-links a:hover::after {
  width: 100%;
}

.navbar-links a.active {
  color: var(--accent-blue);
}

/* CV download link */
.navbar-cv {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--t-fast);
  cursor: pointer;
}

.navbar-cv:hover {
  color: var(--accent-blue);
}

/* Mobile navbar: always-visible bottom bar */
@media (max-width: 767px) {
  .navbar {
    top: auto;
    bottom: 0;
    transform: translateY(0);
    opacity: 1;
    border-top: 1px solid var(--line);
    border-bottom: none;
    height: 48px;
  }
  .navbar.visible {
    transform: translateY(0);
  }
}

/* ============================================================
   SECTION SHARED
   ============================================================ */

.section-full {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
}

/* ============================================================
   TEXT LINKS (underline-grow style)
   ============================================================ */

.text-link {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  position: relative;
  transition: color var(--t-fast);
  cursor: pointer;
}

.text-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-blue);
  transition: width var(--t-normal) var(--ease-out);
}

.text-link:hover {
  color: var(--text-primary);
}

.text-link:hover::after {
  width: 100%;
}

/* ============================================================
   REDUCED MOTION
   ============================================================ */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .scanline-overlay,
  #film-grain {
    display: none;
  }
}
```

- [ ] **Step 3: Start dev server and verify fonts load**

```bash
cd /Users/loicchen/Desktop/code/etc/painfulexistence.github.io
bun run start
```

Open `http://localhost:5173` — background should be warm dark `#0a0908`, body font should be Manrope. Check browser console for errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css bun.lockb package.json
git commit -m "feat: install react-router-dom, replace global CSS with Material Dark tokens"
```

---

## Task 2: Recolor StarryBackground

**Files:**
- Modify: `src/components/StarryBackground.jsx`

- [ ] **Step 1: Rewrite StarryBackground with warm-black fog and cyan particles**

Replace `src/components/StarryBackground.jsx` entirely:

```jsx
import { useEffect, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function StarryBackground() {
    const starsRef = useRef()
    const { camera } = useThree()

    const starsGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        const positions = []
        const colors = []

        // 2400 particles (40% reduction from 4000)
        for (let i = 0; i < 2400; i++) {
            positions.push(
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500)
            )
            // Cyan-blue tint: hue ~0.54 (194° — matches #4cc9f0)
            const color = new THREE.Color()
            color.setHSL(0.54, 0.7, THREE.MathUtils.randFloat(0.3, 0.7))
            colors.push(color.r, color.g, color.b)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        return geometry
    }, [])

    const starsMaterial = useMemo(() => new THREE.PointsMaterial({
        size: 1.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
    }), [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            // Speed reduced: multiply by 0.6 (40% slower than original)
            camera.position.setZ(100 - 60 * (scrollTop / Math.max(1, scrollHeight)))
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [camera])

    return (
        <>
            {/* Warm obsidian background — slight brown undertone */}
            <color attach="background" args={['#0a0908']} />
            <fog attach="fog" args={['#0a0908', 50, 500]} />

            <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />

            <ambientLight intensity={0.05} />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.05}
            />

            <EffectComposer>
                <Bloom
                    intensity={1.2}
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </>
    )
}
```

- [ ] **Step 2: Verify in browser**

The starfield should be sparse cyan-blue dust on a warm black background. Auto-rotation is very slow. No green tint.

- [ ] **Step 3: Commit**

```bash
git add src/components/StarryBackground.jsx
git commit -m "feat: recolor starfield to cyan-blue particles on warm obsidian background"
```

---

## Task 3: Refine Cursor

**Files:**
- Modify: `src/components/Cursor.jsx`

- [ ] **Step 1: Rewrite Cursor with dot + lagging ring**

Replace `src/components/Cursor.jsx` entirely:

```jsx
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Cursor() {
    // Dot follows cursor exactly
    const [dot, setDot] = useState({ x: 0, y: 0 })
    // Ring follows with lerp lag
    const ringPos = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)
    const ringRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const animate = useCallback(() => {
        // lerp factor 0.12 — visibly lags behind
        ringPos.current.x += (target.current.x - ringPos.current.x) * 0.12
        ringPos.current.y += (target.current.y - ringPos.current.y) * 0.12
        if (ringRef.current) {
            ringRef.current.style.left = ringPos.current.x + 'px'
            ringRef.current.style.top  = ringPos.current.y + 'px'
        }
        rafRef.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        const onMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY }
            setDot({ x: e.clientX, y: e.clientY })
        }
        const onMouseOver = (e) => {
            const el = e.target.closest('a, button, [data-cursor-hover]')
            setIsHovering(!!el)
        }
        const onDown = () => setIsClicking(true)
        const onUp   = () => setIsClicking(false)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onMouseOver)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup',   onUp)
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onMouseOver)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup',   onUp)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [animate])

    const ringClass = [
        'cursor-ring',
        isHovering ? 'is-hovering' : '',
        isClicking ? 'is-clicking' : '',
    ].filter(Boolean).join(' ')

    return (
        <>
            <div
                className="cursor-dot"
                style={{ left: dot.x, top: dot.y }}
            />
            <div ref={ringRef} className={ringClass} />
        </>
    )
}
```

- [ ] **Step 2: Verify cursor in browser**

Move mouse slowly — ring should visibly lag behind the dot. Hover over a link — ring should contract. Click — ring should briefly expand.

- [ ] **Step 3: Commit**

```bash
git add src/components/Cursor.jsx
git commit -m "feat: cursor — 6px snap dot + 28px lagging ring with hover/click states"
```

---

## Task 4: Ghost Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Rewrite Navbar as ghost top bar**

Replace `src/components/Navbar.jsx` entirely:

```jsx
import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const location = useLocation()
    const idleTimer = useRef(null)
    const lastScrollY = useRef(0)
    const scrolling = useRef(false)

    const show = useCallback(() => setVisible(true), [])
    const hide = useCallback(() => setVisible(false), [])

    const resetIdleTimer = useCallback(() => {
        clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(() => {
            // User stopped scrolling for 1.5s — reveal navbar
            show()
        }, 1500)
    }, [show])

    useEffect(() => {
        // Cursor enters top 80px → show
        const onMouseMove = (e) => {
            if (e.clientY < 80) {
                show()
            } else if (e.clientY > 200 && !scrolling.current) {
                // Debounce: only hide when cursor is well below navbar zone
                hide()
            }
        }

        // Scroll starts → hide; scroll stops 1.5s → show
        const onScroll = () => {
            scrolling.current = true
            hide()
            clearTimeout(idleTimer.current)
            idleTimer.current = setTimeout(() => {
                scrolling.current = false
                show()
            }, 1500)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            clearTimeout(idleTimer.current)
        }
    }, [show, hide])

    // On /about page: always show navbar
    const isAbout = location.pathname === '/about'

    return (
        <nav className={`navbar${visible || isAbout ? ' visible' : ''}`}>
            <Link to="/" className="navbar-logo">LOÏC</Link>
            <ul className="navbar-links">
                <li>
                    <a
                        href="#engines"
                        onClick={(e) => {
                            if (location.pathname !== '/') return
                            e.preventDefault()
                            document.getElementById('engines')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Engines
                    </a>
                </li>
                <li>
                    <a
                        href="#work"
                        onClick={(e) => {
                            if (location.pathname !== '/') return
                            e.preventDefault()
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Work
                    </a>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <a
                        href="/cv/loic-chen-cv.pdf"
                        download
                        className="navbar-cv"
                    >
                        CV ↗
                    </a>
                </li>
            </ul>
        </nav>
    )
}
```

- [ ] **Step 2: Add CV placeholder to public/**

```bash
mkdir -p /Users/loicchen/Desktop/code/etc/painfulexistence.github.io/public/cv
touch /Users/loicchen/Desktop/code/etc/painfulexistence.github.io/public/cv/loic-chen-cv.pdf
```

Replace this placeholder with the real PDF before deploying.

- [ ] **Step 3: Verify show/hide behaviour**

In browser: navbar should be invisible on load. Move cursor to top 80px of screen — navbar slides down. Scroll — navbar hides. Wait 1.5s without scrolling — navbar reappears. On mobile it stays fixed at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx public/cv/
git commit -m "feat: ghost navbar — shows on cursor-top or scroll-stop, CV download link"
```

---

## Task 5: Hero Section

**Files:**
- Modify: `src/sections/Home.jsx`

- [ ] **Step 1: Rewrite Home.jsx**

Replace `src/sections/Home.jsx` entirely:

```jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styled from '@emotion/styled'

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 10vw;
    position: relative;
`

const HeroContent = styled.div`
    max-width: 700px;
`

const HeroName = styled.h1`
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 20px;
    /* Subtle blue glow — fallback for text-mask */
    text-shadow: 0 0 80px rgba(76, 201, 240, 0.12);
`

const HeroRule = styled.div`
    width: 0;
    height: 1px;
    background: var(--line);
    margin-bottom: 20px;
`

const HeroRole = styled.p`
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    color: var(--text-muted);
    margin-bottom: 0;
    opacity: 0;
`

const HeroCtas = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 48px;
`

const ScrollHint = styled.div`
    position: absolute;
    bottom: 40px;
    left: 10vw;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    gap: 8px;

    &::after {
        content: '|';
        animation: blink 1.2s step-end infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
    }
`

const ROLE_TEXT = 'Render & Engine Engineer'

export default function Home() {
    const nameRef    = useRef(null)
    const ruleRef    = useRef(null)
    const roleRef    = useRef(null)
    const ctasRef    = useRef(null)
    const scrollHint = useRef(null)
    const sectionRef = useRef(null)
    const [roleChars, setRoleChars] = useState([])

    useEffect(() => {
        // Sequence: name → rule → role type-in → CTAs
        const tl = gsap.timeline({ delay: 0.4 })

        // 1. Name fades in
        tl.fromTo(nameRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )

        // 2. Rule grows
        tl.to(ruleRef.current,
            { width: '120px', duration: 0.4, ease: 'power2.out' },
            '-=0.2'
        )

        // 3. Role types in character by character
        tl.add(() => {
            let i = 0
            const interval = setInterval(() => {
                i++
                setRoleChars(ROLE_TEXT.slice(0, i).split(''))
                if (i >= ROLE_TEXT.length) clearInterval(interval)
            }, 40)
        })

        // 4. Role container fades in
        tl.to(roleRef.current,
            { opacity: 1, duration: 0.1 },
            '-=0'
        )

        // 5. CTAs
        tl.fromTo(ctasRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '+=0.8'
        )

        // Scroll exit: name blurs out as user scrolls past 60vh
        const handleScroll = () => {
            if (!sectionRef.current) return
            const scrollY = window.scrollY
            const vh = window.innerHeight
            // Start blur at 40vh, complete at 80vh
            const progress = Math.min(Math.max((scrollY - vh * 0.4) / (vh * 0.4), 0), 1)
            if (nameRef.current) {
                nameRef.current.style.opacity = 1 - progress
                nameRef.current.style.filter  = `blur(${progress * 8}px)`
            }
            if (roleRef.current) {
                roleRef.current.style.opacity = Math.max(0, 1 - progress * 1.5)
            }
            if (scrollHint.current) {
                scrollHint.current.style.opacity = scrollY > 20 ? 0 : 1
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <HeroSection ref={sectionRef}>
            <HeroContent>
                <HeroName ref={nameRef} style={{ opacity: 0 }}>
                    LOÏC CHEN
                </HeroName>
                <HeroRule ref={ruleRef} />
                <HeroRole ref={roleRef}>
                    {roleChars.join('')}
                </HeroRole>
                <HeroCtas ref={ctasRef} style={{ opacity: 0 }}>
                    <a href="#engines" className="text-link"
                       onClick={(e) => {
                           e.preventDefault()
                           document.getElementById('engines')?.scrollIntoView({ behavior: 'smooth' })
                       }}>
                        View Engines ↓
                    </a>
                    <a href="/cv/loic-chen-cv.pdf" download className="text-link">
                        Download CV ↗
                    </a>
                </HeroCtas>
            </HeroContent>

            <ScrollHint ref={scrollHint}>scroll ↓</ScrollHint>
        </HeroSection>
    )
}
```

- [ ] **Step 2: Verify in browser**

On page load: name fades in → rule grows → role types in char by char → CTAs appear. Scroll down — name blurs out. Scroll hint disappears after scrolling.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Home.jsx
git commit -m "feat: hero — sequential type-in entrance, scroll-exit blur, CTA text links"
```

---

## Task 6: Portfolio — Dual Engine Case Studies

**Files:**
- Modify: `src/sections/Portfolio.jsx`

- [ ] **Step 1: Rewrite Portfolio.jsx with two full-viewport engine sections**

Replace `src/sections/Portfolio.jsx` entirely:

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'
import imgAtmospheric from '../assets/images/atmospheric_2.png'
import imgPlayReal from '../assets/images/playreal_2.png'

gsap.registerPlugin(ScrollTrigger)

const EngineSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 10vw;
    position: relative;
    overflow: hidden;

    &.reverse {
        flex-direction: row-reverse;
    }
`

const ImageWrap = styled.div`
    flex: 0 0 58%;
    max-width: 58%;
    overflow: hidden;
    border-radius: 2px;
    clip-path: inset(0 100% 0 0);

    img {
        width: 100%;
        height: 65vh;
        object-fit: cover;
        border-radius: 2px;
        display: block;
        /* Parallax transform set via JS */
        will-change: transform;
    }

    @media (max-width: 767px) {
        flex: 0 0 100%;
        max-width: 100%;
        height: 45vw;
        img { height: 45vw; }
    }
`

const InfoWrap = styled.div`
    flex: 1;
    padding: 0 48px;
    opacity: 0;
    transform: translateX(24px);

    .reverse & {
        transform: translateX(-24px);
        padding: 0 48px 0 0;
    }

    @media (max-width: 767px) {
        position: absolute;
        bottom: 40px;
        left: 10vw;
        right: 10vw;
        padding: 0;
        background: rgba(10, 9, 8, 0.85);
        backdrop-filter: blur(8px);
        padding: 24px;
        border-radius: 2px;
    }
`

const AccentLine = styled.div`
    width: 0;
    height: 3px;
    background: var(--accent-blue);
    margin-bottom: 20px;
    border-radius: 1px;
`

const EngineName = styled.h2`
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
`

const TechLine = styled.p`
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    margin-bottom: 20px;
`

const FeatureList = styled.ul`
    list-style: none;
    margin-bottom: 32px;

    li {
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--text-muted);
        margin-bottom: 8px;
        padding-left: 16px;
        position: relative;

        &::before {
            content: '·';
            position: absolute;
            left: 0;
            color: var(--accent-blue);
        }
    }
`

const SiteLink = styled.a`
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 150ms;
    cursor: pointer;

    .arrow {
        display: inline-block;
        transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover {
        color: var(--text-primary);
    }
    &:hover .arrow {
        transform: translateX(4px);
    }
`

function EngineCard({ id, name, tech, features, href, imgSrc, imgAlt, reverse }) {
    const sectionRef = useRef(null)
    const imageWrapRef = useRef(null)
    const imgRef = useRef(null)
    const infoRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const imageWrap = imageWrapRef.current
        const img = imgRef.current
        const info = infoRef.current
        const line = lineRef.current

        if (!section || !imageWrap || !info || !line) return

        // Clip-path reveal on scroll enter
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        })

        revealTl
            .to(imageWrap, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.7,
                ease: 'power2.out',
            })
            .to(line, {
                width: '48px',
                duration: 0.35,
                ease: 'power2.out',
            }, '-=0.2')
            .to(info, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.3')

        // Image parallax: moves at 0.6× scroll speed
        if (img) {
            gsap.to(img, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            })
        }

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <EngineSection ref={sectionRef} className={reverse ? 'reverse' : ''} id={id}>
            <ImageWrap ref={imageWrapRef}>
                <img ref={imgRef} src={imgSrc} alt={imgAlt} />
            </ImageWrap>
            <InfoWrap ref={infoRef}>
                <AccentLine ref={lineRef} />
                <EngineName>{name}</EngineName>
                <TechLine>{tech}</TechLine>
                <FeatureList>
                    {features.map((f, i) => <li key={i}>{f}</li>)}
                </FeatureList>
                <SiteLink href={href} target="_blank" rel="noopener noreferrer">
                    Open Engine Site <span className="arrow">→</span>
                </SiteLink>
            </InfoWrap>
        </EngineSection>
    )
}

export default function Portfolio() {
    return (
        <div id="engines">
            <EngineCard
                name="Atmospheric"
                tech="C++ · OpenGL 4.6 · Bullet Physics · Emscripten"
                features={[
                    'PBR material pipeline (Cook-Torrance BRDF)',
                    'Cascaded shadow maps & omnidirectional point shadows',
                    'Post-process stack: HDR, Bloom, SSAO, FXAA',
                    'Cross-platform: Native + WebAssembly (Emscripten)',
                    'Entity-Component System architecture',
                ]}
                href="https://verse.lucidum.dev/atmospheric/"
                imgSrc={imgAtmospheric}
                imgAlt="Atmospheric Engine render"
                reverse={false}
            />
            <EngineCard
                name="Project Vapor"
                tech="C++20 · Vulkan 1.3 · WASM"
                features={[
                    'Render graph with auto-barrier synchronization',
                    'Bindless texture array & GPU-driven rendering',
                    'Custom Vulkan memory allocator integration',
                    'Thread-safe ring buffer for GPU uploads',
                    'Ray-traced shadow maps',
                ]}
                href="https://verse.lucidum.dev/vapor/"
                imgSrc={imgPlayReal}
                imgAlt="Project Vapor render"
                reverse={true}
            />
        </div>
    )
}
```

> **Note:** `imgPlayReal` is a placeholder — replace with the actual Project Vapor screenshot once available. Add the image to `src/assets/images/` and update the import.

- [ ] **Step 2: Verify in browser**

Scroll down past hero — Atmospheric section: image clips in from left, accent line grows, info fades in from right. Scroll to Project Vapor — same motion, mirrored. Both "Open Engine Site" links point to the correct URLs.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Portfolio.jsx
git commit -m "feat: portfolio — two full-viewport engine case studies with clipPath reveal and parallax"
```

---

## Task 7: Experiences — Vertical Timeline

**Files:**
- Modify: `src/sections/Work.jsx`

- [ ] **Step 1: Rewrite Work.jsx**

Replace `src/sections/Work.jsx` entirely:

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 10vw;
`

const SectionTitle = styled.h2`
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 64px;
`

const Timeline = styled.div`
    position: relative;
    padding-left: 28px;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
        width: 2px;
        background: var(--line);
    }
`

const TimelineEntry = styled.div`
    position: relative;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateY(16px);

    &:last-child {
        margin-bottom: 0;
    }

    &::before {
        content: '';
        position: absolute;
        left: -34px;
        top: 7px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-blue);
        /* Ring around dot */
        box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.15);
    }
`

const Company = styled.h3`
    font-family: var(--font-display);
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
`

const DateRange = styled.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    display: block;
    margin-bottom: 6px;
    letter-spacing: 0.04em;
`

const Role = styled.p`
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 400;
`

const CVFooter = styled.div`
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--line);
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--text-muted);

    a {
        color: var(--text-muted);
        text-decoration: none;
        position: relative;
        transition: color 150ms;

        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--accent-blue);
            transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        &:hover {
            color: var(--text-primary);
        }
        &:hover::after {
            width: 100%;
        }
    }
`

const ENTRIES = [
    {
        company: 'LyraVR',
        date: '2021 – 2022',
        role: 'VR Gameplay Programmer',
    },
    {
        company: 'Clubon',
        date: '2019 – 2021',
        role: 'Full-Stack Web Developer & Game Programmer',
    },
    {
        company: 'Digital Learning Center, NTU',
        date: '2018 – 2019',
        role: 'Full-Stack Web Developer',
    },
]

export default function Work() {
    const sectionRef = useRef(null)
    const entriesRef = useRef([])

    useEffect(() => {
        entriesRef.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                delay: i * 0.08,
            })
        })
    }, [])

    return (
        <Section ref={sectionRef} id="work">
            <SectionTitle>Work</SectionTitle>
            <Timeline>
                {ENTRIES.map((entry, i) => (
                    <TimelineEntry
                        key={entry.company}
                        ref={el => { entriesRef.current[i] = el }}
                    >
                        <Company>{entry.company}</Company>
                        <DateRange>{entry.date}</DateRange>
                        <Role>{entry.role}</Role>
                    </TimelineEntry>
                ))}
            </Timeline>
            <CVFooter>
                Full project history compiled in CV —{' '}
                <a href="/cv/loic-chen-cv.pdf" download>Download PDF ↗</a>
            </CVFooter>
        </Section>
    )
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Experiences: three entries stagger in from bottom. Vertical cyan accent line on the left. Accent-blue node dots. CV download link at bottom with underline-grow hover.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Work.jsx
git commit -m "feat: work — vertical timeline with stagger entrance, CV download link"
```

---

## Task 8: About Page

**Files:**
- Create: `src/pages/About.jsx`

- [ ] **Step 1: Create src/pages/ directory and About.jsx**

```bash
mkdir -p /Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/pages
```

Create `src/pages/About.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import styled from '@emotion/styled'
import StarryBackground from '../components/StarryBackground'

const PageWrap = styled.div`
    min-height: 100vh;
    position: relative;
`

const CanvasLayer = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
`

const Content = styled.main`
    position: relative;
    z-index: 1;
    max-width: 560px;
    margin: 0 auto;
    padding: 20vh var(--spacing-md) 80px;
    opacity: 0;
`

const PageTitle = styled.h1`
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 48px);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 40px;
`

const Body = styled.div`
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    color: var(--text-primary);
    line-height: 1.8;

    p {
        margin-bottom: 24px;
    }
`

const BackLink = styled(Link)`
    display: inline-block;
    margin-top: 48px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    position: relative;
    transition: color 150ms;

    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--accent-blue);
        transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover {
        color: var(--text-primary);
    }
    &:hover::after {
        width: 100%;
    }
`

export default function About() {
    const contentRef = useRef(null)

    useEffect(() => {
        gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.2,
        })
    }, [])

    return (
        <PageWrap>
            <CanvasLayer>
                <Canvas
                    camera={{ position: [0, 0, 100], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <StarryBackground />
                </Canvas>
            </CanvasLayer>

            <Content ref={contentRef} style={{ transform: 'translateY(20px)' }}>
                <PageTitle>About</PageTitle>
                <Body>
                    {/* Replace these four sentences with Loïc's own words */}
                    <p>I build game engines from scratch — not because I have to, but because understanding how a renderer thinks is the only way I know how to really learn graphics programming.</p>
                    <p>Outside of C++ and shaders, you'll find me in oversized dark layers, with blue hair and nails I spend too long on. The precision I put into those things is the same precision I put into code.</p>
                    <p>Right now I'm deep in a Vulkan renderer — thinking about render graphs, GPU memory, and how to make light behave.</p>
                    <p>I play Soulsborne games badly and Metroidvanias well.</p>
                </Body>
                <BackLink to="/">← Back</BackLink>
            </Content>
        </PageWrap>
    )
}
```

> **Content note:** The four paragraphs above are placeholder drafts. Loïc should rewrite them in his own voice before deploying.

- [ ] **Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: /about page — 4-paragraph standalone page with shared canvas background"
```

---

## Task 9: App.jsx — Router, film grain, load sequence, wire sections

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx**

Replace `src/App.jsx` entirely:

```jsx
import { useEffect, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import StarryBackground from './components/StarryBackground'
import Home from './sections/Home'
import Portfolio from './sections/Portfolio'
import Work from './sections/Work'
import About from './pages/About'

gsap.registerPlugin(ScrollTrigger)

const BgCanvas = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

const LandingPage = () => {
    const grainRef = useRef(null)

    // Film grain animation
    const animateGrain = useCallback(() => {
        const canvas = grainRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const { data } = imageData
        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 255
            data[i]     = v
            data[i + 1] = v
            data[i + 2] = v
            data[i + 3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
        requestAnimationFrame(animateGrain)
    }, [])

    useEffect(() => {
        ScrollTrigger.refresh()
        animateGrain()
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [animateGrain])

    return (
        <>
            {/* Fixed Three.js canvas */}
            <BgCanvas id="devverse-bg">
                <Canvas
                    camera={{ position: [0, 0, 100], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <StarryBackground />
                </Canvas>
            </BgCanvas>

            {/* Atmosphere overlays */}
            <div className="scanline-overlay" />
            <div className="vignette-overlay" />
            <canvas id="film-grain" ref={grainRef} />

            {/* Content */}
            <Home />
            <Portfolio />
            <Work />
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Cursor />
            <Routes>
                <Route path="/"      element={<LandingPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}
```

- [ ] **Step 2: Add 404 redirect for GitHub Pages SPA routing**

Create `public/404.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script>
    // GitHub Pages SPA redirect
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.host + l.pathname.split('/').slice(0, 1).join('/') +
      '/?/' + l.pathname.slice(1) + (l.search ? '&' + l.search.slice(1) : '') + l.hash
    );
  </script>
</head>
</html>
```

Add redirect handler at the top of `index.html` (inside `<head>`, before other scripts):

```html
<script>
  // Handle SPA redirect from 404.html
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?')
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash)
    }
  }(window.location))
</script>
```

- [ ] **Step 3: Verify full page in browser**

- Landing: hero → scroll → Portfolio → Work. All sections render.
- Navigate to `http://localhost:5173/about` → About page renders with canvas background and navbar always visible.
- Cursor renders on all pages.
- Film grain is barely visible (opacity 0.025).
- Scanline overlay is almost invisible.

- [ ] **Step 4: Build to verify no compile errors**

```bash
cd /Users/loicchen/Desktop/code/etc/painfulexistence.github.io
bun run build
```

Expected: Build completes with no errors. Warnings about chunk size are acceptable.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx public/404.html index.html
git commit -m "feat: wire React Router, film grain, scanline overlays, DevVerse bg placeholder"
```

---

## Task 10: Remove dead code

**Files:**
- Modify: `src/App.jsx` — already clean in Task 9
- Delete unused: `src/sections/About.jsx`, `src/components/OldStarryBackground.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/AnimatedSection.jsx`

- [ ] **Step 1: Delete unused files**

```bash
cd /Users/loicchen/Desktop/code/etc/painfulexistence.github.io
rm src/sections/About.jsx
rm src/components/OldStarryBackground.jsx
rm src/components/Header.jsx
rm src/components/Footer.jsx
rm src/components/AnimatedSection.jsx
```

> Do not delete `src/components/ScrambleText.jsx` — keep it in case it's wanted later.

- [ ] **Step 2: Build again to confirm no broken imports**

```bash
bun run build
```

Expected: Clean build, no missing module errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused components (OldStarryBackground, Header, Footer, AnimatedSection, old About section)"
```

---

## Task 11: Final visual check

- [ ] **Step 1: Run dev server and do a full walkthrough**

```bash
bun run start
```

Checklist:
- [ ] Background is warm black `#0a0908`, not pure black or green-tinted
- [ ] Fonts: name is Syne, body text is Manrope, dates/tech tags are Space Mono
- [ ] Hero: name fade-in → rule grows → role types in → CTAs appear
- [ ] Scroll: name blurs out as you scroll down
- [ ] Navbar: invisible on load, appears when cursor enters top 80px
- [ ] Navbar: "CV ↗" link triggers a file download
- [ ] Portfolio: both engine sections have clipPath reveal on scroll
- [ ] Portfolio: "Open Engine Site →" arrow shifts right on hover
- [ ] Work: three timeline entries stagger in, accent-blue dots visible
- [ ] Cursor: ring lags behind dot, contracts on link hover
- [ ] `/about` route renders correctly, navbar always visible there
- [ ] Mobile (resize to 375px): navbar at bottom, layout doesn't break

- [ ] **Step 2: Replace placeholder Project Vapor image**

If a better Project Vapor screenshot is available, add it to `src/assets/images/` and update the import in `Portfolio.jsx`.

- [ ] **Step 3: Replace placeholder About text**

Open `src/pages/About.jsx` and rewrite the four paragraphs in Loïc's own voice.

- [ ] **Step 4: Add real CV PDF**

Copy the real CV PDF to `public/cv/loic-chen-cv.pdf`. Remove the placeholder empty file.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Material Dark redesign complete — Syne/Manrope, ghost nav, dual engine case studies, vertical timeline, /about route"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Warm obsidian color tokens | Task 1 |
| Syne + Manrope + Space Mono | Task 1 |
| Particle recolor to cyan-blue, count/speed reduced | Task 2 |
| Film grain, scanline, vignette overlays | Task 9 (CSS in Task 1) |
| 6px dot + 28px lagging ring cursor | Task 3 |
| Ghost navbar — show on cursor-top / scroll-stop | Task 4 |
| CV download link in navbar | Task 4 |
| Hero: name fade → rule → type-in → CTAs | Task 5 |
| Hero: scroll-exit blur | Task 5 |
| `scroll ↓` hint Space Mono blinking cursor | Task 5 |
| Portfolio: two full-viewport case studies | Task 6 |
| Portfolio: clipPath reveal + parallax | Task 6 |
| Portfolio: arrow spring on hover | Task 6 |
| Links to `verse.lucidum.dev/atmospheric/` and `/vapor/` | Task 6 |
| Work: vertical timeline, no cards | Task 7 |
| Work: stagger entrance | Task 7 |
| Work: CV download at bottom | Task 7 |
| `/about` standalone route | Task 8 |
| `/about`: 4 genuine sentences | Task 8 (placeholder, to be replaced) |
| `/about`: same canvas background | Task 8 |
| `/about`: always-visible navbar | Task 4 |
| React Router + GitHub Pages 404 redirect | Task 9 |
| `id="devverse-bg"` placeholder for future iframe | Task 9 |
| `prefers-reduced-motion` | Task 1 (CSS) |
| Remove dead code | Task 10 |

No gaps found.

**Placeholder scan:** Project Vapor image uses `imgPlayReal` as a placeholder — flagged in Task 6 note. About text is clearly marked as draft. CV PDF is a placeholder empty file — flagged in Task 4.

**Type consistency:** `StarryBackground` takes no props in rewrite (Task 2) and is used without props in both `App.jsx` (Task 9) and `About.jsx` (Task 8). `Navbar` uses `useLocation` from React Router — `App.jsx` wraps everything in `BrowserRouter` so this works. All consistent.
