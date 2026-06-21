import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import styled from '@emotion/styled'
import StarryBackground from '../components/StarryBackground'

const PageWrap = styled.div`
    min-height: 100vh;
    position: relative;
`

const CanvasLayer = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
`

const Content = styled.main`
    position: relative;
    z-index: 1;
    max-width: 560px;
    margin: 0 auto;
    padding: 20vh var(--spacing-md) 80px;
    opacity: 0;
`

const PageTitle = styled.h1`
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 48px);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 40px;
`

const Body = styled.div`
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 300;
    color: var(--text-primary);
    line-height: 1.8;

    p {
        margin-bottom: 24px;
    }
`

const BackLink = styled(Link)`
    display: inline-block;
    margin-top: 48px;
    font-family: var(--font-body);
    font-size: 14px;
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
`

export default function About() {
    const contentRef = useRef(null)

    useEffect(() => {
        gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.2,
        })
    }, [])

    return (
        <PageWrap>
            <CanvasLayer>
                <Canvas
                    camera={{ position: [0, 0, 100], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <StarryBackground />
                </Canvas>
            </CanvasLayer>

            <Content ref={contentRef} style={{ transform: 'translateY(20px)' }}>
                <PageTitle>About</PageTitle>
                <Body>
                    {/* Replace these four sentences with your own words */}
                    <p>I build game engines from scratch — not because I have to, but because understanding how a renderer thinks is the only way I know how to really learn graphics programming.</p>
                    <p>Outside of C++ and shaders, you'll find me in oversized dark layers, with blue hair and nails I spend too long on. The precision I put into those things is the same precision I put into code.</p>
                    <p>Right now I'm deep in a Vulkan renderer — thinking about render graphs, GPU memory, and how to make light behave.</p>
                    <p>I play Soulsborne games badly and Metroidvanias well.</p>
                </Body>
                <BackLink to="/">← Back</BackLink>
            </Content>
        </PageWrap>
    )
}
