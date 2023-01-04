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
    padding: 2.5% 5% 2.5% 5%;
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
                    <h3>LyraVR</h3>
                    <h6>2021/06 - 2022/08</h6>
                    <h3>VR Gameplay Programmer</h3>
                </div>
                <br />
                <div>
                    <h3>Clubon</h3>
                    <h6>2019/12 - 2021/03</h6>
                    <h3>Full-Stack Web Developer & Game Programmer</h3>
                </div>
                <br />
                <div>
                    <h3>Digital Learning Center, National Taiwan University</h3>
                    <h6>2018/05 - 2019/11</h6>
                    <h3>Full-Stack Web Developer</h3>
                </div>
            </Timeline>
        </Section>
    )
}

export default Work