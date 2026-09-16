import { lazy, Suspense, useEffect, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Home from './sections/Home'
import Portfolio from './sections/Portfolio'
import Teaser from './sections/Teaser'
import About from './sections/About'

// three.js stack loads as its own chunk after first paint
const BgScene = lazy(() => import('./components/BgScene'))

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
    const grainRef = useRef(null)

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
            {/* Fixed Three.js canvas — id reserved for future DevVerse iframe */}
            <Suspense fallback={null}>
                <BgScene />
            </Suspense>

            {/* Atmosphere overlays */}
            <div className="scanline-overlay" />
            <div className="vignette-overlay" />
            <canvas id="film-grain" ref={grainRef} />

            {/* Content */}
            <Home />
            <Portfolio />
            <Teaser />
            <About />
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Cursor />
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    )
}
