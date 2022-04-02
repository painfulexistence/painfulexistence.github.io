import React from "react"
import { Link } from "gatsby"
import Navbar from "../components/Navbar"

const NotFoundPage = ({location, data}) => {
    return (
        <div className="text-white bg-neutral-800 404">
            <Navbar />
            <main>
                <title>Not found</title>
                <h1>Page not found</h1>
                <p>
                    <Link to="/">Go home</Link>.
                </p>
            </main>
        </div>
    )
}

export default NotFoundPage
