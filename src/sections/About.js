import styled from "@emotion/styled"
import Image from "next/image"

const Section = styled.section`
    position: relative;
`

const About = () => {
    return (
        <Section>
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
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default About