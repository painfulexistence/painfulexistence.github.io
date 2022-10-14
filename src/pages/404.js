import React, { useEffect } from "react"
import Link from "next/link"
import Layout from "../components/layout"

const NotFoundPage = ({location, data}) => {
    return (
        <Layout>
            <main>
                <title>Not found</title>
                <h1>Page not found</h1>
                <p>
                    <Link href="/">Go home</Link>.
                </p>
            </main>
        </Layout>
    )
}

export default NotFoundPage
