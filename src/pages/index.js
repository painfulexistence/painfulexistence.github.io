import { useRef, useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import NavBar from "../components/Navbar"
import Three from "../components/Three"
import Home from "../sections/Home"
import Work from "../sections/Work"
import Portfolio from "../sections/Portfolio"
import About from "../sections/About"

const ScrollContainer = styled.div`
    padding-left: 180px;
    padding-right: 180px;
    //overflow-y: hidden;
`
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
            <Three />
            <ScrollContainer ref={scrollEl}>
                <Home />
                <Portfolio />
                <Work />
                <About />
            </ScrollContainer>
        </Layout>
    )
}

export default IndexPage
