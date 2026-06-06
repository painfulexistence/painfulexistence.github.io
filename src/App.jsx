import { useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { Canvas } from "@react-three/fiber"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import NavBar from "./components/Navbar"
import Home from "./sections/Home"
import Work from "./sections/Work"
import Portfolio from "./sections/Portfolio"
import About from "./sections/About"
import StarryBackground from "./components/StarryBackground"
import AnimatedSection from "./components/AnimatedSection"
import Cursor from "./components/Cursor"

// 註冊 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
`

const ThreeJSContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`

const TexturedOverlay = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: var(--color-overlay);
    pointer-events: none; /* 讓點擊穿透 */
`

const ContentContainer = styled.div`
    position: relative;
    z-index: 2;
    background: transparent;
`

const Section = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
`

const App = () => {
    const appRef = useRef(null)
    const sectionsRef = useRef([])

    useEffect(() => {
        // 重新整理 GSAP 觸發器
        ScrollTrigger.refresh()

        return () => {
            // 清除所有的 ScrollTrigger 實例防止記憶體洩漏
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const handleNavigate = (sectionName) => {
        // 將導覽名稱映射為索引值
        const sectionMap = {
            "Home": 0,
            "Portfolio": 1,
            "Experiences": 2,
            "About": 3
        }
        
        const index = sectionMap[sectionName]
        const targetSection = sectionsRef.current[index]
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    const addSectionRef = (el, index) => {
        sectionsRef.current[index] = el
    }

    return (
        <AppContainer ref={appRef}>
            {/* 3D 背景 */}
            <ThreeJSContainer>
                <Canvas
                    camera={{ position: [0, 0, 100], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <StarryBackground />
                </Canvas>
                <TexturedOverlay />
            </ThreeJSContainer>

            {/* 導覽列 */}
            <NavBar onNavigate={handleNavigate} />

            {/* 主要網頁內容區域 */}
            <ContentContainer>
                <AnimatedSection
                    ref={(el) => addSectionRef(el, 0)}
                    animationType="fadeIn"
                >
                    <Section>
                        <Home />
                    </Section>
                </AnimatedSection>

                <AnimatedSection
                    ref={(el) => addSectionRef(el, 1)}
                    animationType="slideInLeft"
                >
                    <Section>
                        <Portfolio />
                    </Section>
                </AnimatedSection>

                <AnimatedSection
                    ref={(el) => addSectionRef(el, 2)}
                    animationType="slideInRight"
                >
                    <Section>
                        <Work />
                    </Section>
                </AnimatedSection>

                <AnimatedSection
                    ref={(el) => addSectionRef(el, 3)}
                    animationType="scaleIn"
                >
                    <Section>
                        <About />
                    </Section>
                </AnimatedSection>
            </ContentContainer>

            {/* 自訂游標 */}
            <Cursor />
        </AppContainer>
    )
}

export default App
