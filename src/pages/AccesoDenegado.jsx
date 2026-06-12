import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityUpdateWarningIcon from '@mui/icons-material/SecurityUpdateWarning';

const AccesoDenegado = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
                <Box sx={{ color: 'error.main', mb: 2 }}>
                    <SecurityUpdateWarningIcon sx={{ fontSize: 80 }} />
                </Box>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Acceso Denegado
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                    Lo sentimos, no tienes los permisos de administrador necesarios para acceder a esta funcionalidad.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                    size="large"
                >
                    Volver al Inicio
                </Button>
            </Paper>
        </Container>
    );
};

export default AccesoDenegado;