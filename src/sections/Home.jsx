import styled from "@emotion/styled"
import ScrambleText from "../components/ScrambleText"

const Section = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 60px;
        font-weight: 800;
        margin: 0;
    }

    h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }
`

const Home = () => {
    return (
        <Section>
            <Title>
                <h1><ScrambleText text="Loïc Chen" /></h1>
                <h2><ScrambleText text="Render & Engine Engineer" /></h2>
                <h2><ScrambleText text="Full-Stack Web Developer" /></h2>
            </Title>
        </Section>
    )
}

export default Home