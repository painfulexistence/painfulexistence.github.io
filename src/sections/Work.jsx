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
    padding: 80px 10vw;
`

const SectionHeader = styled.div`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    letter-spacing: var(--ls-mono-wide);
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 48px;

    &::before { content: '// '; }
`

const LogBlock = styled.div`
    background: rgba(9, 9, 11, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    max-width: 640px;
`

const LogInner = styled.div`
    background: var(--surface-2);
    border: 1px solid rgba(255,255,255,0.03);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    margin: 5px;
    border-radius: 2px;
    padding: 24px 28px;
`

const LogPrompt = styled.div`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-xs);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    margin-bottom: 20px;
    opacity: 0.6;
`

const Entry = styled.div`
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(12px);

    &:last-child { margin-bottom: 0; }
`

const Company = styled.div`
    font-family: var(--font-display);
    font-size: var(--fs-subheading);
    font-weight: var(--fw-subheading);
    line-height: var(--lh-subheading);
    color: var(--text-primary);
    margin-bottom: 3px;
`

const Meta = styled.div`
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 4px;
`

const DateRange = styled.span`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--accent);
    letter-spacing: var(--ls-mono);
`

const Role = styled.span`
    font-family: var(--font-body);
    font-size: var(--fs-body-sm);
    color: var(--text-muted);
`

const Divider = styled.div`
    height: 1px;
    background: rgba(255,255,255,0.04);
    margin: 20px 0;
`

const CVLine = styled.div`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    margin-top: 32px;

    a {
        color: var(--text-muted);
        text-decoration: none;
        transition: color 150ms;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--accent);
            transition: width 250ms cubic-bezier(0.16,1,0.3,1);
        }

        &:hover { color: var(--accent); }
        &:hover::after { width: 100%; }
    }
`

const ENTRIES = [
    { company: 'LyraVR',                             date: '2021 – 2022', role: 'VR Gameplay Programmer' },
    { company: 'Clubon',                             date: '2019 – 2021', role: 'Full-Stack Web Developer & Game Programmer' },
    { company: 'Digital Learning Center, NTU',       date: '2018 – 2019', role: 'Full-Stack Web Developer' },
]

export default function Work() {
    const entriesRef = useRef([])

    useEffect(() => {
        entriesRef.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
                delay: i * 0.1,
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            })
        })
    }, [])

    return (
        <Section id="work">
            <SectionHeader>SYS_LOG // COMMERCIAL_HIGHLIGHTS</SectionHeader>
            <LogBlock>
                <LogInner>
                    <LogPrompt>$ cat work_history.log</LogPrompt>
                    {ENTRIES.map((entry, i) => (
                        <div key={entry.company}>
                            <Entry ref={el => { entriesRef.current[i] = el }}>
                                <Company>{entry.company}</Company>
                                <Meta>
                                    <DateRange>{entry.date}</DateRange>
                                    <Role>{entry.role}</Role>
                                </Meta>
                            </Entry>
                            {i < ENTRIES.length - 1 && <Divider />}
                        </div>
                    ))}
                </LogInner>
            </LogBlock>
            <CVLine>
                // full project history compiled →{' '}
                <a href="/cv/loic-chen-cv.pdf" download>DOWNLOAD_CV.pdf ↗</a>
            </CVLine>
        </Section>
    )
}
