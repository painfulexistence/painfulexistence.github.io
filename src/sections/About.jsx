import styled from "@emotion/styled"

const Section = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-xl);
`

const Title = styled.h1`
    align-self: center;
    font-size: var(--font-size-xl);
`

const SelfIntro = styled.div`
    font-size: var(--font-size-sm);
    h1 {
        font-size: var(--font-size-lg);
    }
`

const About = () => {
    return (
        <Section>
            <Title>About</Title>
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