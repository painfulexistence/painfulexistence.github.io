import { useEffect, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function StarryBackground() {
    const starsRef = useRef()
    const { camera } = useThree()

    const starsGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        const positions = []
        const colors = []

        // 2400 particles (40% reduction from 4000)
        for (let i = 0; i < 2400; i++) {
            positions.push(
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500)
            )
            // Cyan-blue tint: hue ~0.54 (194° — matches #4cc9f0)
            const color = new THREE.Color()
            color.setHSL(0.54, 0.9, THREE.MathUtils.randFloat(0.1, 1) * 5.0)
            colors.push(color.r, color.g, color.b)
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        return geometry
    }, [])

    const starsMaterial = useMemo(() => new THREE.PointsMaterial({
        size: 1.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
    }), [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            // Speed reduced 40%: camera moves less than original
            camera.position.setZ(100 - 60 * (scrollTop / Math.max(1, scrollHeight)))
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [camera])

    return (
        <>
            {/* Obsidian black — Goth-Tech palette */}
            <color attach="background" args={['#020202']} />
            <fog attach="fog" args={['#020202', 50, 500]} />

            <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />

            <ambientLight intensity={0.05} />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.05}
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
