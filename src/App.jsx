import { useRef, useEffect, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer"
import { RenderPass } from "three/addons/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass"
import { Water } from "three/addons/objects/Water"

import NavBar from "./components/Navbar"
import Home from "./sections/Home"
import Work from "./sections/Work"
import Portfolio from "./sections/Portfolio"
import About from "./sections/About"

const ThreeJSContainer = styled.div`
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

const TexturedOverlay = styled.div`
    width: inherit;
    height: inherit;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.25);
`

function isWebGLAvailable() {
    try {
        const canvas = document.createElement("canvas")
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
    } catch (e) {
        return false
    }
}

const App = ({}) => {
    const parallaxEl = useRef(null)

    //useEffect(async () => {
    //    const LocomotiveScroll = (await import("locomotive-scroll")).default
    //    const scroll = new LocomotiveScroll({
    //        el: parallaxEl.current.content.current,
    //        smooth: true,
    //        smartphone: false
    //    })
    //}, [])

    useEffect(() => {
        if (!isWebGLAvailable()) return

        const canvas = document.getElementById("gl")
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight)
        camera.position.setZ(100)

        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.4, 0.95)
        composer.addPass(bloomPass)

        const controls = new OrbitControls(camera, renderer.domElement)

        Array(4000).fill().forEach(() => addStar())

        const skyTexture = new THREE.TextureLoader().load("gradient.png")
        scene.background = skyTexture
        scene.fog = new THREE.FogExp2(0x001e0f, 0.0025)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0)
        scene.add(ambientLight)

        window.addEventListener("resize", onWindowResize)
        parallaxEl.current.container.current.onscroll = onForegroundScroll

        animate()

        function addStar() {
            const geometry = new THREE.OctahedronGeometry(0.25 * THREE.MathUtils.randFloat(0.1, 5), 0)
            const material = new THREE.MeshStandardMaterial({
                color: 0x111111,
                emissive: 0xffffff,
                emissiveIntensity: 3 * THREE.MathUtils.randFloat(0.5, 10),
                fog: false
            })
            const star = new THREE.Mesh(geometry, material)

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500))
            star.position.set(x, y, z)
            const [i, j, k] = Array(3).fill().map(() => THREE.MathUtils.randFloat(0, 180))
            star.rotation.set(i, j, k)
            star.scale.y = 1.5

            scene.add(star)
        }

        function animate() {
            controls.update()

            composer.render()
            requestAnimationFrame(animate)
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            composer.setSize(window.innerWidth, window.innerHeight)
        }

        function onForegroundScroll() {
            camera.position.setZ(100 - 100 * (parallaxEl.current.container.current.scrollTop / parallaxEl.current.container.current.scrollHeight))
        }
    }, [])

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
            <ThreeJSContainer>
                <canvas id="gl" />
                <TexturedOverlay />
            </ThreeJSContainer>
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
        </>
    )
}

export default App
