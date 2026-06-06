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
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
`

const Link = styled.div`
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-dark-secondary);
    transition: color var(--transition-fast) var(--transition-ease);
    :hover {
        color: var(--color-text-dark-primary);
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