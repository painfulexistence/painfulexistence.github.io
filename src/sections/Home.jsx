import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styled from '@emotion/styled'

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 10vw;
    position: relative;
`

const HeroContent = styled.div`
    max-width: 700px;
`

const HeroName = styled.h1`
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 20px;
    text-shadow: 0 0 80px rgba(76, 201, 240, 0.12);
`

const HeroRule = styled.div`
    width: 0;
    height: 1px;
    background: var(--line);
    margin-bottom: 20px;
`

const HeroRole = styled.p`
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    color: var(--text-muted);
    margin-bottom: 0;
    opacity: 0;
    min-height: 1.4em;
`

const HeroCtas = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 48px;
`

const ScrollHint = styled.div`
    position: absolute;
    bottom: 40px;
    left: 10vw;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.4s;

    &::after {
        content: '|';
        animation: blink 1.2s step-end infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
    }
`

const ROLE_TEXT = 'Render & Engine Engineer'

export default function Home() {
    const nameRef    = useRef(null)
    const ruleRef    = useRef(null)
    const roleRef    = useRef(null)
    const ctasRef    = useRef(null)
    const scrollHint = useRef(null)
    const sectionRef = useRef(null)
    const [roleChars, setRoleChars] = useState([])

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.4 })

        // 1. Name fades in
        tl.fromTo(nameRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )

        // 2. Rule grows
        tl.to(ruleRef.current,
            { width: '120px', duration: 0.4, ease: 'power2.out' },
            '-=0.2'
        )

        // 3. Role types in character by character
        tl.add(() => {
            let i = 0
            const interval = setInterval(() => {
                i++
                setRoleChars(ROLE_TEXT.slice(0, i).split(''))
                if (i >= ROLE_TEXT.length) clearInterval(interval)
            }, 40)
        })

        // 4. Role container fades in
        tl.to(roleRef.current,
            { opacity: 1, duration: 0.1 },
            '-=0'
        )

        // 5. CTAs appear
        tl.fromTo(ctasRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '+=0.8'
        )

        // Scroll exit: name blurs as user scrolls past 40vh
        const handleScroll = () => {
            const scrollY = window.scrollY
            const vh = window.innerHeight
            const progress = Math.min(Math.max((scrollY - vh * 0.4) / (vh * 0.4), 0), 1)
            if (nameRef.current) {
                nameRef.current.style.opacity = 1 - progress
                nameRef.current.style.filter  = `blur(${progress * 8}px)`
            }
            if (roleRef.current) {
                roleRef.current.style.opacity = Math.max(0, 1 - progress * 1.5)
            }
            if (scrollHint.current) {
                scrollHint.current.style.opacity = scrollY > 20 ? 0 : 1
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <HeroSection ref={sectionRef}>
            <HeroContent>
                <HeroName ref={nameRef} style={{ opacity: 0 }}>
                    LOÏC CHEN
                </HeroName>
                <HeroRule ref={ruleRef} />
                <HeroRole ref={roleRef}>
                    {roleChars.join('')}
                </HeroRole>
                <HeroCtas ref={ctasRef} style={{ opacity: 0 }}>
                    <a
                        href="#engines"
                        className="text-link"
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById('engines')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        View Engines ↓
                    </a>
                    <a href="/cv/loic-chen-cv.pdf" download className="text-link">
                        Download CV ↗
                    </a>
                </HeroCtas>
            </HeroContent>

            <ScrollHint ref={scrollHint}>scroll ↓</ScrollHint>
        </HeroSection>
    )
}
