import { useState, useEffect } from 'react';
import { Box, Typography, Divider, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormularioComentarios from './FormularioComentarios';
import Comentario from './Comentario';

const SeccionComentarios = ({ postId }) => {
    const { usuario } = useAuth();
    const [comentarios, setComentarios] = useState([]);

    // Cargar comentarios desde localStorage correspondientes a este post
    useEffect(() => {
        const guardados = JSON.parse(localStorage.getItem('comentarios_blog')) || [];
        setComentarios(guardados.filter(c => c.postId === postId));
    }, [postId]);

    // Lógica para guardar un comentario nuevo (principal o respuesta)
    const agregarComentario = (texto, parentId = null) => {
        const nuevoComentario = {
            id: Date.now(),
            postId: postId,
            texto: texto,
            autor: usuario.nombre,     // Guardamos el nombre para mostrarlo en la UI
            emailAutor: usuario.email, // Guardamos el email como identificador único
            rol: usuario.rol,
            fecha: new Date().toLocaleString(),
            parentId: parentId,
            editado: false
        };

        const todosLosComentarios = JSON.parse(localStorage.getItem('comentarios_blog')) || [];
        const actualizados = [...todosLosComentarios, nuevoComentario];
        localStorage.setItem('comentarios_blog', JSON.stringify(actualizados));

        setComentarios(actualizados.filter(c => c.postId === postId));
    };

    // Función para eliminar un comentario
    const eliminarComentario = (idComentario) => {
        const todosLosComentarios = JSON.parse(localStorage.getItem('comentarios_blog')) || [];

        const actualizados = todosLosComentarios.filter(c => c.id !== idComentario && c.parentId !== idComentario);

        localStorage.setItem('comentarios_blog', JSON.stringify(actualizados));
        setComentarios(actualizados.filter(c => c.postId === postId));
    };

    // Función para editar un comentario
    const editarComentario = (idComentario, nuevoTexto) => {
        const todosLosComentarios = JSON.parse(localStorage.getItem('comentarios_blog')) || [];

        const actualizados = todosLosComentarios.map(c => {
            if (c.id === idComentario) {
                return {
                    ...c,
                    texto: nuevoTexto,
                    editado: true
                };
            }
            return c;
        });

        localStorage.setItem('comentarios_blog', JSON.stringify(actualizados));
        setComentarios(actualizados.filter(c => c.postId === postId));
    };

    // Filtramos para renderizar primero solo los comentarios "raíz"
    const comentariosPrincipales = comentarios.filter(c => c.parentId === null);

    return (
        <Box sx={{ mt: 6, mb: 4 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                Comentarios ({comentarios.length})
            </Typography>

            {usuario ? (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Comentando como: <strong>{usuario.nombre}</strong>
                    </Typography>
                    <FormularioComentarios
                        onEnviar={(texto) => agregarComentario(texto, null)}
                        placeholder="Añade un comentario a este post..."
                    />
                </Box>
            ) : (
                <Alert severity="info" sx={{ mb: 4 }}>
                    Debes <Link to="/login" style={{ fontWeight: 'bold', color: 'inherit' }}>iniciar sesión</Link> para dejar un comentario.
                </Alert>
            )}

            <Box>
                {comentariosPrincipales.length > 0 ? (
                    comentariosPrincipales.map(com => (
                        <Comentario
                            key={com.id}
                            comentario={com}
                            todosLosComentarios={comentarios}
                            onResponder={agregarComentario}
                            onEliminar={eliminarComentario}
                            onEditar={editarComentario}
                        />
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Aún no hay comentarios. ¡Sé el primero en opinar!
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SeccionComentarios;