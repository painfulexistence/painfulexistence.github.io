export default function Navbar() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className="navbar">
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="navbar-logo">LOÏC CHEN</a>

            <ul className="navbar-links">
                <li>
                    <button onClick={() => scrollTo('engines')}>[01] MY WORKS</button>
                </li>
                <li>
                    <button onClick={() => scrollTo('devverse')}>[02] DEVVERSE</button>
                </li>
                <li>
                    <button onClick={() => scrollTo('about')}>[03] ABOUT</button>
                </li>
            </ul>

            <div className="navbar-status">
                <span className="navbar-status-dot" />
                <a href="/cv/loic-chen-cv.pdf" download className="navbar-cv">[CV] ↗</a>
            </div>
        </nav>
    )
}
