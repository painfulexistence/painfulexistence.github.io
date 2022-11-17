import { useEffect } from "react"
import styled from "@emotion/styled"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer"
import { RenderPass } from "three/addons/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass"
import { Water } from "three/addons/objects/Water"

const ThreeJSContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
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

const Title = styled.div`
    width: inherit;
    height: inherit;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 60px;
        font-weight: 800;
        margin: 0;
    }

    h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }
`

const GL = styled.canvas`
    width: 100%;
    height: 100%;
`

function isWebGLAvailable() {
    try {
        const canvas = document.createElement("canvas")
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
    } catch (e) {
        return false
    }
}

const ThreeJS = () => {
    useEffect(() => {
        if (!isWebGLAvailable()) return

        const canvas = document.getElementById("gl")
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
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
            console.log("resized")
        }
    }, [])

    return (
        <ThreeJSContainer>
            <GL id="gl" />
            <TexturedOverlay />
            <Title>
                <h1>Loïc Chen</h1>
                <h2>Web Developer</h2>
                <h2>Game Developer</h2>
            </Title>
        </ThreeJSContainer>
    )
}

export default ThreeJS