import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import profilePic from "../images/profile.jpeg"

const ContactPage = ({location, data}) => {
    return (
        <Layout className="home">
            <section class="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
                <h1>get in <span>touch</span></h1>
                <span class="title-bg">contact</span>
            </section>
            <section class="main-content revealator-slideup revealator-once revealator-delay1">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-4">
                            <h3 class="text-uppercase custom-title mb-0 ft-wt-600 pb-3">Bring your game ideas into life</h3>
                            <p class="open-sans-font mb-3">Loic Chen</p>
                            <p class="open-sans-font custom-span-contact position-relative">
                                <i class="fa fa-phone position-absolute"></i>
                                <span class="d-block">PHONE</span>+886 966 733 316
                            </p>
                            <p class="open-sans-font custom-span-contact position-relative">
                                <i class="fa fa-envelope-open position-absolute"></i>
                                <span class="d-block">MAIL</span>910041@gmail.com
                            </p>
                            <ul class="social list-unstyled pt-1 mb-5">
                                <li class="twitter"><a title="Twitter" href="https://twitter.com/Painfulexisten1"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li class="facebook"><a title="Facebook" href="https://www.facebook.com/everydayfrustratedbymyself"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li class="linkedin"><a title="Linkedin" href="https://www.linkedin.com/in/ming-you-chen/"><i class="fa fa-linkedin"></i></a>
                                </li>
                                <li class="gitlab"><a title="Gitlab" href="https://gitlab.com/painfulexistence"><i class="fa fa-gitlab"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 col-lg-8">
                            <form class="contactform" method="post" action="php/process-form.php">
                                <div class="contactform">
                                    <div class="row">
                                        <div class="col-12 col-md-4">
                                            <input type="text" name="name" placeholder="Your name" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <input type="email" name="email" placeholder="Your email" />
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <input type="text" name="subject" placeholder="Subject" />
                                        </div>
                                        <div class="col-12">
                                            <textarea name="message" placeholder=""></textarea>
                                            <button type="submit" class="btn btn-contact">Send</button>
                                        </div>
                                        <div class="col-12 form-message">
                                            <span class="output_message text-center font-weight-600 text-uppercase"></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ContactPage
