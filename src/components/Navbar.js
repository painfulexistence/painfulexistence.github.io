import React, { useEffect } from "react"
import Link from "next/link"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"

const Navbar = () => {
    return (
        <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
            <Link href="/">
                <Button variant="text">Home</Button>
            </Link>
            <Link href="/portfolio/">
                <Button variant="text">Portfolio</Button>
            </Link>
            <Link href="/about/">
                <Button variant="text">CV</Button>
            </Link>
            <Link href="/contact/">
                <Button variant="text">About</Button>
            </Link>
        </Toolbar>
    )
}

export default Navbar