import { Box, Typography, Container, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        // Usamos Box con component="footer" para mantener la semántica HTML5
        <Box
            component="footer"
            sx={{
                py: 3,          // Padding vertical
                px: 2,          // Padding horizontal
                mt: 'auto',     // Empuja el footer al fondo si hay poco contenido
                backgroundColor: 'secondary.main',  // Accede al color secundario del tema
                color: 'white',     // Texto en blanco para contraste
                textAlign: 'center'
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="inherit">
                    &copy; {new Date().getFullYear()} Mi Blog React. Todos los derechos reservados.
                </Typography>

                {/* Ejemplo de cómo el color 'inherit' funciona en sub-elementos */}
                <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
                    Desarrollado con ❤️ en React JS
                </Typography>

                {/* Nuevo Box para contener los iconos de redes sociales */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>

                    {/* Botón para LinkedIn */}
                    <IconButton
                        color="inherit"
                        component="a"   // Le indicamos a MUI que este botón actúe como una etiqueta <a>
                        href="https://www.linkedin.com/in/joaquín-emilio-cosentino-gonzález-a7a30b238"  // Cada uno con su enlace personal
                        target="_blank"  // Esto hace que el enlace se abra en una nueva pestaña
                        rel="noopener noreferrer" // Medida de seguridad recomendada al usar target="_blank"
                        aria-label="Perfil de LinkedIn"     // Mejora la accesibilidad (lectores de pantalla)
                    >
                        <LinkedInIcon />
                    </IconButton>

                    {/* Botón para GitHub */}
                    <IconButton
                        color="inherit"
                        component="a"
                        href="https://github.com/BLNTTRP"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de GitHub"
                    >
                        <GitHubIcon />
                    </IconButton>

                </Box>
            </Container>
        </Box>
    );
};

export default Footer;