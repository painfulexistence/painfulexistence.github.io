import React from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Navbar from "./Navbar"

const Header = (props) => {
    return (
        <Box component="header" sx={{pb: 3, justifyContent: 'center'}}>
            <Box sx={{px: 24}}>
                <Image src="/images/platformer_mockup.png" width={640} height={360} layout="responsive" />
            </Box>
            <Navbar />
        </Box>
    )
}

export default Header