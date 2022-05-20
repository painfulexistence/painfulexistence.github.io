import React, { useEffect } from "react"
import Link from "next/link"


const Navbar = () => {
    return (
        <header className="header" id="navbar-collapse-toggle">
            <ul className="icon-menu d-none d-lg-block revealator-slideup revealator-once revealator-delay1">    
                <Link href="/">
                    <li className="icon-box active">
                        <i className="fa fa-home"></i>
                        <h2>Home</h2>
                    </li>
                </Link>
                <Link href="/about/">
                    <li className="icon-box">
                        <i className="fa fa-user"></i>
                        <h2>About</h2>
                    </li>
                </Link>
                <Link href="/portfolio/">
                    <li className="icon-box">
                        <i className="fa fa-briefcase"></i>
                        <h2>Portfolio</h2>
                    </li>
                </Link>
                <Link href="/contact/">
                    <li className="icon-box">
                        <i className="fa fa-envelope-open"></i>
                        <h2>Contact</h2>
                    </li>
                </Link>
            </ul>
            <nav role="navigation" className="d-block d-lg-none">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul className="list-unstyled" id="menu">
                        <li><Link href="/"><span><i className="fa fa-home"></i>Home</span></Link></li>
                        <li><Link href="/about"><span><i className="fa fa-user"></i>About</span></Link></li>
                        <li><Link href="/portfolio"><span><i className="fa fa-folder-open"></i>Portfolio</span></Link></li>
                        <li><Link href="/contact"><span><i className="fa fa-envelope-open"></i>Contact</span></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar