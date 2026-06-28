import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.div`
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

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    opacity: 0;
    transform: translateY(20px);

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`

const CardOuter = styled.div`
    background: rgba(9, 9, 11, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: border-color var(--t-normal);

    &:hover {
        border-color: rgba(0, 229, 255, 0.2);
    }
`

const CardInner = styled.div`
    background: var(--surface-2);
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    margin: 6px;
    border-radius: 2px;
    overflow: hidden;
    transition: border-color var(--t-normal);

    .card-outer:hover & {
        border-color: rgba(0, 229, 255, 0.18);
    }
`

const CardVideo = styled.video`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    filter: grayscale(0.5) brightness(0.85);
`

const CardBody = styled.div`
    padding: 24px 24px 28px;
`

const AccentLine = styled.div`
    width: 40px;
    height: 2px;
    background: var(--accent);
    margin-bottom: 18px;
    border-radius: 1px;
`

const EngineName = styled.h2`
    font-family: var(--font-display);
    font-size: var(--fs-heading);
    font-weight: var(--fw-heading);
    line-height: var(--lh-heading);
    color: var(--text-primary);
    margin-bottom: 10px;
`

const TechLine = styled.p`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-sm);
    color: var(--text-muted);
    letter-spacing: var(--ls-mono);
    margin-bottom: 18px;
    text-transform: uppercase;
`

const FeatureList = styled.ul`
    list-style: none;
    margin-bottom: 24px;

    li {
        font-family: var(--font-body);
        font-size: var(--fs-body-sm);
        color: var(--text-muted);
        margin-bottom: 7px;
        padding-left: 14px;
        position: relative;
        line-height: var(--lh-body-sm);

        &::before {
            content: '//';
            position: absolute;
            left: 0;
            color: var(--accent);
            font-family: var(--font-mono);
            font-size: var(--fs-mono-xs);
            top: 1px;
        }
    }
`

const SiteLink = styled.a`
    font-family: var(--font-mono);
    font-size: var(--fs-mono-md);
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: var(--ls-mono);
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: color var(--t-fast);

    .arrow {
        display: inline-block;
        transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover { color: var(--accent); }
    &:hover .arrow { transform: translateX(4px); }
`

const ENGINES = [
    {
        name: 'Atmospheric',
        tech: 'C++ · OpenGL 4.1 · WebGL 2.0 · Emscripten',
        features: [
            'Cross-platform: Windows / macOS / Linux / Emscripten / iOS / Android',
            '2D + 3D PBR forward renderer, with post-process stack: HDR tonemapping, Bloom, Chromatic Aberration',
            'Component-based architecture',
            'Built-in job system',
            'Physics engine (Bullet) integration',
            'UI framework (RmlUI) integration'
        ],
        href: 'https://verse.lucidum.dev/atmospheric/',
        videoSrc: 'https://verse.lucidum.dev/videos/DEMO_voxel-world.mov',
    },
    {
        name: 'Project Vapor',
        tech: 'C++20 · Metal · Vulkan',
        features: [
            'Modern 3D PBR forward renderer with Tile-based Light Culling',
            'ECS architecture',
            'Ray-traced shadow maps for main directional light',
            'Task scheduler (enkiTS) integration',
            'Physics engine (Jolt) integration',
            'UI framework (RmlUI) integration'
        ],
        href: 'https://verse.lucidum.dev/vapor/',
        videoSrc: 'https://verse.lucidum.dev/videos/DEMO_raytraced-shadow-and-tiled-light-culling.mov',
    },
]

export default function Portfolio() {
    const gridRef = useRef(null)

    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return

        gsap.to(grid, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
        })

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <div id="engines">
            <Section>
                <SectionHeader>
                    <p className="label">// 01 · </p>
                    <h2>My Works</h2>
                </SectionHeader>

                <CardGrid ref={gridRef}>
                    {ENGINES.map((engine) => (
                        <CardOuter key={engine.name} className="card-outer">
                            <CardInner className="card-inner">
                                <CardVideo
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    src={engine.videoSrc}
                                />
                                <CardBody>
                                    <AccentLine />
                                    <EngineName>{engine.name}</EngineName>
                                    <TechLine>{engine.tech}</TechLine>
                                    <FeatureList>
                                        {engine.features.map((f) => (
                                            <li key={f}>{f}</li>
                                        ))}
                                    </FeatureList>
                                    <SiteLink href={engine.href} target="_blank" rel="noopener noreferrer">
                                        OPEN ENGINE SITE <span className="arrow">→</span>
                                    </SiteLink>
                                </CardBody>
                            </CardInner>
                        </CardOuter>
                    ))}
                </CardGrid>
            </Section>
        </div>
    )
}
