import React, { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from 'next/image'
import Navbar from "../components/Navbar"

const IndexPage = ({location, data}) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <Navbar location={location} />
            <main className="container-fluid main-container container-home p-0 revealator-slideup revealator-once revealator-delay1">
                <div className="color-block d-none d-lg-block"></div>
                <div className="row home-details-container align-items-center">
                    <div className="col-lg-4 bg position-fixed d-none d-lg-block"></div>
                    <div className="col-12 col-lg-8 offset-lg-4 home-details text-left text-sm-center text-lg-left">
                        <div>
                            <Image 
                                src="/images/profile.jpeg"
                                width={100}
                                height={100}
                                className="img-fluid main-img-mobile d-none d-sm-block d-lg-none" 
                            />
                            <h6 className="text-uppercase open-sans-font mb-0 d-block d-sm-none d-lg-block">Hi there!</h6>
                            <h1 className="text-uppercase poppins-font"><span>My name is </span>Loïc Chen</h1>
                            <p className="open-sans-font">I'm an indie game developer and a hobbyist graphics programmer who's passionate about crafting heart-touching gameplay experiences.</p>
                            <p className="open-sans-font">Also a core gamer and a big fan of souls-like action RPGs!</p>
                            <Link href="/about" className="btn btn-about">More about me</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default IndexPage
