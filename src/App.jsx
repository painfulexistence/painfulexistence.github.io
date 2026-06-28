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
import Teaser from './sections/Teaser'
import About from './sections/About'

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
