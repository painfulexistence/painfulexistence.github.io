import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const location = useLocation()
    const idleTimer = useRef(null)
    const scrolling = useRef(false)

    const show = useCallback(() => setVisible(true), [])
    const hide = useCallback(() => setVisible(false), [])

    useEffect(() => {
        // Cursor enters top 80px → show; exits below 200px → hide
        const onMouseMove = (e) => {
            if (e.clientY < 80) {
                show()
            } else if (e.clientY > 200 && !scrolling.current) {
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
