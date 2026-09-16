import { Canvas } from '@react-three/fiber'
import styled from '@emotion/styled'

import StarryBackground from './StarryBackground'

const BgCanvas = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

// Split out of App so the three.js stack (three / fiber / drei / postprocessing)
// loads as its own lazy chunk instead of blocking first paint.
export default function BgScene() {
    return (
        <BgCanvas id="devverse-bg">
            <Canvas
                camera={{ position: [0, 0, 100], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <StarryBackground />
            </Canvas>
        </BgCanvas>
    )
}
