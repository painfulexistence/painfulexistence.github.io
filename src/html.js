import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif:300,400,500,700,900" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC:300,400,500,700,900" rel="stylesheet" />
                <link href="/css/bootstrap.min.css" rel="stylesheet" />
                <link href="/css/preloader.min.css" rel="stylesheet" />
                <link href="/css/circle.css" rel="stylesheet" />
                <link href="/css/font-awesome.min.css" rel="stylesheet" />
                <link href="/css/fm.revealator.jquery.min.css" rel="stylesheet" />
                <link href="/css/style.css" rel="stylesheet" />
                <link href="/css/skins/goldenrod.css" rel="stylesheet" />

                { props.headComponents }
            </head>
            <body {...props.bodyAttributes}>
                { props.preBodyComponents }
                <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                <script src="/js/custom.js"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-BHMWKPM7NH"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            gtag('js', new Date());
                        
                            gtag('config', 'G-BHMWKPM7NH');
                        `,
                    }}
                />
                { props.postBodyComponents }
            </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
