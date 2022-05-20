import React, { useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Navbar from "../components/Navbar"

const AboutPage = ({location, data}) => {    
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <Navbar location={location} />
            <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
                <h1>ABOUT <span>ME</span></h1>
                <span className="title-bg">Resume</span>
            </section>
            
            <section className="main-content revealator-slideup revealator-once revealator-delay1">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-12 col-lg-5 col-xl-6">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="text-uppercase custom-title mb-0 ft-wt-600">personal infos</h3>
                                </div>
                                <div className="col-12 d-block d-sm-none">
                                    <Image 
                                        src="/images/profile.jpeg"
                                        width={100}
                                        height={100}
                                        className="img-fluid main-img-mobile" 
                                    />
                                </div>
                                <div className="col-6">
                                    <ul className="about-list list-unstyled open-sans-font">
                                        <li> <span className="title">Name :</span> <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">Loic Chen</span> </li>
                                        <li> <span className="title">Age :</span> <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">25</span> </li>
                                        <li> <span className="title">Location :</span> <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">Taipei, Taiwan</span> </li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="about-list list-unstyled open-sans-font">
                                        <li> <span className="title">Email :</span> <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">910041@gmail.com</span> </li>
                                        <li> <span className="title">Languages :</span> <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">Mandarin, English</span> </li>
                                    </ul>
                                </div>
                                <div className="col-12 mt-3">
                                    <a href="https://www.cakeresume.com/loic-chen" className="btn btn-download">Resume</a>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="col-12 col-lg-7 col-xl-6 mt-5 mt-lg-0">
                            <div className="row">
                                <div className="col-6">
                                    <div className="box-stats with-margin">
                                        <h3 className="poppins-font position-relative">3</h3>
                                        <p className="open-sans-font m-0 position-relative text-uppercase">years of <span className="d-block">industry experience</span></p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="box-stats with-margin">
                                        <h3 className="poppins-font position-relative">2</h3>
                                        <p className="open-sans-font m-0 position-relative text-uppercase">delivered <span className="d-block">web applications</span></p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="box-stats with-margin">
                                        <h3 className="poppins-font position-relative">1</h3>
                                        <p className="open-sans-font m-0 position-relative text-uppercase">released <span className="d-block">commercial game</span></p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="box-stats with-margin">
                                        <h3 className="poppins-font position-relative">1</h3>
                                        <p className="open-sans-font m-0 position-relative text-uppercase">in-development <span className="d-block"> title</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <hr className="separator" />
                    
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-uppercase pb-5 mb-0 text-left text-sm-center custom-title ft-wt-600">Work Experiences </h3>
                        </div>
                        <div className="col-lg-6 m-15px-tb">
                            <div className="resume-box">
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-briefcase"></i>
                                        </div>
                                        <span className="time open-sans-font text-uppercase">2019/12 - 2021/03</span>
                                        <h5 className="poppins-font text-uppercase">Unity Developer & Full-stack Web Developer <span className="place open-sans-font">Clubon</span></h5>
                                        <p className="open-sans-font"></p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-briefcase"></i>
                                        </div>
                                        <span className="time open-sans-font text-uppercase">2018/05 - 2019/11</span>
                                        <h5 className="poppins-font text-uppercase">Full-stack Web Developer <span className="place open-sans-font">Digital Learning Center, National Taiwan University</span></h5>
                                        <p className="open-sans-font"></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-uppercase pb-4 pb-sm-5 mb-3 mb-sm-0 text-left text-sm-center custom-title ft-wt-600">Languages <span>&</span> Skills</h3>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p65">
                                <span>65%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Ruby</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p70">
                                <span>70%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">C++</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p75">
                                <span>75%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Javascript</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p60">
                                <span>60%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">C#</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p75">
                                <span>75%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Gameplay Programming</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p60">
                                <span>60%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Engine Programming</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p70">
                                <span>70%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Web Frontend</h6>
                        </div>
                        <div className="col-6 col-md-3 mb-3 mb-sm-5">
                            <div className="c100 p60">
                                <span>60%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">Web Backend</h6>
                        </div>
                    </div>
                    
                    <hr className="separator mt-1" />
                    
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-uppercase pb-5 mb-0 text-left text-sm-center custom-title ft-wt-600">Education</h3>
                        </div>
                        <div className="col-lg-6 m-15px-tb">
                            <div className="resume-box">
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-university"></i>
                                        </div>
                                        <h5 className="poppins-font text-uppercase">Electrical Engineering <span className="place open-sans-font">National Taiwan University</span></h5>
                                        <p className="open-sans-font"></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutPage
