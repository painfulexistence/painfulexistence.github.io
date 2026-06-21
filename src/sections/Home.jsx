import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styled from '@emotion/styled'

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 8vw 0 10vw;
    position: relative;
    gap: 40px;

    @media (max-width: 900px) {
        flex-direction: column;
        justify-content: center;
        padding: 80px 8vw;
        gap: 48px;
    }
`

const Left = styled.div`
    flex: 1;
    min-width: 0;
`

const HeroName = styled.h1`
    font-family: var(--font-display);
    font-size: clamp(44px, 7vw, 88px);
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--text-primary);
    line-height: 0.95;
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
    font-size: 15px;
    font-weight: 400;
    color: var(--text-muted);
    margin-bottom: 40px;
    opacity: 0;
    min-height: 1.4em;
    letter-spacing: 0.02em;
`

const HeroCtas = styled.div`
    display: flex;
    gap: 24px;
    opacity: 0;
`

/* Right side — GPU Telemetry HUD */
const TelemetryPanel = styled.div`
    flex: 0 0 220px;
    width: 220px;
    opacity: 0;

    @media (max-width: 900px) {
        width: 100%;
        flex: none;
    }
`

const PanelOuter = styled.div`
    background: rgba(9, 9, 11, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    backdrop-filter: blur(8px);
`

const PanelInner = styled.div`
    background: var(--surface-2);
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    margin: 5px;
    border-radius: 2px;
    padding: 16px;
`

const PanelHeader = styled.div`
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 229, 255, 0.12);
`

const TelemetryRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;

    &:last-child { margin-bottom: 0; }
`

const TLabel = styled.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
`

const TValue = styled.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-primary);
    font-weight: 700;
`

const StatusRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.04);
`

const StatusDot = styled.span`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    animation: breathe 2.4s ease-in-out infinite;

    @keyframes breathe {
        0%, 100% { opacity: 1; box-shadow: 0 0 5px #4ade80; }
        50%       { opacity: 0.35; box-shadow: none; }
    }
`

const StatusLabel = styled.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: #4ade80;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`

const ScrollHint = styled.div`
    position: absolute;
    bottom: 36px;
    left: 10vw;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
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

const ROLE_TEXT = 'Render & Engine Engineer'

/* Simulated telemetry — static values that look plausible */
const TELEMETRY = [
    { label: 'FRAME',     value: '0.83 ms' },
    { label: 'FPS',       value: '120' },
    { label: 'TRIANGLES', value: '2.41 M' },
    { label: 'DRAW CALLS',value: '312' },
    { label: 'PARTICLES', value: '80 k' },
    { label: 'PIPELINE',  value: 'VULKAN 1.3' },
]

export default function Home() {
    const nameRef     = useRef(null)
    const ruleRef     = useRef(null)
    const roleRef     = useRef(null)
    const ctasRef     = useRef(null)
    const panelRef    = useRef(null)
    const scrollHint  = useRef(null)
    const sectionRef  = useRef(null)
    const [roleChars, setRoleChars] = useState([])

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 })

        tl.fromTo(nameRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
        )
        tl.to(ruleRef.current,
            { width: '100px', duration: 0.35, ease: 'power2.out' },
            '-=0.15'
        )
        tl.add(() => {
            let i = 0
            const interval = setInterval(() => {
                i++
                setRoleChars(ROLE_TEXT.slice(0, i).split(''))
                if (i >= ROLE_TEXT.length) clearInterval(interval)
            }, 38)
        })
        tl.to(roleRef.current, { opacity: 1, duration: 0.1 }, '-=0')
        tl.fromTo(panelRef.current,
            { opacity: 0, x: 16 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
        )
        tl.fromTo(ctasRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.1'
        )

        const handleScroll = () => {
            const scrollY = window.scrollY
            const vh = window.innerHeight
            const p = Math.min(Math.max((scrollY - vh * 0.35) / (vh * 0.4), 0), 1)
            if (nameRef.current) {
                nameRef.current.style.opacity = 1 - p
                nameRef.current.style.filter  = `blur(${p * 6}px)`
            }
            if (roleRef.current)   roleRef.current.style.opacity = Math.max(0, 1 - p * 1.5)
            if (panelRef.current)  panelRef.current.style.opacity = Math.max(0, 1 - p * 1.2)
            if (scrollHint.current) scrollHint.current.style.opacity = scrollY > 30 ? 0 : 1
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <HeroSection ref={sectionRef} id="hero">
            <Left>
                <HeroName ref={nameRef} style={{ opacity: 0 }}>
                    LOÏC<br />CHEN
                </HeroName>
                <HeroRule ref={ruleRef} />
                <HeroRole ref={roleRef}>
                    {roleChars.join('')}
                </HeroRole>
                <HeroCtas ref={ctasRef}>
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
            </Left>

            <TelemetryPanel ref={panelRef}>
                <PanelOuter>
                    <PanelInner>
                        <PanelHeader>// GPU TELEMETRY</PanelHeader>
                        {TELEMETRY.map(({ label, value }) => (
                            <TelemetryRow key={label}>
                                <TLabel>{label}</TLabel>
                                <TValue>{value}</TValue>
                            </TelemetryRow>
                        ))}
                        <StatusRow>
                            <StatusDot />
                            <StatusLabel>VULKAN: OK</StatusLabel>
                        </StatusRow>
                    </PanelInner>
                </PanelOuter>
            </TelemetryPanel>

            <ScrollHint ref={scrollHint}>scroll ↓</ScrollHint>
        </HeroSection>
    )
}
