import { Container, Box, Typography, Avatar, Chip } from '@mui/material';

const AcercaDe = () => {
    // Array de objetos con las tecnologías y sus colores oficiales
    const tecnologias = [
        { nombre: 'React', color: '#61DAFB' },
        { nombre: 'JavaScript', color: '#F7DF1E' },
        { nombre: 'TypeScript', color: '#2D79C7' },
        { nombre: 'HTML', color: '#E34F26' },
        { nombre: 'CSS', color: '#1572B6' },
        { nombre: 'Material UI', color: '#0081CB' }
    ];

    return (
        <Container sx={{ paddingY: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: 6,
                maxWidth: '800px'
            }}>

                <Avatar
                    alt="Mi Foto"
                    src="/images/mi-foto.jpeg"
                    sx={{
                        width: { xs: 200, md: 300 },
                        height: { xs: 200, md: 300 },
                        border: '5px solid #4D4D4E',  // Color oliva del blog
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
                        mb: 3
                    }}
                />

                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontStyle: 'italic', fontWeight: 'medium', mb: 4, px: 2 }}
                >
                    "Transformando café en código y problemas en soluciones web elegantes."
                </Typography>

                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'text.secondary', mb: 2 }}
                    >
                        MI TECH STACK
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                        {/* Recorremos los objetos y usamos tech.nombre y tech.color */}
                        {tecnologias.map((tech, index) => (
                            <Chip
                                key={index}
                                label={tech.nombre}
                                variant="outlined"
                                sx={{
                                    fontWeight: 'bold',
                                    borderWidth: '2px',
                                    color: '#808000', // Estado base: texto oliva
                                    borderColor: '#808000', // Estado base: borde oliva
                                    transition: 'all 0.3s ease', // Transición suave

                                    // Comportamiento al pasar el cursor (Hover)
                                    '&:hover': {
                                        borderColor: tech.color, // Borde del color oficial
                                        color: tech.color, // Texto del color oficial
                                        backgroundColor: `${tech.color}1A`, // Fondo con el color oficial + 10% de opacidad (1A en hex)
                                        cursor: 'default'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

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
        </Container>
    );
};

export default AcercaDe;