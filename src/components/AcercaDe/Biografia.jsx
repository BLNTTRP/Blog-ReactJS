import { Box, Typography } from '@mui/material';

const Biografia = () => {
    return (
        <Box sx={{
            p: { xs: 3, md: 5 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
            textAlign: 'center',
            maxWidth: '900px',
            width: '100%',
        }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Hola, soy Joaquín!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                Desarrollador Web apasionado por crear experiencias digitales increíbles.
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 3, color: 'text.primary', lineHeight: 1.8 }}>
                Mi viaje en el mundo del desarrollo comenzó con la curiosidad de entender cómo funcionan los sitios web que uso a diario. Hoy en día, disfruto convirtiendo ideas en código, con un enfoque especial en tecnologías como <b>React</b> y herramientas modernas como <b>Material UI</b>. Me encanta resolver problemas complejos y crear interfaces de usuario atractivas, funcionales y accesibles.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.8, mb: 0 }}>
                En mi tiempo libre, me encontrarás explorando nuevas tecnologías, leyendo sobre diseño web o disfrutando de una buena taza de café. Gracias por visitar mi blog!
            </Typography>
        </Box>
    );
};

export default Biografia;