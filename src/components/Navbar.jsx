import { Link } from 'react-router-dom'

export default function Navbar() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">LOÏC CHEN</Link>

            <ul className="navbar-links">
                <li>
                    <button onClick={() => scrollTo('engines')}>[01] MY WORKS</button>
                </li>
                <li>
                    <a href="https://devlog.example.com" target="_blank" rel="noopener noreferrer">[02] DEVLOG</a>
                </li>
                <li>
                    <Link to="/about">[03] ABOUT</Link>
                </li>
            </ul>

            <div className="navbar-status">
                <span className="navbar-status-dot" />
                <a href="/cv/loic-chen-cv.pdf" download className="navbar-cv">[CV] ↗</a>
            </div>
        </nav>
    )
}
