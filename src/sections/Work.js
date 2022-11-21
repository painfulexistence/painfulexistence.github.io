import styled from "@emotion/styled"

const Section = styled.section`
    margin: 60px;
`

const Timeline = styled.div`
    padding: 60px 120px 60px 120px;
    border-radius: 30px;
    background: rgba(1, 1, 1, 0.1);
    backdrop-filter: saturate(60%) blur(20px);
`

const Work = () => {
    return (
        <Section  data-scroll-container>
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
                    <h1>Full-stack Web Developer</h1>
                </div>
            </Timeline>
        </Section>
    )
}

export default Work