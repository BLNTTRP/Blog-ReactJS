import { Box, Typography, Avatar, Chip } from '@mui/material';

const tecnologias = [
    { nombre: 'React', color: '#61DAFB' },
    { nombre: 'JavaScript', color: '#F7DF1E' },
    { nombre: 'TypeScript', color: '#2D79C7' },
    { nombre: 'HTML', color: '#E34F26' },
    { nombre: 'CSS', color: '#1572B6' },
    { nombre: 'Material UI', color: '#0081CB' }
];

const TechStack = () => {
    return (
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
                    border: '5px solid #4D4D4E',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
                    mb: 3
                }}
            />

            <Typography variant="h6" color="primary" sx={{ fontStyle: 'italic', fontWeight: 'medium', mb: 4, px: 2 }}>
                "Transformando café en código y problemas en soluciones web elegantes."
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Typography variant="overline" display="block" gutterBottom sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'text.secondary', mb: 2 }}>
                    MI TECH STACK
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                    {tecnologias.map((tech, index) => (
                        <Chip
                            key={index}
                            label={tech.nombre}
                            variant="outlined"
                            sx={{
                                fontWeight: 'bold',
                                borderWidth: '2px',
                                color: '#808000',
                                borderColor: '#808000',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: tech.color,
                                    color: tech.color,
                                    backgroundColor: `${tech.color}1A`,
                                    cursor: 'default'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TechStack;