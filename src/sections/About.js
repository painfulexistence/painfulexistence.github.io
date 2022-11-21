import styled from "@emotion/styled"
import Image from "next/image"

const Section = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SelfIntro = styled.div`
    font-size: large;
    h1 {
        font-size: xx-large;
    }
`

const About = () => {
    return (
        <Section>
            <SelfIntro>
                <h1>Hi, I'm Loïc.</h1>
                <p>I'm a 4+ years experienced software engineer specializing in Web Development and Game Development.</p>
                <p>My passion lies in Computer Graphics, Game Engine Programming, and Realtime VFX.</p>
                <p>I currently work as a freelancer.</p>
                <p>Also a core gamer most fascinated by Soulsborne and Metroidvania games.</p>
            </SelfIntro>
        </Section>
    )
}

export default About