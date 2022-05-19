import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import Navbar from "../components/Navbar"

import imgAnomie from "../images/anomie-island.jpg"
import imgPlayreal from "../images/playreal-portfolio_1.png"
import imgVictimsGame from "../images/victims-game.png"
import imgAtmospheric from "../images/atmospheric_2.png"
import imgSymphony from "../images/symphony.png"
import imgMarkbook from "../images/markbook.png"

const PortfolioPage = ({location, data}) => {
    useEffect(() => {
        window.scroll(0, 1)
    })

    return (
        <div className="portfolio">
            <Navbar location={location} />
            <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
                <h1>my <span>portfolio</span></h1>
                <span className="title-bg">projects</span>
            </section>

            <section className="main-content text-center revealator-slideup revealator-once revealator-delay1">
                <div id="grid-gallery" className="container grid-gallery">
                    <section className="grid-wrap">
                        <ul className="row grid">
                            <li>
                                <figure>
                                    <img src={imgAnomie} />
                                    <div><span>"Anomie Island", an exploration puzzle game on PC</span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img src={imgPlayreal} />
                                    <div><span>"PlayReal", a city exploration mobile web game engine </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img src={imgVictimsGame} />
                                    <div><span>"The Victims' Game", a mobile web city exploration game </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img src={imgAtmospheric} />
                                    <div><span>"Atmospheric 3D", my own 3D rendering engine </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img src={imgSymphony} />
                                    <div><span>"Symphony", a PDF collabaorative annotation web application </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <img src={imgMarkbook} alt="Portolio Image" />
                                    <div><span>"Markbook", my own social media website </span></div>
                                </figure>
                            </li>
                        </ul>
                    </section>
                    <section className="slideshow">
                        <ul>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>Anomie Island, An exploration puzzle game which combines PC, mobile, and real-world gameplay experiences</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Responsible for all technical aspects of the project. Developing with Unity, Firebase, ExpoSDK and Electorn.js </h6>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">TBA</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Windows, macOS, Android, iOS</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Project News: <span className="ft-wt-600 uppercase"><a href="https://www.facebook.com/ClubonTaiwan/posts/5947363315289797" target="_blank">沒有國家的人</a></span>
                                            </div>
                                        </div>
                                    </figcaption>
                                    <img src={imgAnomie} />
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>PlayReal, a web game engine for creating city exploration games</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Built all fuctionalities of the engine in early stages of the project, including dialog, dialog choices, inventory, multiple endings, save/load, and team synchronization, etc.</h6>                            
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">TBA</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Web, Mobile Web</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Website: <span className="ft-wt-600 uppercase"><a href="https://www.clubon.space/pages/playreal-intro" target="_blank">PlayReal Engine</a></span>
                                            </div>
                                        </div>
                                    </figcaption>
                                    <img src={imgPlayreal} />
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>The Victims' Game, a mobile web city exploration game featuring an identically-titled Netflix series crossover</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Responsible for all technical aspects of the project</h6>                            
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">Released</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Mobile Web</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Product: <span className="ft-wt-600 uppercase"><a href="https://www.clubon.space/products/victims-game" target="_blank">下一個被害者</a></span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Promotional Minigame: <span className="ft-wt-600 uppercase"><a href="https://victims-game.firebaseapp.com/" target="_blank">下一個被害者前導</a></span> (Free-to-play)
                                            </div>
                                        </div>
                                    </figcaption>
                                    <div className="videocontainer">
                                        <iframe className="youtube-video" src="https://www.youtube.com/embed/Z5Ly98kLj4o" allowFullScreen></iframe>
                                    </div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>Atmospheric 3D, my own cross-platform 3D rendering engine</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Responsible for the whole project. This is a project I do in my free time for learning graphics programming concepts & practices. The renderer currently supports HDR rendering, PBR materials, point shadows, directional shadows, and a handful of post-processing effects</h6>                            
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">Unreleased</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Cross-platform</span>
                                            </div>
                                        </div>
                                    </figcaption>
                                    <img src={imgAtmospheric} />
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>"Symphony", a PDF collabaorative annotation web application</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Responsible for all technical aspects of the project </h6>                            
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">Delivered</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Web</span>
                                            </div>
                                        </div>
                                    </figcaption>
                                    <img src={imgSymphony} />
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <figcaption>
                                        <h3>"Markbook", my own social media website</h3>
                                        <div className="row open-sans-font">
                                            <div className="col-12 mb-2">
                                                <h6>Responsible for the whole project. This is a project I did for practicing my web development skills</h6>                            
                                            </div>
                                            <div className="col-12 mb-2">
                                                Status: <span className="ft-wt-600 uppercase">Unreleased</span>
                                            </div>
                                            <div className="col-12 mb-2">
                                                Platforms: <span className="ft-wt-600 uppercase">Web</span>
                                            </div>
                                        </div>
                                    </figcaption>
                                    <img src={imgMarkbook} />
                                </figure>
                            </li>
                        </ul>
                        <nav>
                            <span className="icon nav-prev"><img src="/img/projects/navigation/left-arrow.png" alt="previous" /></span>
                            <span className="icon nav-next"><img src="/img/projects/navigation/right-arrow.png" alt="next" /></span>
                            <span className="nav-close"><img src="/img/projects/navigation/close-button.png" alt="close" /> </span>
                        </nav>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default PortfolioPage