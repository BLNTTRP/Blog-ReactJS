import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx'
import {
    Container, Paper, Typography, TextField, Button, Box, Alert
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

    const manejarEnvio = (e) => {
        e.preventDefault();
        const loginExitoso = iniciarSesion(credenciales);

        if (loginExitoso) {
            navigate('/panel-admin'); // Redirigimos a una ruta protegida de prueba tras el éxito
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
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;