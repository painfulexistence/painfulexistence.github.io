import styled from "@emotion/styled"
import Image from "next/image"
import NavBar from "../components/Navbar"
import Three from "../components/Three"

const Section = styled.section`
    position: relative;
    height: 100vh;
`

const Home = () => {
    return (
        <Section data-scroll-container>
            <Three />
        </Section>
    )
}

export default Home