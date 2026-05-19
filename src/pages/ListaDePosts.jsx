import { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import {
    Container, Grid, Card, CardMedia, CardContent, Typography, Button,
    CardActions, Box, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, TextField, IconButton, Menu, MenuItem, CardHeader
} from "@mui/material";
// Nuevo ícono de tres puntos
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Recibir los props desde App.jsx
const ListaDePosts = ({ posts, setPosts, restaurarBlog }) => {

    // Estados para el Modal y el formulario
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoPost, setNuevoPost] = useState({
        titulo: '',
        descripcion: '',
        img: ''
    });

    // Estado adicional para saber si estamos editando (guarda el ID) o creando (null)
    const [editandoId, setEditandoId] = useState(null);

    // Estados para controlar el menú desplegable de opciones en las tarjetas
    const [anchorEl, setAnchorEl] = useState(null);
    const [postSeleccionado, setPostSeleccionado] = useState(null);
    const menuAbierto = Boolean(anchorEl);

    // Estado para controlar el Dialog de confirmación de eliminación
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);

    // Estado para controlar el Dialog de restablecimiento del blog
    const [dialogoRestaurarAbierto, setDialogoRestaurarAbierto] = useState(false);

    // Funciones del Menú
    const handleAbrirMenu = (event, post) => {
        setAnchorEl(event.currentTarget);
        setPostSeleccionado(post);
    };

    const handleCerrarMenu = () => {
        setAnchorEl(null);
    };

    // Funciones manejadoras del modal
    const handleAbrirModal = () => {
        setEditandoId(null); // Aseguramos que es modo "Crear"
        // Limpiar el formulario al cerrar
        setNuevoPost({ titulo: '', descripcion: '', img: '' });
        setModalAbierto(true);
    };

    const handleCerrarModal = () => {
        setModalAbierto(false);
        setNuevoPost({ titulo: '', descripcion: '', img: '' });
        setEditandoId(null);
        setPostSeleccionado(null); // Limpiamos al cerrar
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoPost({
            ...nuevoPost,
            [name]: value
        });
    };

    // Unificamos Crear y Editar en una sola función lógica
    const handleGuardarPost = () => {
        if (editandoId) {
            // Lógica de ACTUALIZAR (Update)
            const postsActualizados = posts.map(post =>
                post.id === editandoId ? { ...post, ...nuevoPost } : post
            );
            setPosts(postsActualizados);
        } else {
            // Lógica de CREAR (Create)
            const postCreado = {
                id: Date.now(), // Genera un ID único simulado
                titulo: nuevoPost.titulo || "Post sin titulo",
                descripcion: nuevoPost.descripcion || "Sin descripción",
                img: nuevoPost.img || "Sin imágen"
            };
            // Agregamos el post al principio del arreglo para que aparezca
            // a la izquierda
            setPosts([postCreado, ...posts]);
        }
        handleCerrarModal();
    };

    // Funciones disparadas desde las opciones del Menú
    const handlePrepararEdicion = () => {
        setNuevoPost({
            titulo: postSeleccionado.titulo,
            descripcion: postSeleccionado.descripcion,
            img: postSeleccionado.img
        });
        setEditandoId(postSeleccionado.id); // Guardamos qué post estamos editando
        setModalAbierto(true);
        handleCerrarMenu();
    };

    // Funciones para eliminar con confirmación
    const handleAbrirConfirmacionEliminar = () => {
        setDialogoEliminarAbierto(true); // Abre la advertencia
        handleCerrarMenu() // Cierra el menú de los 3 puntos
    };

    const handleCerrarConfirmacionEliminar = () => {
        setDialogoEliminarAbierto(false);
        setPostSeleccionado(null); // Limpiamos si el usuario se arrepiente y cancela
    };

    const handleConfirmarEliminar = () => {
        // Solo filtramos y modificamos el estado global
        const postsFiltrados = posts.filter(post => post.id !== postSeleccionado.id);
        setPosts(postsFiltrados);
        setDialogoEliminarAbierto(false);
        setPostSeleccionado(null);
    };

    // Funciones para confirmar el restablecimiento
    const handleAbrirConfirmacionRestaurar = () => {
        setDialogoRestaurarAbierto(true);
    };

    const handleCerrarConfirmacionRestaurar = () => {
        setDialogoRestaurarAbierto(false);
    };

    const handleConfirmarRestaurar = () => {
        restaurarBlog(); // Ejecutando la función que viene por props
        setDialogoRestaurarAbierto(false); // Cerramos el modal
    };

    return (
        // Container centra el contenido y le da márgenes a los lados
        <Container sx={{ paddingY: 4 }}>
            {/* Contenedor Flex para alinear el título y el bótón en la misma linea */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Últimos Articulos
                </Typography>

                {/* Botón que respeta el color "primary" definido en el ThemeProvider */}
                <Button variant="contained" color="primary" onClick={handleAbrirModal}>
                    + Crear Nuevo Post
                </Button>
            </Box>

            {/* Grid container es la fila */}
            <Grid container spacing={4}>
                {posts.map((post) => (
                    // Grid item es la columna: ocupa 12 espacios en móvil (100%), 6 en tablet (50%), 4 en PC (33%)
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                            {/* CardHeader nos permite ubicar fácilmente el título y un botón de accion (opciones) */}
                            <CardHeader
                                action={
                                    <IconButton aria-label="opciones" onClick={(e) => handleAbrirMenu(e, post)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={
                                    <Typography variant="h5" component="h2" noWrap>
                                        {post.titulo}
                                    </Typography>
                                }
                            />

                            <CardMedia
                                component="img"
                                height="140"
                                image={post.img}
                                alt={post.titulo}
                            />
                            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', width: '100%' }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        whiteSpace: 'nowrap',  // Forzar al texto para que se mantenga en una sola linea
                                        overflow: 'hidden',    // Oculta cualquier cosa que intente salirse
                                        textOverflow: 'ellipsis',   // Agrega "..." si la tarjeta se encoge demasiado en celulares
                                        width: '100%'
                                    }}
                                >
                                    {/* Usamos JS para limitar a 45 caracteres y agregar los puntos suspensivos */}
                                    {post.descripcion.length > 45
                                        ? post.descripcion.substring(0, 45) + '...'
                                        : post.descripcion}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" component={Link} to={`/post/${post.id}`}>
                                    Leer más
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botón para restablecer el blog */}
            <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
                <Button variant="outlined" color="error" onClick={handleAbrirConfirmacionRestaurar}>
                    Restablecer Blog
                </Button>
            </Box>

            {/* Menú Global que se ancla al ícono de 3 puntos clickeado */}
            <Menu
                anchorEl={anchorEl}
                open={menuAbierto}
                onClose={handleCerrarMenu}
            >
                <MenuItem onClick={handlePrepararEdicion}>
                    Editar
                </MenuItem>

                {/* Click para que abra la confirmación */}
                <MenuItem onClick={handleAbrirConfirmacionEliminar} sx={{ color: 'error.main' }}>
                    Eliminar
                </MenuItem>
            </Menu>

            {/* Componente Modal (Dialog) para crear un nuevo post */}
            <Dialog open={modalAbierto} onClose={handleCerrarModal} fullWidth maxWidth="sm">
                <DialogTitle>{editandoId ? "Editar Post" : "Crear un Nuevo Post"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="titulo"
                        label="Título del Post"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={nuevoPost.titulo}
                        onChange={manejarCambio}
                        sx={{ mb: 2, mt: 1 }}
                    />
                    <TextField
                        margin="dense"
                        name="descripcion"
                        label="Descripción o Contenido"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={nuevoPost.descripcion}
                        onChange={manejarCambio}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="img"
                        label="URL de la imágen (Opcional)"
                        type="url"
                        fullWidth
                        variant="outlined"
                        value={nuevoPost.img}
                        onChange={manejarCambio}
                    />
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    {/* Botón Cancelar con el color secondary del tema */}
                    <Button onClick={handleCerrarModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleGuardarPost} variant="contained" color="primary">
                        {/* Cambiamos el texto del botón de guardado según el modo */}
                        {editandoId ? "Actualizar" : "Publicar"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmación de Eliminación */}
            <Dialog open={dialogoEliminarAbierto} onClose={handleCerrarConfirmacionEliminar}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    {/* DialogContentText es ideal para agregar el texto descriptivo de las alertas */}
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar permanentemente el post <b>"{postSeleccionado?.titulo}"</b>? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button onClick={handleCerrarConfirmacionEliminar} color="primary">
                        Cancelar
                    </Button>
                    {/* Botón rojo (error) para advertir sobre la acción destructiva */}
                    <Button onClick={handleConfirmarEliminar} variant="contained" color="error">
                        Eliminar Post
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmación de Restablecimiento */}
            <Dialog open={dialogoRestaurarAbierto} onClose={handleCerrarConfirmacionRestaurar}>
                <DialogTitle>Advertencia: Restablecer Blog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas restablecer el blog a sus valores de fábrica?
                        <b> Perderás permanentemente todos los posts que hayas creado o editado.</b> Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button onClick={handleCerrarConfirmacionRestaurar} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmarRestaurar} variant="contained" color="error">
                        Sí, Restablecer Todo
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default ListaDePosts;