import { Box, Typography, Divider, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormularioComentarios from './FormularioComentarios';
import Comentario from './Comentario';

// Importamos Dexie y nuestra DB
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/database";

const SeccionComentarios = ({ postId }) => {
    const { usuario } = useAuth();

    // MAGIA DE DEXIE: Obtenemos solo los comentarios de este post en tiempo real
    // Usamos el índice postId que definimos en database.js
    const comentarios = useLiveQuery(
        () => db.comentarios.where({ postId: postId }).toArray(),
        [postId] // Dependencia: si cambia el post, re-ejecuta la query
    ) || [];

    // Lógica para guardar un comentario nuevo (principal o respuesta)
    // GUARDAR ASÍNCRONO
    const agregarComentario = async (texto, parentId = null) => {
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

        // Dexie generará el 'id' automáticamente
        await db.comentarios.add(nuevoComentario);
    };

    // Función para eliminar un comentario
    // ELIMINAR ASÍNCRONO (Comentario y sus respuestas)
    const eliminarComentario = async (idComentario) => {
        // En Dexie podemos eliminar el comentario padre y buscar si tiene respuestas (parentId === idComentario)
        // para eliminarlas también.
        await db.comentarios.where('id').equals(idComentario)
              .or('parentId').equals(idComentario)
              .delete();
    };

    // Función para editar un comentario
    // EDITAR ASÍNCRONO
    const editarComentario = async (idComentario, nuevoTexto) => {
        await db.comentarios.update(idComentario, {
            texto: nuevoTexto,
            editado: true
        });
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