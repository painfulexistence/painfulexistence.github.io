import React, { useState, useEffect, useRef } from 'react'

const Cursor = () => {
	const [cursorTarget, setCursorTarget] = useState({ x: 0, y: 0 })
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const animationRef = useRef(null)

	useEffect(() => {
		const handleMouseMove = (e) => {
			setCursorTarget({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

    useEffect(() => {
        const animate = () => {
            setCursorPosition(prev => {
                const x = prev.x + (cursorTarget.x - prev.x) * 0.2
                const y = prev.y + (cursorTarget.y - prev.y) * 0.2
                return { x, y }
            })
            animationRef.current = requestAnimationFrame(animate)
        }
        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [cursorTarget])

	return (
		<div className="cursor-dot" style={{ left: cursorPosition.x, top: cursorPosition.y }} />
	)
}

export default Cursor
