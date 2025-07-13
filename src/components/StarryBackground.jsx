import { useEffect, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function StarryBackground({ parallaxRef }) {
    const starsRef = useRef()
    const controlsRef = useRef()
    const { camera } = useThree()

    const starsGeometry = useMemo(() => {
        const geometry = new THREE.OctahedronGeometry(0.25, 0)
        const positions = []
        const colors = []
        const sizes = []

        for (let i = 0; i < 4000; i++) {
            positions.push(
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500)
            )

            const color = new THREE.Color()
            color.setHSL(0.6, 0.8, THREE.MathUtils.randFloat(0.1, 1) * 5.0)
            colors.push(color.r, color.g, color.b)

            sizes.push(THREE.MathUtils.randFloat(0.1, 3))
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

        return geometry
    }, [])

    const starsMaterial = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            vertexColors: true
        })
    }, [])

    useFrame((state) => {
        if (starsRef.current) {
            // starsRef.current.rotation.y += 0.0005
            // starsRef.current.rotation.x += 0.0002
        }
        if (starsMaterial) {
            // starsMaterial.uniforms.time.value = state.clock.elapsedTime
        }
    })

    useEffect(() => {
        parallaxRef.current.container.current.onscroll = onForegroundScroll

        function onForegroundScroll() {
            camera.position.setZ(100 - 100 * (parallaxRef.current.container.current.scrollTop / parallaxRef.current.container.current.scrollHeight))
        }
    }, [parallaxRef])

    return (
        <>
            <color attach="background" args={['#001e0f']} />
            <fog attach="fog" args={['#001e0f', 50, 500]} />

            <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />

            <ambientLight intensity={0.1} />

            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.1}
            />

            <EffectComposer>
                <Bloom
                    intensity={2.0}
                    luminanceThreshold={0.4}
                    luminanceSmoothing={0.95}
                />
                <ChromaticAberration
                    offset={new THREE.Vector2(0.0005, 0.0005)}
                />
            </EffectComposer>
        </>
    )
}