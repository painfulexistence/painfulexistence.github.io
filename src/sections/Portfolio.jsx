import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from '@emotion/styled'
import imgAtmospheric from '../assets/images/atmospheric_2.png'
import imgVapor from '../assets/images/shader_wireframe_vector.png'

gsap.registerPlugin(ScrollTrigger)

const EngineSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 10vw;
    position: relative;
    overflow: hidden;

    &.reverse {
        flex-direction: row-reverse;
    }

    @media (max-width: 767px) {
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 6vw 80px;
        &.reverse {
            flex-direction: column;
        }
    }
`

const ImageWrap = styled.div`
    flex: 0 0 58%;
    max-width: 58%;
    overflow: hidden;
    border-radius: 2px;
    clip-path: inset(0 100% 0 0);

    img {
        width: 100%;
        height: 65vh;
        object-fit: cover;
        border-radius: 2px;
        display: block;
        will-change: transform;
    }

    @media (max-width: 767px) {
        flex: none;
        max-width: 100%;
        width: 100%;
        position: absolute;
        inset: 0;
        z-index: 0;
        clip-path: none;

        img {
            height: 100%;
            opacity: 0.3;
        }
    }
`

const InfoWrap = styled.div`
    flex: 1;
    padding: 0 0 0 48px;
    opacity: 0;
    transform: translateX(24px);

    .reverse & {
        padding: 0 48px 0 0;
        transform: translateX(-24px);
    }

    @media (max-width: 767px) {
        position: relative;
        z-index: 1;
        padding: 0;
        transform: none;
        opacity: 1;
        .reverse & {
            padding: 0;
            transform: none;
        }
    }
`

const AccentLine = styled.div`
    width: 0;
    height: 3px;
    background: var(--accent-blue);
    margin-bottom: 20px;
    border-radius: 1px;
`

const EngineName = styled.h2`
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
`

const TechLine = styled.p`
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    margin-bottom: 20px;
`

const FeatureList = styled.ul`
    list-style: none;
    margin-bottom: 32px;

    li {
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--text-muted);
        margin-bottom: 8px;
        padding-left: 16px;
        position: relative;

        &::before {
            content: '·';
            position: absolute;
            left: 0;
            color: var(--accent-blue);
        }
    }
`

const SiteLink = styled.a`
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: color 150ms;

    .arrow {
        display: inline-block;
        transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover {
        color: var(--text-primary);
    }
    &:hover .arrow {
        transform: translateX(4px);
    }
`

function EngineCard({ name, tech, features, href, imgSrc, imgAlt, reverse }) {
    const sectionRef = useRef(null)
    const imageWrapRef = useRef(null)
    const imgRef = useRef(null)
    const infoRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const imageWrap = imageWrapRef.current
        const img = imgRef.current
        const info = infoRef.current
        const line = lineRef.current

        if (!section || !imageWrap || !info || !line) return

        // Clip-path reveal on scroll enter
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        })

        revealTl
            .to(imageWrap, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.7,
                ease: 'power2.out',
            })
            .to(line, {
                width: '48px',
                duration: 0.35,
                ease: 'power2.out',
            }, '-=0.2')
            .to(info, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.3')

        // Image parallax: moves at slower speed than scroll
        if (img) {
            gsap.to(img, {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <EngineSection ref={sectionRef} className={reverse ? 'reverse' : ''}>
            <ImageWrap ref={imageWrapRef}>
                <img ref={imgRef} src={imgSrc} alt={imgAlt} />
            </ImageWrap>
            <InfoWrap ref={infoRef}>
                <AccentLine ref={lineRef} />
                <EngineName>{name}</EngineName>
                <TechLine>{tech}</TechLine>
                <FeatureList>
                    {features.map((f, i) => <li key={i}>{f}</li>)}
                </FeatureList>
                <SiteLink href={href} target="_blank" rel="noopener noreferrer">
                    Open Engine Site <span className="arrow">→</span>
                </SiteLink>
            </InfoWrap>
        </EngineSection>
    )
}

export default function Portfolio() {
    return (
        <div id="engines">
            <EngineCard
                name="Atmospheric"
                tech="C++ · OpenGL 4.6 · Bullet Physics · Emscripten"
                features={[
                    'PBR material pipeline (Cook-Torrance BRDF)',
                    'Cascaded shadow maps & omnidirectional point shadows',
                    'Post-process stack: HDR, Bloom, SSAO, FXAA',
                    'Cross-platform: Native + WebAssembly (Emscripten)',
                    'Entity-Component System architecture',
                ]}
                href="https://verse.lucidum.dev/atmospheric/"
                imgSrc={imgAtmospheric}
                imgAlt="Atmospheric Engine render"
                reverse={false}
            />
            <EngineCard
                name="Project Vapor"
                tech="C++20 · Vulkan 1.3 · WASM"
                features={[
                    'Render graph with auto-barrier synchronization',
                    'Bindless texture array & GPU-driven rendering',
                    'Custom Vulkan memory allocator integration',
                    'Thread-safe ring buffer for GPU uploads',
                    'Ray-traced shadow maps',
                ]}
                href="https://verse.lucidum.dev/vapor/"
                imgSrc={imgVapor}
                imgAlt="Project Vapor render"
                reverse={true}
            />
        </div>
    )
}
