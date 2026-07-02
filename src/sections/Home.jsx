import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styled from '@emotion/styled'
import ScrambleText from '../components/ScrambleText'

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 52px 8vw 0 10vw;
    position: relative;

    @media (max-width: 900px) {
        justify-content: center;
        padding: 132px 8vw 80px;
    }
`

const Left = styled.div`
    flex: 1;
    min-width: 0;
`

const HeroName = styled.h1`
    font-family: var(--font-display);
    font-size: var(--fs-hero);
    font-weight: var(--fw-hero);
    letter-spacing: var(--ls-hero);
    color: var(--text-primary);
    line-height: var(--lh-hero);
    margin-bottom: 24px;
    text-shadow: 0 0 60px rgba(0, 229, 255, 0.1);
`

const HeroRule = styled.div`
    width: 0;
    height: 1px;
    background: var(--line-accent);
    margin-bottom: 18px;
`

const HeroRole = styled.p`
    font-family: var(--font-body);
    font-size: var(--fs-body);
    font-weight: var(--fw-body);
    color: var(--text-secondary);
    margin-bottom: 40px;
    opacity: 0;
    letter-spacing: var(--ls-body);
`

const HeroCtas = styled.div`
    display: flex;
    gap: 24px;
    opacity: 0;
`

const ScrollHint = styled.div`
    position: absolute;
    bottom: 36px;
    left: 10vw;
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    transition: opacity 0.4s;

    &::after {
        content: ' _';
        animation: blink 1.1s step-end infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
    }
`

const ROLE_TEXT = 'Game Engine Architect & Graphics Programmer'

export default function Home() {
    const ruleRef    = useRef(null)
    const roleRef    = useRef(null)
    const ctasRef    = useRef(null)
    const scrollHint = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 })

        tl.to(ruleRef.current,
            { width: '100px', duration: 0.35, ease: 'power2.out' }
        )
        tl.add(() => {
            // Typewriter for role line
            let i = 0
            if (!roleRef.current) return
            roleRef.current.textContent = ''
            const interval = setInterval(() => {
                i++
                if (roleRef.current) {
                    roleRef.current.textContent = ROLE_TEXT.slice(0, i)
                }
                if (i >= ROLE_TEXT.length) clearInterval(interval)
            }, 38)
        })
        tl.to(roleRef.current, { opacity: 1, duration: 0.1 }, '-=0')
        tl.fromTo(ctasRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '+=0.4'
        )

        const handleScroll = () => {
            const scrollY = window.scrollY
            if (scrollHint.current) {
                scrollHint.current.style.opacity = scrollY > 30 ? '0' : '1'
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <HeroSection id="hero">
            <Left>
                <HeroName>
                    <ScrambleText text="LOÏC" duration={900} /><br />
                    <ScrambleText text="CHEN" duration={900} />
                </HeroName>
                <HeroRule ref={ruleRef} />
                <HeroRole ref={roleRef} />
                <HeroCtas ref={ctasRef}>
                    <a href="/CV_Lucidum.pdf" download className="text-link">
                        Download CV ↗
                    </a>
                </HeroCtas>
            </Left>

            <ScrollHint ref={scrollHint}>scroll ↓</ScrollHint>
        </HeroSection>
    )
}
