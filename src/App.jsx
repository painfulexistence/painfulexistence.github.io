import { useRef, useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import { Canvas } from "@react-three/fiber"
import StarryBackground from "./components/StarryBackground"
import Cursor from "./components/Cursor"

import NavBar from "./components/Navbar"
import Home from "./sections/Home"
import Work from "./sections/Work"
import Portfolio from "./sections/Portfolio"
import About from "./sections/About"


const BackgroundCanvasContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    canvas {
        width: 100%;
        height: 100%;
    }
`

const App = () => {
    const parallaxEl = useRef(null)

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
        <>
            <NavBar onNavigate={handleNavigate} />
            <BackgroundCanvasContainer>
                <Canvas
                    camera={{ position: [0, 0, 100], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <StarryBackground parallaxRef={parallaxEl} />
                </Canvas>
            </BackgroundCanvasContainer>
            <Parallax ref={parallaxEl} pages={8}>
                <ParallaxLayer offset={0} speed={0.5}>
                    <Home />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={0.25}>
                    <Portfolio />
                </ParallaxLayer>
                <ParallaxLayer offset={5.5} speed={0.25}>
                    <Work />
                </ParallaxLayer>
                <ParallaxLayer offset={7} speed={0.25}>
                    <About />
                </ParallaxLayer>
            </Parallax>
            <Cursor />
        </>
    )
}

export default App
