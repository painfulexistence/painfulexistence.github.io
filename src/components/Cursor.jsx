import { useState, useEffect, useRef, useCallback } from 'react'

export default function Cursor() {
    // Dot snaps to pointer exactly
    const [dot, setDot] = useState({ x: 0, y: 0 })
    // Ring follows with lerp lag
    const ringPos = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)
    const ringRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const animate = useCallback(() => {
        // lerp factor 0.12 — visibly lags behind dot
        ringPos.current.x += (target.current.x - ringPos.current.x) * 0.5
        ringPos.current.y += (target.current.y - ringPos.current.y) * 0.5
        if (ringRef.current) {
            ringRef.current.style.left = `${ringPos.current.x}px`
            ringRef.current.style.top  = `${ringPos.current.y}px`
        }
        rafRef.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        const onMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY }
            setDot({ x: e.clientX, y: e.clientY })
        }
        const onMouseOver = (e) => {
            const el = e.target.closest('a, button, [data-cursor-hover]')
            setIsHovering(!!el)
        }
        const onDown = () => setIsClicking(true)
        const onUp   = () => setIsClicking(false)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onMouseOver)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup',   onUp)
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onMouseOver)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup',   onUp)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [animate])

    const ringClass = [
        'cursor-ring',
        isHovering ? 'is-hovering' : '',
        isClicking ? 'is-clicking' : '',
    ].filter(Boolean).join(' ')

    return (
        <>
            <div
                className="cursor-dot"
                style={{ left: dot.x, top: dot.y }}
            />
            <div ref={ringRef} className={ringClass} />
        </>
    )
}
