import React from "react"
import Box from "@mui/material/Box"


const Header = (props) => {
    return (
        <Box component="header" sx={{pb: 3, justifyContent: 'center'}}>
            <Box sx={{px: 24}}>
                <img src="/images/platformer_mockup.png" width={640} height={360} />
            </Box>

        </Box>
    )
}

export default Header