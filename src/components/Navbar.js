import React, { useEffect } from "react"
import { Link } from "gatsby"


const Navbar = () => {
    return (
        <header className="header" id="navbar-collapse-toggle">
            <ul className="icon-menu d-none d-lg-block revealator-slideup revealator-once revealator-delay1">
                <li className="icon-box active">
                    <i className="fa fa-home"></i>
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
                </li>
                <li className="icon-box">
                    <i className="fa fa-user"></i>
                    <Link to="/about/">
                        <h2>About</h2>
                    </Link>
                </li>
                <li className="icon-box">
                    <i className="fa fa-briefcase"></i>
                    <Link to="/portfolio/">
                        <h2>Portfolio</h2>
                    </Link>
                </li>
                <li className="icon-box">
                    <i className="fa fa-envelope-open"></i>
                    <Link to="/contact/">
                        <h2>Contact</h2>
                    </Link>
                </li>
            </ul>
            <nav role="navigation" className="d-block d-lg-none">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul className="list-unstyled" id="menu">
                        <li><Link to="/"><i className="fa fa-home"></i><span>Home</span></Link></li>
                        <li><Link to="/about"><i className="fa fa-user"></i><span>About</span></Link></li>
                        <li><Link to="/portfolio"><i className="fa fa-folder-open"></i><span>Portfolio</span></Link></li>
                        <li><Link to="/contact"><i className="fa fa-envelope-open"></i><span>Contact</span></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar