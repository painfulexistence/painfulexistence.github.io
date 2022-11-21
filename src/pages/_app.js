import Head from "next/head"
import Script from "next/script"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import "../styles/circle.css"
import "../styles/style.css"
import "../styles/skins/magenta.css"
import "../styles/global.css"

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffeb3b'
        },
        secondary: {
            main: '#ffc400'
        }
    }
})

export default function App({ Component, pageProps }) {
    const containerRef = useRef(null)
    
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-BHMWKPM7NH"
                />
                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            gtag('js', new Date());
                        
                            gtag('config', 'G-BHMWKPM7NH');
                        `,
                    }}
                />
            </ThemeProvider>
        </>
    )
}