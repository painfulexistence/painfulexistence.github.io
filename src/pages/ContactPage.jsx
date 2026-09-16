import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'
import Cal, { getCalApi } from '@calcom/embed-react'
import Atmosphere from '../components/Atmosphere'

gsap.registerPlugin(ScrollTrigger)

const CAL_LINK = 'lucidum/commission'
const CAL_INTRO = 'lucidum/intro'
const EMAIL = 'ming.crepuscular@gmail.com'

const Page = styled.main`
    min-height: 100vh;
    padding: 140px 10vw 120px;

    @media (max-width: 767px) {
        padding: 100px 6vw 80px;
    }
`

const PageHeader = styled.header`
    margin-bottom: 64px;

    .label {
        font-family: var(--font-mono);
        font-size: var(--fs-mono-md);
        color: var(--accent);
        letter-spacing: var(--ls-mono-wide);
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    h1 {
        font-family: var(--font-display);
        font-size: var(--fs-section-title);
        font-weight: var(--fw-hero);
        color: var(--text-primary);
        letter-spacing: var(--ls-heading);
        line-height: var(--lh-heading);
    }
`

const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(280px, 420px) 1fr;
    gap: 64px;
    align-items: start;

    @media (max-width: 959px) {
        grid-template-columns: 1fr;
        gap: 40px;
    }
`

const Intro = styled.div`
    opacity: 0;
    transform: translateY(20px);

    p {
        font-family: var(--font-body);
        font-size: 18px;
        font-weight: 300;
        color: var(--text-primary);
        line-height: 1.8;
        margin-bottom: 24px;
    }

    .services {
        list-style: none;
        margin-bottom: 32px;
    }

    .services li {
        font-family: var(--font-mono);
        font-size: var(--fs-body-sm);
        color: var(--text-muted);
        letter-spacing: var(--ls-mono);
        padding: 8px 0;
        border-bottom: 1px solid var(--line);
        text-transform: uppercase;
    }

    .services li::before {
        content: '→ ';
        color: var(--accent);
    }

    .meta {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid var(--line-accent);
    }

    .meta-row {
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: var(--font-mono);
        font-size: var(--fs-mono-md);
        color: var(--text-muted);
        letter-spacing: var(--ls-mono);
        text-transform: uppercase;
    }

    .meta-key {
        color: var(--accent);
    }

    .meta a {
        color: var(--text-primary);
        text-decoration: none;
        transition: color var(--t-fast);
    }

    .meta a:hover {
        color: var(--accent);
    }
`

const SchedulerFrame = styled.div`
    position: relative;
    background: var(--surface-1);
    border: 1px solid var(--line-accent);
    border-radius: 4px;
    padding: 6px;
    opacity: 0;
    transform: translateY(20px);

    &::before {
        content: '// SCHEDULER';
        position: absolute;
        top: -10px;
        left: 16px;
        padding: 0 8px;
        background: var(--bg);
        font-family: var(--font-mono);
        font-size: var(--fs-mono-sm);
        color: var(--accent);
        letter-spacing: var(--ls-mono-wide);
    }

    .cal-inner {
        background: var(--surface-2);
        border: 1px solid rgba(255, 255, 255, 0.03);
        border-radius: 2px;
        min-height: 640px;
        overflow: hidden;
    }
`

export default function ContactPage() {
    const introRef = useRef(null)
    const frameRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        ;(async () => {
            const cal = await getCalApi({ namespace: 'commission' })
            cal('ui', {
                theme: 'dark',
                cssVarsPerTheme: {
                    dark: {
                        'cal-brand': '#00e5ff',
                        'cal-bg': '#0a0a0c',
                        'cal-bg-emphasis': '#111116',
                        'cal-text': '#e8e8e8',
                        'cal-text-emphasis': '#ffffff',
                        'cal-text-muted': '#666680',
                        'cal-border': 'rgba(255, 255, 255, 0.05)',
                        'cal-border-emphasis': 'rgba(0, 229, 255, 0.2)',
                    },
                },
                hideEventTypeDetails: false,
                layout: 'month_view',
            })
        })()
    }, [])

    useEffect(() => {
        const targets = [introRef.current, frameRef.current].filter(Boolean)
        if (!targets.length) return

        const tween = gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
        })

        return () => tween.kill()
    }, [])

    return (
        <>
            <Atmosphere />
            <Page id="contact">
                <PageHeader>
                    <p className="label">// 04 · Contact</p>
                    <h1>Commission a build</h1>
                </PageHeader>

                <Layout>
                    <Intro ref={introRef}>
                        <p>
                            Open for short-term commissions and technical consulting — engine and
                            graphics programming, rendering pipelines, tooling, and prototype builds.
                        </p>

                        <ul className="services">
                            <li>Engine / renderer prototypes</li>
                            <li>Graphics &amp; shader consulting</li>
                            <li>Tooling &amp; pipeline work</li>
                            <li>Technical advisory</li>
                        </ul>

                        <div className="meta">
                            <div className="meta-row">
                                <span className="meta-key">INTRO</span>
                                <a
                                    href={`https://cal.com/${CAL_INTRO}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    15 min free chat →
                                </a>
                            </div>
                            <div className="meta-row">
                                <span className="meta-key">RESPONSE</span>
                                <span>within 48h</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-key">EMAIL</span>
                                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                            </div>
                        </div>
                    </Intro>

                    <SchedulerFrame ref={frameRef}>
                        <div className="cal-inner">
                            <Cal
                                namespace="commission"
                                calLink={CAL_LINK}
                                style={{ width: '100%', height: '100%', minHeight: '640px' }}
                                config={{ layout: 'month_view', theme: 'dark' }}
                            />
                        </div>
                    </SchedulerFrame>
                </Layout>
            </Page>
        </>
    )
}
