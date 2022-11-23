import styled from "@emotion/styled"
import Box from "@mui/material/Box"

const Section = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
`

const Title = styled.h1`
    align-self: center;
    font-size: 40px;
`

const Timeline = styled.div`
    padding: 30px 60px 30px 60px;
    border-radius: 30px;
    background: rgba(1, 1, 1, 0.1);
    backdrop-filter: saturate(120%) blur(20px);
`

const Work = () => {
    return (
        <Section>
            <Title>Experiences</Title>
            <Timeline>
                <div>
                    <h1>LyraVR</h1>
                    <h3>2021/06 - 2022/08</h3>
                    <h1>VR Gameplay Programmer</h1>
                </div>
                <br />
                <div>
                    <h1>Clubon</h1>
                    <h3>2019/12 - 2021/03</h3>
                    <h1>Full-Stack Web Developer & Game Programmer</h1>
                </div>
                <br />
                <div>
                    <h1>Digital Learning Center, National Taiwan University</h1>
                    <h3>2018/05 - 2019/11</h3>
                    <h1>Full-Stack Web Developer</h1>
                </div>
            </Timeline>
        </Section>
    )
}

export default Work