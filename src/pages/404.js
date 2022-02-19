import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const NotFoundPage = ({location, data}) => {
    return (
        <Layout>
            <main>
                <title>Not found</title>
                <h1>Page not found</h1>
                <p>
                    <Link to="/">Go home</Link>.
                </p>
            </main>
        </Layout>
    )
}

export default NotFoundPage
