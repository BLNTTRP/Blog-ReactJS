import { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Container, Paper, Typography, TextField, Button, Box, Alert, Link } from "@mui/material";

const Registro = () => {
    const [credenciales, setCredenciales] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    const { registrarUsuario } = useAuth();
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
        setError('');

        // Agregamos await aquí
        const resultado = await registrarUsuario(credenciales);

        if (resultado.exito) {
            setExito(true);
            // Redirigir al login tras 2 segundos para que el usuario pueda iniciar sesión
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(resultado.mensaje);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Crear Cuenta
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                {exito && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>Registro exitoso. Redirigiendo al login...</Alert>}

                <Box component="form" onSubmit={manejarEnvio} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre Completo"
                        name="nombre"
                        type="text"
                        value={credenciales.nombre}
                        onChange={manejarCambio}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={credenciales.email}
                        onChange={manejarCambio}
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
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Registrarse
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            ¿Ya tienes una cuenta? <Link component={RouterLink} to="/login" underline="hover">Inicia Sesión aquí</Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Registro;