import styled from "@emotion/styled"
import Masonry from "@mui/lab/Masonry"
import Project from "../components/Project"
import imgAtmospheric from "../assets/images/atmospheric_2.png"
import imgPlayReal from "../assets/images/playreal_2.png"
import imgTheVictimsGame from "../assets/images/victims-game.png"
import imgSymphony from "../assets/images/symphony.png"
import imgMarkbook from "../assets/images/markbook_2.png"
import imgOutOfTheAshes from "../assets/images/out-of-the-ashes.png"

const Section = styled.section`
    height: 500vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px;
    background: rgba(0.1, 0.1, 0.1, 0.2);
`

const Title = styled.h1`
    align-self: center;
    font-size: 40px;
    padding-bottom: 40px;
`

const Item = styled.div`
    
`

const Portfolio = () => {
    return (
        <Section>
            <Title>Projects</Title>
            <Masonry columns={{xs: 1, sm: 2}} spacing={{xs: 2, sm: 4, lg: 12}}>
                <Item key={0}>
                    <Project
                        title="Out of The Ashes"
                        subheader="Godot"
                        imgSrc={imgOutOfTheAshes}
                        imgAlt="Out of The Ashes screenshot"
                        content="A 3D adventure RPG in a medieval setting made with Godot Engine. I was responsible for visual effects and AI programming."
                    />
                </Item>
                <Item key={1}>
                    <Project
                        title="Unannouced Fishing Game"
                        subheader="Unity"
                        content="A VR fishing game made with Unity Engine. I was responsible for gameplay programming and custom shaders."
                    />
                </Item>
                <Item key={2}>
                    <Project
                        title="Atmospheric 3D"
                        subheader="C++, OpenGL"
                        imgSrc={imgAtmospheric}
                        imgAlt="Atmospheric Engine screenshot"
                        content={
                            <p>My own cross-platform 3D game engine written in C++. The engine was built with OpenGL and Bullet Physics, featuring HDR rendering, PBR materials, point shadows, directional shadows, and a handful of post-processing effects. I was responsible for the whole project.</p>
                        }
                    />
                </Item>
                <Item key={3}>
                    <Project
                        title="PlayReal Engine"
                        subheader="ReactJS, Ruby on Rails"
                        imgSrc={imgPlayReal}
                        imgAlt="PlayReal Engine website screenshot"
                        content={
                            <p>A web-based narrative game engine which empowers game designers to create and edit   mobile web narrative games conveniently. The engine was built with Ruby on Rails, ReactJS, and PostgreSQL. I was responsible for all technical aspects of this project.</p>
                        }
                        website="https://playreal.com.tw/"
                    />
                </Item>
                <Item key={4}>
                    <Project
                        title="The Victims' Game"
                        subheader="ReactJS"
                        imgSrc={imgTheVictimsGame}
                        imgAlt="The Victims' Game title screen"
                        content={
                            <>
                                <p>A mobile web detective puzzle ARG featuring an identically-titled Netflix series crossover. The game was made with ReactJS and PixiJS. I was responsible for all technical aspects of the game.</p>
                                <h4>Video:</h4>
                                <iframe className="youtube-video" src="https://www.youtube.com/embed/Z5Ly98kLj4o" allowFullScreen></iframe>
                            </>
                        }
                    />
                </Item>
                <Item key={5}>
                    <Project
                        title="Symphony"
                        subheader="ReactJS, Ruby on Rails"
                        imgSrc={imgSymphony}
                        imgAlt="Symphony PDF annotator screenshot"
                        content="A web-based collaborative PDF annotator built with Ruby on Rails, ReactJS, and PostgreSQL. I was responsible for all technical aspects of the project."
                    />
                </Item>
                <Item key={6}>
                    <Project
                        title="Markbook"
                        subheader="Ruby on Rails"
                        imgSrc={imgMarkbook}
                        imgAlt="Markbook screenshot"
                        content="A simple Facebook clone built with Ruby on Rails and PostgreSQL. I was responsible for the whole project."
                    />
                </Item>
            </Masonry>
        </Section>
    )
}

export default Portfolio