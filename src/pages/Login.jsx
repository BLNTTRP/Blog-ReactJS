import { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx'
import {
    Container, Paper, Typography, TextField, Button, Box, Alert, Link
} from "@mui/material";

const Login = () => {
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCredenciales({
            ...credenciales,
            [name]: value
        });
    };

    // Agregamos async aquí
    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Agregamos await aquí
        const loginExitoso = await iniciarSesion(credenciales);

        if (loginExitoso) {
            navigate('/posts');
        } else {
            setError('Credenciales incorrectas. Verifica tu email o contraseña.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Iniciar Sesión
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={manejarEnvio} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={credenciales.email}
                        onChange={manejarCambio}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={credenciales.password}
                        onChange={manejarCambio}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ingresar
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            ¿No tienes una cuenta? <Link component={RouterLink} to="/registro" underline="hover">Regístrate aquí</Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;