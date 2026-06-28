import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 10vw 80px;

    @media (max-width: 767px) {
        padding: 80px 6vw 60px;
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

const Body = styled.div`
    max-width: 560px;
    opacity: 0;
    transform: translateY(20px);

    p {
        font-family: var(--font-body);
        font-size: 18px;
        font-weight: 300;
        color: var(--text-primary);
        line-height: 1.8;
        margin-bottom: 24px;

        &:last-child { margin-bottom: 0; }
    }
`

export default function About() {
    const bodyRef = useRef(null)

    useEffect(() => {
        const el = bodyRef.current
        if (!el) return

        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
        <Section id="about">
            <SectionHeader>
                <p className="label">// 03 · ABOUT</p>
                <h2>About</h2>
            </SectionHeader>
            <Body ref={bodyRef}>
                <p>I build game engines from scratch — not because I have to, but because understanding how a renderer thinks is the only way I know how to really learn graphics programming.</p>
                <p>Outside of C++ and shaders, you'll find me in oversized dark layers, with blue hair and nails I spend too long on. The precision I put into those things is the same precision I put into code.</p>
                <p>Right now I'm deep in a Vulkan renderer — thinking about render graphs, GPU memory, and how to make light behave.</p>
                <p>I play Soulsborne games badly and Metroidvanias well.</p>
            </Body>
        </Section>
    )
}
