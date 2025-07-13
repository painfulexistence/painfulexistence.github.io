import React, { useEffect } from "react"
import styled from "@emotion/styled"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer"
import { RenderPass } from "three/addons/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass"

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

const OldStarryBackground = ({ parallaxRef }) => {
    // useEffect(async () => {
    //    const LocomotiveScroll = (await import("locomotive-scroll")).default
    //    const scroll = new LocomotiveScroll({
    //        el: parallaxRef.current.content.current,
    //        smooth: true,
    //        smartphone: false
    //    })
    // }, [])

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

        for (const _ of Array(4000)) {
            addStar()
        }

        const skyTexture = new THREE.TextureLoader().load("gradient.png")
        scene.background = skyTexture
        scene.fog = new THREE.FogExp2(0x001e0f, 0.0025)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0)
        scene.add(ambientLight)

        window.addEventListener("resize", onWindowResize)
        parallaxRef.current.container.current.onscroll = onForegroundScroll

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
            camera.position.setZ(100 - 100 * (parallaxRef.current.container.current.scrollTop / parallaxRef.current.container.current.scrollHeight))
        }
    }, [parallaxRef])

    return (
        <>
            <canvas id="gl" />
            <TexturedOverlay />
        </>
    )
}

export default OldStarryBackground