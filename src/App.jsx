import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Atmosphere from './components/Atmosphere'
import Home from './sections/Home'
import Portfolio from './sections/Portfolio'
import Teaser from './sections/Teaser'
import About from './sections/About'
import ContactCTA from './sections/ContactCTA'
import ContactPage from './pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
    const location = useLocation()

    useEffect(() => {
        ScrollTrigger.refresh()
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    useEffect(() => {
        const id = location.state?.scrollTo
        if (!id) return
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        })
    }, [location.state])

    return (
        <>
            <Atmosphere />
            <Home />
            <Portfolio />
            <Teaser />
            <About />
            <ContactCTA />
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
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    )
}
