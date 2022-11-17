import styled from "@emotion/styled"

const Container = styled.div`
`

export default function Layout({ children }) {
    return (
        <Container>
            {children}
        </Container>
    )
}