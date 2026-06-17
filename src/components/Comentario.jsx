import { useState } from "react";
import { Box, Typography, Avatar, Chip, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import FormularioComentarios from "./FormularioComentarios.jsx";

const Comentario = ({ comentario, todosLosComentarios, onResponder, onEliminar, onEditar }) => {
    const { usuario } = useAuth();
    const [mostrandoCajaRespuesta, setMostrandoCajaRespuesta] = useState(false);

    // Estados para el modo edición
    const [modoEdicion, setModoEdicion] = useState(false);
    const [textoEditado, setTextoEditado] = useState(comentario.texto);

    // Buscamos todas las respuestas que apunten al ID de este comentario
    const respuestas = todosLosComentarios.filter(c => c.parentId === comentario.id);

    // ==== LÓGICA DE PERMISOS
    const esPropietario = usuario && (
        // 1. Coincidencia ideal: Verificamos contra el email del autor que guardamos ahora
        (comentario.emailAutor && comentario.emailAutor === usuario.email) ||
        // 2. Coincidencia legacy: Verificamos contra el nombre (por si hay comentarios viejos)
        (comentario.autor && comentario.autor.toLowerCase() === usuario.nombre.toLowerCase()) ||
        // 3. Fallback del bug anterior: Si en el bug guardaste el email como autor, esto lo reconoce y te deja editar/borrar
        (comentario.autor && comentario.autor.toLowerCase() === usuario.email.toLowerCase())
    );

    const esAdmin = usuario && usuario.rol === 'admin';

    const puedeEditar = esPropietario;
    const puedeEliminar = esPropietario || esAdmin;
    // ====

    const handleEnviarRespuesta = (texto) => {
        onResponder(texto, comentario.id);
        setMostrandoCajaRespuesta(false);
    };

    const handleGuardarEdicion = () => {
        if (textoEditado.trim().length > 0 && textoEditado !== comentario.texto) {
            onEditar(comentario.id, textoEditado);
        }
        setModoEdicion(false);
    };

    const handleCancelarEdicion = () => {
        setTextoEditado(comentario.texto);
        setModoEdicion(false);
    };

    // Para evitar que la UI se rompa si guardaste un email largo como autor durante las pruebas
    const inicialAvatar = comentario.autor ? comentario.autor.charAt(0).toUpperCase() : 'U';

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#ffffff' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: comentario.rol === 'admin' ? 'primary.main' : 'secondary.main' }}>
                        {inicialAvatar}
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {comentario.autor}
                    </Typography>

                    {comentario.rol === 'admin' && (
                        <Chip label="Admin" color="primary" size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 'bold' }} />
                    )}

                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {comentario.fecha}
                        {comentario.editado && <span style={{ fontStyle: 'italic', marginLeft: '5px' }}>(editado)</span>}
                    </Typography>
                </Box>

                {modoEdicion ? (
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            size="small"
                            value={textoEditado}
                            onChange={(e) => setTextoEditado(e.target.value)}
                            autoFocus
                        />
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button size="small" variant="contained" onClick={handleGuardarEdicion} color="primary">
                                Guardar
                            </Button>
                            <Button size="small" onClick={handleCancelarEdicion} color="secondary">
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ mb: 1.5, mt: 1, whiteSpace: 'pre-wrap' }}>
                        {comentario.texto}
                    </Typography>
                )}

                <Box sx={{display: 'flex', gap: 2}}>
                    {usuario && !modoEdicion && (
                        <Button
                            size="small"
                            onClick={() => setMostrandoCajaRespuesta(!mostrandoCajaRespuesta)}
                            sx={{
                                textTransform: 'none',
                                minWidth: 'auto',
                                p: 0,
                                '&:hover': {bgcolor: 'transparent', textDecoration: 'underline'}
                            }}
                        >
                            {mostrandoCajaRespuesta ? 'Cancelar Respuesta' : 'Responder'}
                        </Button>
                    )}

                    {puedeEditar && !modoEdicion && (
                        <Button
                            size="small"
                            onClick={() => setModoEdicion(true)}
                            sx={{
                                textTransform: 'none',
                                minWidth: 'auto',
                                p: 0,
                                color: 'text.secondary',
                                '&:hover': {bgcolor: 'transparent', textDecoration: 'underline'}
                            }}
                        >
                            Editar
                        </Button>
                    )}

                    {puedeEliminar && !modoEdicion && (
                        <Button
                            size="small"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
                                    onEliminar(comentario.id);
                                }
                            }}
                            sx={{
                                textTransform: 'none',
                                minWidth: 'auto',
                                p: 0,
                                color: 'error.main',
                                '&:hover': {bgcolor: 'transparent', textDecoration: 'underline'}
                            }}
                        >
                            Eliminar
                        </Button>
                    )}
                </Box>
            </Box>

            {mostrandoCajaRespuesta && (
                <Box sx={{ mt: 1, ml: { xs: 2, sm: 4 } }}>
                    <FormularioComentarios
                        onEnviar={handleEnviarRespuesta}
                        placeholder={`Respondiendo a ${comentario.autor}...`}
                        autoFocus
                    />
                </Box>
            )}

            {respuestas.length > 0 && (
                <Box sx={{ mt: 2, ml: { xs: 2, sm: 4 }, pl: { xs: 1, sm: 2 }, borderLeft: '2px solid #e0e0e0' }}>
                    {respuestas.map(resp => (
                        <Comentario
                            key={resp.id}
                            comentario={resp}
                            todosLosComentarios={todosLosComentarios}
                            onResponder={onResponder}
                            onEliminar={onEliminar}
                            onEditar={onEditar}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Comentario;