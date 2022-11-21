import styled from "@emotion/styled"
import Image from "next/image"
import imgAtmospheric from "../assets/images/atmospheric_2.png"
import imgPlayReal from "../assets/images/playreal_2.png"
import imgTheVictimsGame from "../assets/images/victims-game.png"
import imgSymphony from "../assets/images/symphony.png"
import imgMarkbook from "../assets/images/markbook_2.png"
import imgOutOfTheAshes from "../assets/images/out-of-the-ashes.png"

const Section = styled.section`
    margin: 60px;
`

const Timeline = styled.div`
    padding: 60px 120px 60px 120px;
    border-radius: 30px;
    background: rgba(1, 1, 1, 0.1);
    backdrop-filter: saturate(60%) blur(20px);
`

const Portfolio = () => {
    return (
        <Section data-scroll-container>
            <Timeline>
                <div>
                    <h1>Out of The Ashes</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Windows, Linux</span>
                    </div>
                    <Image 
                        src={imgOutOfTheAshes}
                        width={480}
                        height={270}
                    />
                    <div className="col-12 mb-2">
                        <p>A 3D adventure RPG in a medieval setting made with Godot Engine. I was responsible for visual effects and AI programming.</p>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1>Unannounced Fishing Game</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Oculus Quest 2 or Pico</span>
                    </div>
                    <div className="col-12 mb-2">
                        <p>A VR fishing game made with Unity Engine. I was responsible for gameplay programming and custom shaders.</p>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1>PlayReal Engine</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Web, Mobile Web</span>
                    </div>
                    <div className="col-12 mb-2">
                        Website: <span className="ft-wt-600 uppercase"><a href="https://www.clubon.space/pages/playreal-intro" target="_blank">PlayReal Engine</a></span>
                    </div>
                    <Image 
                        src={imgPlayReal}
                        width={480}
                        height={360}
                    />
                    <div className="col-12 mb-2">
                        <p>A web-based narrative game engine which empowers game designers to create and edit   mobile web narrative games conveniently. The engine was built with Ruby on Rails, ReactJS, and PostgreSQL. I was responsible for all technical aspects of this project.</p>                            
                    </div>
                </div>
                <br />
                <div>
                    <h1>The Victims' Game</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Mobile Web</span>
                    </div>
                    <div className="col-12 mb-2">
                        Product: <span className="ft-wt-600 uppercase"><a href="https://www.clubon.space/products/victims-game" target="_blank">下一個被害者</a></span>
                    </div>
                    <div className="col-12 mb-2">
                        Promotional Minigame: <span className="ft-wt-600 uppercase"><a href="https://victims-game.firebaseapp.com/" target="_blank">下一個被害者前導</a></span> (Free-to-play)
                    </div>
                    <div className="videocontainer">
                        <iframe className="youtube-video" src="https://www.youtube.com/embed/Z5Ly98kLj4o" allowFullScreen></iframe>
                    </div>
                    <div className="col-12 mb-2">
                        <p>A mobile web detective puzzle ARG featuring an identically-titled Netflix series crossover. The game was made with ReactJS and PixiJS. I was responsible for all technical aspects of the game.</p>                            
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1>Atmospheric 3D</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Cross-platform</span>
                    </div>
                    <Image 
                        src={imgAtmospheric}
                        width={480}
                        height={270}
                    />
                    <div className="col-12 mb-2">
                        <p>My own cross-platform 3D game engine written in C++. The engine was built with OpenGL and Bullet Physics, featuring HDR rendering, PBR materials, point shadows, directional shadows, and a handful of post-processing effects. I was responsible for the whole project.</p>                            
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1>Symphony</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Web</span>
                    </div>
                    <Image 
                        src={imgSymphony}
                        width={480}
                        height={300}
                    />
                    <div className="col-12 mb-2">
                        <p>A web-based collaborative PDF annotator built with Ruby on Rails, ReactJS, and PostgreSQL. I was responsible for all technical aspects of the project.</p>                            
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h1>Markbook</h1>
                    <div className="col-12 mb-2">
                        Platforms: <span className="ft-wt-600 uppercase">Web</span>
                    </div>
                    <Image 
                        src={imgMarkbook}
                        width={480}
                        height={360}
                    />
                    <div className="col-12 mb-2">
                        <p>A simple Facebook clone built with Ruby on Rails and PostgreSQL. I was responsible for the whole project.</p>                            
                    </div>
                </div>
                <br />
                <br />
            </Timeline>
        </Section>
    )
}

export default Portfolio