import React, { useEffect } from "react"
import Layout from "../components/layout"

const ContactPage = ({location, data}) => {
    return (
        <Layout>
            <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
                <h1>get in <span>touch</span></h1>
                <span className="title-bg">contact</span>
            </section>
            <section className="main-content revealator-slideup revealator-once revealator-delay1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">Bring your game ideas into life</h3>
                            <p className="open-sans-font mb-3">Loic Chen</p>
                            <p className="open-sans-font custom-span-contact position-relative">
                                <i className="fa fa-envelope-open position-absolute"></i>
                                <span className="d-block">MAIL</span>910041@gmail.com
                            </p>

                        </div>
                        <div className="col-12 col-lg-8">
                            <form className="contactform" method="post" action="php/process-form.php">
                                <div className="contactform">
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <input type="text" name="name" placeholder="Your name" />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <input type="email" name="email" placeholder="Your email" />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <input type="text" name="subject" placeholder="Subject" />
                                        </div>
                                        <div className="col-12">
                                            <textarea name="message" placeholder=""></textarea>
                                            <button type="submit" className="btn btn-contact">Send</button>
                                        </div>
                                        <div className="col-12 form-message">
                                            <span className="output_message text-center font-weight-600 text-uppercase"></span>
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
