import React, { useEffect } from "react"
import Image from "next/image"
import Layout from "../components/layout"

const PortfolioPage = ({location, data}) => {
    return (
        <Layout>
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
                                    <Image 
                                        src="/images/anomie-island.jpg"
                                        width={100}
                                        height={100}
                                    />
                                    <div><span>"Anomie Island", an exploration puzzle game on PC</span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Image 
                                        src="/images/playreal-portfolio_1.png"
                                        width={100}
                                        height={100} 
                                    />
                                    <div><span>"PlayReal", a city exploration mobile web game engine </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Image 
                                        src="/images/victims-game.png"
                                        width={100}
                                        height={100}
                                    />
                                    <div><span>"The Victims' Game", a mobile web city exploration game </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Image 
                                        src="/images/atmospheric_2.png"
                                        width={100}
                                        height={100}
                                    />
                                    <div><span>"Atmospheric 3D", my own 3D rendering engine </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Image 
                                        src="/images/symphony.png"
                                        width={100}
                                        height={100}
                                    />
                                    <div><span>"Symphony", a PDF collabaorative annotation web application </span></div>
                                </figure>
                            </li>
                            <li>
                                <figure>
                                    <Image 
                                        src="/images/markbook.png"
                                        width={100}
                                        height={100} 
                                    />
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
                                    <Image 
                                        src="/images/anomie-island.jpg"
                                        width={200}
                                        height={200}
                                    />
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
                                    <Image 
                                        src="/images/playreal-portfolio_1.png"
                                        width={200}
                                        height={200}
                                    />
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
                                    <Image 
                                        src="/images/atmospheric_2.png"
                                        width={200}
                                        height={200}
                                    />
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
                                    <Image 
                                        src="/images/symphony.png"
                                        width={200}
                                        height={200}
                                    />
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
                                    <Image 
                                        src="/images/markbook.png"
                                        width={200}
                                        height={200}
                                    />
                                </figure>
                            </li>
                        </ul>
                        <nav>
                            <span className="icon nav-prev"><Image src="/images/navigation/left-arrow.png" width={50} height={50} alt="previous" /></span>
                            <span className="icon nav-next"><Image src="/images/navigation/right-arrow.png" width={50} height={50} alt="next" /></span>
                            <span className="nav-close"><Image src="/images/navigation/close-button.png" width={50} height={50} alt="close" /> </span>
                        </nav>
                    </section>
                </div>
            </section>
        </Layout>
    )
}

export default PortfolioPage