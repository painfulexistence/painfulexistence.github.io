import React, { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"

const NotFoundPage = ({location, data}) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <main>
                <title>Not found</title>
                <h1>Page not found</h1>
                <p>
                    <Link href="/">Go home</Link>.
                </p>
            </main>
        </>
    )
}

export default NotFoundPage
