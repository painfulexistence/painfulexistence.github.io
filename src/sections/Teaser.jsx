import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.section`
    min-height: 100vh;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    padding: 120px 10vw 0;

    @media (max-width: 767px) {
        padding: 80px 6vw 0;
    }
`

const SectionHeader = styled.div`
    .label {
        font-family: var(--font-mono);
        font-size: var(--fs-mono-md);
        color: var(--accent);
        letter-spacing: var(--ls-mono-wide);
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    h2 {
        font-family: var(--font-display);
        font-size: var(--fs-section-title);
        font-weight: var(--fw-hero);
        color: var(--text-primary);
        letter-spacing: var(--ls-heading);
        margin-bottom: 48px;
    }
`

const TeaserText = styled.p`
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 80px);
    font-weight: 800;
    color: var(--text-primary);
    opacity: 0;
    letter-spacing: var(--ls-hero);
`

const MarqueeWrap = styled.div`
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 10px 0;
    background: var(--surface-1);
    margin-top: auto;
`

const MarqueeTrack = styled.div`
    display: flex;
    white-space: nowrap;
    animation: marquee 28s linear infinite;

    @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
    }
`

const MarqueeText = styled.span`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    text-transform: uppercase;
    padding-right: 48px;
`

const TICKER = '// METAL // VULKAN // OPENGL // WEBGL // WEBGPU // COMPUTE SHADERS // PBR RENDERING // GPU-DRIVEN RENDERING // WEBASSEMBLY // CROSS-PLATFORM'

export default function Teaser() {
    const textRef = useRef(null)

    useEffect(() => {
        const el = textRef.current
        if (!el) return

        gsap.to(el, {
            opacity: 0.12,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
        })

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <div id="devverse">
            <Section >
                <SectionHeader>
                    <p className="label">// 02 · </p>
                    <h2>DevVerse</h2>
                </SectionHeader>
                <TeaserText ref={textRef}>SOMETHING BIG IS COMING SOON.</TeaserText>
            </Section>

            <MarqueeWrap>
                <MarqueeTrack>
                    <MarqueeText>{TICKER}</MarqueeText>
                    <MarqueeText>{TICKER}</MarqueeText>
                </MarqueeTrack>
            </MarqueeWrap>
        </div>
    )
}
