import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const onLanding = location.pathname === '/'

    const goToSection = (id) => {
        if (onLanding) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/', { state: { scrollTo: id } })
        }
    }

    const goToContact = () => {
        if (location.pathname === '/contact') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/contact')
        }
    }

    const goHome = (e) => {
        e.preventDefault()
        if (onLanding) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    return (
        <nav className="navbar">
            <a href="/" onClick={goHome} className="navbar-logo">LOÏC CHEN (Lucidum)</a>

            <ul className="navbar-links">
                <li>
                    <button onClick={() => goToSection('engines')}>[01] MY WORKS</button>
                </li>
                <li>
                    <button onClick={() => goToSection('devverse')}>[02] DEVVERSE</button>
                </li>
                <li>
                    <button onClick={() => goToSection('about')}>[03] ABOUT</button>
                </li>
                <li>
                    <button onClick={goToContact}>[04] CONTACT</button>
                </li>
            </ul>

            <div className="navbar-status">
                <span className="navbar-status-dot" />
                <a href="/CV_Lucidum.pdf" download className="navbar-cv">[CV]</a>
            </div>
        </nav>
    )
}
