import React, { useEffect, useState, useRef } from "react"
import { motion } from "motion/react"

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

function scramble(text, progress) {
  return text
    .split("")
    .map((c, i) => (i < progress ? c : chars[Math.floor(Math.random() * chars.length)]))
    .join("")
}

function ScrambleText({ text, duration = 800 }) {
  const [displayText, setDisplayText] = useState(text)
	const intervalRef = useRef(null)

  useEffect(() => {
    let progress = 0
		clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      progress++
      setDisplayText(scramble(text, progress))
      if (progress >= text.length) clearInterval(intervalRef.current)
    }, duration / text.length)
    return () => {
			clearInterval(intervalRef.current)
			setDisplayText(text)
		}
  }, [text, duration])

	const handleMouseEnter = () => {
    let progress = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      progress++
      setDisplayText(scramble(text, progress))
      if (progress >= text.length) clearInterval(intervalRef.current)
    }, duration / text.length)
  }

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current)
    setDisplayText(text)
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
      style={{ fontFamily: "monospace", letterSpacing: 2 }}
    >
      { displayText }
    </motion.span>
  )
}

export default ScrambleText
