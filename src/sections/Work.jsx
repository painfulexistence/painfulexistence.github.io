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

const SectionTitle = styled.h2`
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 64px;
`

const Timeline = styled.div`
    position: relative;
    padding-left: 28px;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
        width: 2px;
        background: var(--line);
    }
`

const TimelineEntry = styled.div`
    position: relative;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateY(16px);

    &:last-child {
        margin-bottom: 0;
    }

    &::before {
        content: '';
        position: absolute;
        left: -34px;
        top: 7px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-blue);
        box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.15);
    }
`

const Company = styled.h3`
    font-family: var(--font-display);
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
`

const DateRange = styled.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    display: block;
    margin-bottom: 6px;
    letter-spacing: 0.04em;
`

const Role = styled.p`
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 400;
`

const CVFooter = styled.div`
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--line);
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--text-muted);

    a {
        color: var(--text-muted);
        text-decoration: none;
        position: relative;
        transition: color 150ms;

        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--accent-blue);
            transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        &:hover {
            color: var(--text-primary);
        }
        &:hover::after {
            width: 100%;
        }
    }
`

const ENTRIES = [
    {
        company: 'LyraVR',
        date: '2021 – 2022',
        role: 'VR Gameplay Programmer',
    },
    {
        company: 'Clubon',
        date: '2019 – 2021',
        role: 'Full-Stack Web Developer & Game Programmer',
    },
    {
        company: 'Digital Learning Center, NTU',
        date: '2018 – 2019',
        role: 'Full-Stack Web Developer',
    },
]

export default function Work() {
    const entriesRef = useRef([])

    useEffect(() => {
        entriesRef.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                delay: i * 0.08,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            })
        })
    }, [])

    return (
        <Section id="work">
            <SectionTitle>Work</SectionTitle>
            <Timeline>
                {ENTRIES.map((entry, i) => (
                    <TimelineEntry
                        key={entry.company}
                        ref={el => { entriesRef.current[i] = el }}
                    >
                        <Company>{entry.company}</Company>
                        <DateRange>{entry.date}</DateRange>
                        <Role>{entry.role}</Role>
                    </TimelineEntry>
                ))}
            </Timeline>
            <CVFooter>
                Full project history compiled in CV —{' '}
                <a href="/cv/loic-chen-cv.pdf" download>Download PDF ↗</a>
            </CVFooter>
        </Section>
    )
}
