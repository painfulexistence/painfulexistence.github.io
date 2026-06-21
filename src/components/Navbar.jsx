import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    const scrollTo = (id) => {
        if (location.pathname !== '/') return
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">LC</Link>

            <ul className="navbar-links">
                <li>
                    <button onClick={() => scrollTo('hero')}>[00] HOME</button>
                </li>
                <li>
                    <button onClick={() => scrollTo('engines')}>[01] ENGINES</button>
                </li>
                <li>
                    <Link to="/about">[02] ABOUT</Link>
                </li>
                <li>
                    <a href="/cv/loic-chen-cv.pdf" download>[CV] ↗</a>
                </li>
            </ul>

            <div className="navbar-status">
                <span className="navbar-status-dot" />
                VULKAN: OK
            </div>
        </nav>
    )
}
