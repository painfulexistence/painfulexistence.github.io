import { useRef, useEffect, useLayoutEffect } from "react"
import Layout from "../components/layout"
import NavBar from "../components/Navbar"
import About from "../sections/About"
import Home from "../sections/Home"

const IndexPage = ({location, data}) => {
    const scrollEl = useRef(null)

    useEffect(async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default
        const scroll = new LocomotiveScroll({
            el: scrollEl.current,
            smooth: true,
            smartphone: false
        })
    }, [])

    useLayoutEffect(() => {

        
    }, [])

    return (
        <Layout>
            <NavBar />
            <div ref={scrollEl}>
                <Home />
                <About />
            </div>
        </Layout>
    )
}

export default IndexPage
