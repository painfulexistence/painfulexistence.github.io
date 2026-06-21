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
        &.reverse { flex-direction: column; }
    }
`

const ImageWrap = styled.div`
    flex: 0 0 56%;
    max-width: 56%;
    overflow: hidden;
    border-radius: 2px;
    clip-path: inset(0 100% 0 0);

    img {
        width: 100%;
        height: 62vh;
        object-fit: cover;
        display: block;
        will-change: transform;
        /* grayscale at rest, reveal on hover */
        filter: grayscale(0.7) contrast(1.1) brightness(0.85);
        transition: filter 600ms ease;
    }

    @media (max-width: 767px) {
        flex: none;
        max-width: 100%;
        width: 100%;
        position: absolute;
        inset: 0;
        clip-path: none;
        img {
            height: 100%;
            opacity: 0.25;
            filter: grayscale(1);
        }
    }
`

/* Outer card shell */
const InfoOuter = styled.div`
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
        .reverse & { padding: 0; transform: none; }
    }

    /* hover on outer reveals image color */
    &:hover ~ .image-wrap img,
    &:hover + .image-wrap img {
        filter: grayscale(0) contrast(1) brightness(1);
    }
`

/* Use className-based hover — avoids Emotion component selector constraint */
const InfoCard = styled.div`
    background: rgba(9, 9, 11, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: border-color 250ms;

    &:hover {
        border-color: rgba(0, 229, 255, 0.2);
    }
`

const InfoCardInner = styled.div`
    background: var(--surface-2);
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    margin: 6px;
    border-radius: 2px;
    padding: 28px;
    transition: border-color 250ms;

    .${InfoCard}:hover & {
        border-color: rgba(0, 229, 255, 0.18);
    }
`

const AccentLine = styled.div`
    width: 0;
    height: 2px;
    background: var(--accent);
    margin-bottom: 18px;
    border-radius: 1px;
`

const EngineName = styled.h2`
    font-family: var(--font-display);
    font-size: clamp(24px, 2.6vw, 36px);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 10px;
`

const TechLine = styled.p`
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    margin-bottom: 18px;
    text-transform: uppercase;
`

const FeatureList = styled.ul`
    list-style: none;
    margin-bottom: 24px;

    li {
        font-family: var(--font-body);
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 7px;
        padding-left: 14px;
        position: relative;
        line-height: 1.5;

        &::before {
            content: '//';
            position: absolute;
            left: 0;
            color: var(--accent);
            font-family: var(--font-mono);
            font-size: 9px;
            top: 1px;
        }
    }
`

const SiteLink = styled.a`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: color 150ms;

    .arrow {
        display: inline-block;
        transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover { color: var(--accent); }
    &:hover .arrow { transform: translateX(4px); }
`

/* Marquee ticker */
const MarqueeWrap = styled.div`
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 10px 0;
    background: var(--surface-1);
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
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-right: 48px;
`

const TICKER = 'VULKAN 1.3 // COMPUTE SHADERS // PBR RENDERING // CASCADED SHADOW MAPS // BINDLESS TEXTURES // RENDER GRAPHS // EMSCRIPTEN // WASM // '

function EngineCard({ name, tech, features, href, imgSrc, imgAlt, reverse }) {
    const sectionRef   = useRef(null)
    const imageWrapRef = useRef(null)
    const imgRef       = useRef(null)
    const infoRef      = useRef(null)
    const lineRef      = useRef(null)

    useEffect(() => {
        const section   = sectionRef.current
        const imageWrap = imageWrapRef.current
        const img       = imgRef.current
        const info      = infoRef.current
        const line      = lineRef.current
        if (!section || !imageWrap || !info || !line) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        })

        tl.to(imageWrap, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.out' })
          .to(line, { width: '40px', duration: 0.3, ease: 'power2.out' }, '-=0.2')
          .to(info, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25')

        if (img) {
            gsap.to(img, {
                yPercent: -6,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            })
        }

        // Hover: reveal image color when hovering info card
        const card = info.querySelector('.info-card')
        if (card && img) {
            card.addEventListener('mouseenter', () => {
                gsap.to(img, { filter: 'grayscale(0) contrast(1) brightness(1)', duration: 0.5 })
            })
            card.addEventListener('mouseleave', () => {
                gsap.to(img, { filter: 'grayscale(0.7) contrast(1.1) brightness(0.85)', duration: 0.5 })
            })
        }

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <EngineSection ref={sectionRef} className={reverse ? 'reverse' : ''}>
            <ImageWrap ref={imageWrapRef} className="image-wrap">
                <img ref={imgRef} src={imgSrc} alt={imgAlt} />
            </ImageWrap>
            <InfoOuter ref={infoRef}>
                <InfoCard className="info-card">
                    <InfoCardInner>
                        <AccentLine ref={lineRef} />
                        <EngineName>{name}</EngineName>
                        <TechLine>{tech}</TechLine>
                        <FeatureList>
                            {features.map((f, i) => <li key={i}>{f}</li>)}
                        </FeatureList>
                        <SiteLink href={href} target="_blank" rel="noopener noreferrer">
                            OPEN ENGINE SITE <span className="arrow">→</span>
                        </SiteLink>
                    </InfoCardInner>
                </InfoCard>
            </InfoOuter>
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

            <MarqueeWrap>
                <MarqueeTrack>
                    {/* Duplicate for seamless loop */}
                    <MarqueeText>{TICKER}</MarqueeText>
                    <MarqueeText>{TICKER}</MarqueeText>
                </MarqueeTrack>
            </MarqueeWrap>
        </div>
    )
}
