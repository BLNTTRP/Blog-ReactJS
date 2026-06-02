import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const FormularioSugerencias = () => {
    // Estados para los campos del formulario
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        correo: '',
        descripcion: ''
    });

    // Estado para mostrar un mensaje de éxito al enviar
    const [mensajeExito, setMensajeExito] = useState(false);

    // Manejador genérico de cambios en los inputs
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    // Función que se ejecuta al enviar el formulario
    const manejarEnvio = (e) => {
        e.preventDefault();

        // Obtener sugerencias anteriores del localStorage (si existen) o inicializar un array vacío
        const sugerenciasGuardadas = JSON.parse(localStorage.getItem('sugerencias_blog')) || [];

        // Crear el nuevo objeto de sugerencia con un ID único y la fecha actual
        const nuevaSugerencia = {
            id: Date.now(),
            fecha: new Date().toLocaleDateString(),
            ...datosFormulario
        };

        // Agregar la nueva sugerencia al array y guardarlo en localStorage
        const nuevasSugerencias = [...sugerenciasGuardadas, nuevaSugerencia];
        localStorage.setItem('sugerencias_blog', JSON.stringify(nuevasSugerencias));

        // Limpiar el formulario y mostrar el mensaje de éxito
        setDatosFormulario({ nombre: '', correo: '', descripcion: '' });
        setMensajeExito(true);

        // Ocultar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
            setMensajeExito(false);
        }, 3000);
    };

    return (
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mt: 6, width: '100%', maxWidth: '900px', mx: 'auto', borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Tienes alguna sugerencia u opinión?
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Me encantaría leer tus ideas de nuevas funcionalidades o comentarios sobre el blog.
            </Typography>

            <Box component="form" onSubmit={manejarEnvio} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    label="Nombre completo"
                    name="nombre"
                    variant="outlined"
                    value={datosFormulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                <TextField
                    label="Coreo electrónico"
                    name="correo"
                    type="email"
                    variant="outlined"
                    value={datosFormulario.correo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                <TextField
                    label="Descripción (Sugerencia, opinión, etc.)"
                    name="descripcion"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={datosFormulario.descripcion}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
                >
                    Enviar Mensaje
                </Button>

                {/* Muestra una alerta de éxito cuando se envía correctamente */}
                {mensajeExito && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Gracias! Tu mensaje ha sido guardado correctamente.
                    </Alert>
                )}
            </Box>
        </Paper>
    );
};

export default FormularioSugerencias;