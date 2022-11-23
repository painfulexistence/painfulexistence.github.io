import React from "react"
import * as ReactDOM from "react-dom/client"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "./styles/circle.css"
import "./styles/style.css"
import "./styles/skins/magenta.css"
import "./styles/global.css"
import App from "./App"

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

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />      
        <App />
    </ThemeProvider>
)