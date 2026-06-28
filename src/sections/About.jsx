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

const Avatar = styled.div`
    width: 180px;
    height: 220px;
    border-radius: 12px;
    border: 1px solid var(--accent);
    background: var(--surface-1);
    margin-bottom: 40px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
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
                <p className="label">// 03 · About</p>
                <h2>About</h2>
            </SectionHeader>
            <Avatar>
                <img src="/profile.jpg" alt="Loïc Chen" />
            </Avatar>
            <Body ref={bodyRef}>
                <p>In 2019, I lost myself in Hyrule Kingdom, The Legend of Zelda: Breath of the Wild for 400+ hours. I have determined to explore the arcane realms of engine and graphics programming since then.</p>
                <p>My secret to wander the abyss for so long, you asked? Well. Every morning I begin the clock with a gentle sip of citrus cream ice-drip dark liquid — my black magic to transform my existential crisis into productivity.</p>
            </Body>
        </Section>
    )
}
