import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const CAL_INTRO = 'lucidum/intro'

const Section = styled.section`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 120px 10vw;
    border-top: 1px solid var(--line);

    @media (max-width: 767px) {
        padding: 80px 6vw;
    }
`

const Inner = styled.div`
    max-width: 720px;
    opacity: 0;
    transform: translateY(20px);

    .label {
        font-family: var(--font-mono);
        font-size: var(--fs-mono-md);
        color: var(--accent);
        letter-spacing: var(--ls-mono-wide);
        text-transform: uppercase;
        margin-bottom: 16px;
    }

    h2 {
        font-family: var(--font-display);
        font-size: var(--fs-section-title);
        font-weight: var(--fw-hero);
        color: var(--text-primary);
        letter-spacing: var(--ls-heading);
        line-height: var(--lh-heading);
        margin-bottom: 24px;
    }

    p {
        font-family: var(--font-body);
        font-size: 18px;
        font-weight: 300;
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: 48px;
    }
`

const Actions = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const PrimaryCTA = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 32px;
    font-family: var(--font-mono);
    font-size: var(--fs-mono-md);
    letter-spacing: var(--ls-mono-wide);
    text-transform: uppercase;
    text-decoration: none;
    color: var(--bg);
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 2px;
    transition: background var(--t-fast), color var(--t-fast), transform var(--t-fast);

    &:hover {
        background: transparent;
        color: var(--accent);
        transform: translateY(-2px);
    }
`

const SecondaryCTA = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 18px 24px;
    font-family: var(--font-mono);
    font-size: var(--fs-mono-md);
    letter-spacing: var(--ls-mono-wide);
    text-transform: uppercase;
    text-decoration: none;
    color: var(--text-muted);
    border: 1px solid var(--line);
    border-radius: 2px;
    transition: color var(--t-fast), border-color var(--t-fast);

    &:hover {
        color: var(--accent);
        border-color: var(--line-accent);
    }
`

export default function ContactCTA() {
    const innerRef = useRef(null)

    useEffect(() => {
        const el = innerRef.current
        if (!el) return

        const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        })

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
        }
    }, [])

    return (
        <Section>
            <Inner ref={innerRef}>
                <p className="label">// Available for commissions</p>
                <h2>Have a build in mind?</h2>
                <p>
                    Short-term commissions and technical consulting on engine, graphics, and
                    tooling work. Reply within 48h.
                </p>
                <Actions>
                    <PrimaryCTA to="/contact">Commission a build →</PrimaryCTA>
                    <SecondaryCTA
                        href={`https://cal.com/${CAL_INTRO}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book 15 min intro →
                    </SecondaryCTA>
                </Actions>
            </Inner>
        </Section>
    )
}
