import React from "react"
import { Link, navigate } from "gatsby"

const NotFoundPage = ({location, data}) => {
    return (
        <div className="404">
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
