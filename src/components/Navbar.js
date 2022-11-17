import styled from "@emotion/styled"
import StraightIcon from '@mui/icons-material/Straight'
import Link from "next/link"
import Button from "@mui/material/Button"

const Container = styled.div`
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 5px 20px 5px;
`

const HashLink = styled.div`
    writing-mode: vertical-rl;
    text-orientation: mixed;
`

const NavBar = () => {
    return (
        <Container>
            <HashLink href="#work">
                Work
            </HashLink>
            <HashLink href="#about">
                About
            </HashLink>
            <HashLink href="#projects">
                Projects
            </HashLink>
            <HashLink href="/">
                <StraightIcon />
            </HashLink>
        </Container>
    )
}

export default NavBar