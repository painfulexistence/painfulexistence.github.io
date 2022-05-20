import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif:300,400,500,700,900" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC:300,400,500,700,900" rel="stylesheet" />
                <link href="/css/bootstrap.min.css" rel="stylesheet" />
                <link href="/css/preloader.min.css" rel="stylesheet" />
                <link href="/css/circle.css" rel="stylesheet" />
                <link href="/css/font-awesome.min.css" rel="stylesheet" />
                <link href="/css/style.css" rel="stylesheet" />
                <link href="/css/skins/goldenrod.css" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}