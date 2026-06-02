import { createTheme } from "@mui/material";

export const temaBlog = createTheme({
    palette: {
        primary: {
            main: '#808000', // Verde oliva
        },
        secondary: {
            main: '#333333', // Gris oscuro
        },
        background: {
            default: '#f4f5f7' // Fondo general un poco más gris
        }
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});