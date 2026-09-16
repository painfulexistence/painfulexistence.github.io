import { lazy, Suspense, useEffect, useRef, useCallback } from 'react'

const BgScene = lazy(() => import('./BgScene'))

export default function Atmosphere() {
    const grainRef = useRef(null)

    const animateGrain = useCallback(() => {
        const canvas = grainRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const { data } = imageData
        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 255
            data[i] = v
            data[i + 1] = v
            data[i + 2] = v
            data[i + 3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
        requestAnimationFrame(animateGrain)
    }, [])

    useEffect(() => {
        animateGrain()
    }, [animateGrain])

    return (
        <>
            <Suspense fallback={null}>
                <BgScene />
            </Suspense>
            <div className="scanline-overlay" />
            <div className="vignette-overlay" />
            <canvas id="film-grain" ref={grainRef} />
        </>
    )
}
