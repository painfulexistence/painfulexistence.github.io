import React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footer = (props) => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography>
                    © 2021 - {new Date().getFullYear()} <i>Loïc Chen / Forked Paths Studio</i>
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer