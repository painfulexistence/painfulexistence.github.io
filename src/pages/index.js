import { useRef, useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import Container from "@mui/material/Container"
import Layout from "../components/layout"
import NavBar from "../components/Navbar"
import Three from "../components/Three"
import Home from "../sections/Home"
import Work from "../sections/Work"
import Portfolio from "../sections/Portfolio"
import About from "../sections/About"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"

const IndexPage = ({location, data}) => {
    const parallaxEl = useRef(null)

    //useEffect(async () => {
    //    const LocomotiveScroll = (await import("locomotive-scroll")).default
    //    const scroll = new LocomotiveScroll({
    //        el: parallaxEl.current.content.current,
    //        smooth: true,
    //        smartphone: false
    //    })
    //}, [])

    const handleNavigate = (link) => {
        switch (link) {
            case "Home":
                parallaxEl.current.scrollTo(0)
                break
            case "Portfolio":
                parallaxEl.current.scrollTo(1)
                break
            case "Experiences":
                parallaxEl.current.scrollTo(6)
                break
            case "About":
                parallaxEl.current.scrollTo(7)
                break
        }
    } 

    return (
        <Layout>
            <Three />
            <NavBar onNavigate={handleNavigate} />
            <Parallax ref={parallaxEl} pages={8}>
                <ParallaxLayer offset={0} speed={0.5}>
                    <Home />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={0.25}>
                    <Portfolio />
                </ParallaxLayer>
                <ParallaxLayer offset={6} speed={0.25}>
                    <Work />
                </ParallaxLayer>
                <ParallaxLayer offset={7} speed={0.25}>
                    <About />
                </ParallaxLayer>
            </Parallax>
        </Layout>
    )
}

export default IndexPage
