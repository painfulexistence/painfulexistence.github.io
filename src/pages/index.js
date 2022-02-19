import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import profilePic from "../images/profile.jpeg"

const IndexPage = ({location, data}) => {
    return (
        <Layout className="home">
            <main class="container-fluid main-container container-home p-0 revealator-slideup revealator-once revealator-delay1">
                <div class="color-block d-none d-lg-block"></div>
                <div class="row home-details-container align-items-center">
                    <div class="col-lg-4 bg position-fixed d-none d-lg-block"></div>
                    <div class="col-12 col-lg-8 offset-lg-4 home-details text-left text-sm-center text-lg-left">
                        <div>
                            <img src={profilePic} class="img-fluid main-img-mobile d-none d-sm-block d-lg-none" />
                            <h6 class="text-uppercase open-sans-font mb-0 d-block d-sm-none d-lg-block">hi there !</h6>
                            <h1 class="text-uppercase poppins-font"><span>I'm </span>Loïc Chen</h1>
                            <p class="open-sans-font">An indie game developer and a hobbyist graphics programmer who's passionate about crafting heart-touching gameplay experiences.</p>
                            <p class="open-sans-font">Also a core gamer and a big fan of The Legend of Zelda and Nioh franchise!</p>
                            <Link to="/about" className="btn btn-about">More about me</Link>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default IndexPage
