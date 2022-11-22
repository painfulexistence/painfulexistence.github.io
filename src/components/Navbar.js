import styled from "@emotion/styled"
import StraightIcon from '@mui/icons-material/Straight'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
`

const Link = styled.div`
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-weight: bolder;
    color: #BBBBBB;
    :hover {
        color: #FFFFFF;
    }
    cursor: pointer;
`

const NavBar = (props) => {
    return (
        <Container>
            <Link onClick={() => props.onNavigate("Home")}>
                <StraightIcon />
            </Link>
            <Link onClick={() => props.onNavigate("Portfolio")}>
                Projects
            </Link>
            <Link onClick={() => props.onNavigate("Experiences")}>
                Experiences
            </Link>
            <Link onClick={() => props.onNavigate("About")}>
                About
            </Link>
        </Container>
    )
}

export default NavBar