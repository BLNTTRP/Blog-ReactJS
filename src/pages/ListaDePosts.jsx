import {useState, useEffect, useCallback} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {Container, Grid, Typography, Button, Box} from "@mui/material";
import {useAuth} from "../context/AuthContext";

// Importamos nuestra base de datos Dexie
import db from "../db/database";

// Importamos los componentes hijos
import PostCard from "../components/PostCard";
import ModalFormularioPost from "../components/modals/ModalFormularioPost";
import ModalConfirmacion from "../components/modals/ModalConfirmacion";

const estadoInicialPost = {
    titulo: '',
    descripcion: '',
    img: ''
};

const ListaDePosts = ({posts, restaurarBlog}) => {

    const {usuario} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // Deducir el estado de los modales en base a la URL actual
    const esCrear = location.pathname === '/crear-post';
    const esEditar = location.pathname.startsWith('/editar-post/');
    const modalAbierto = esCrear || esEditar;
    const editandoId = esEditar ? Number(id) : null;

    // Estado local solo para los datos del formulario que el usuario tipeará
    const [nuevoPost, setNuevoPost] = useState(estadoInicialPost);

    // Estado para controlar el menú desplegable de opciones en las tarjetas
    const [postSeleccionado, setPostSeleccionado] = useState(null);

    // Estado para controlar el Dialog de confirmación de eliminación
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);

    // Estado para controlar el Dialog de restablecimiento del blog
    const [dialogoRestaurarAbierto, setDialogoRestaurarAbierto] = useState(false);

    // Efecto para cargar los datos en el form si estamos en modo Edición
    useEffect(() => {
        if (esEditar && editandoId) {
            const postAEditar = posts.find(p => p.id === editandoId);
            if (postAEditar) {
                setNuevoPost({ titulo: postAEditar.titulo, descripcion: postAEditar.descripcion, img: postAEditar.img });
            }
            // Eliminamos la redirección forzada aquí para evitar bugs de renderizado rápido
        } else if (esCrear) {
            setNuevoPost(estadoInicialPost);
        }
    }, [esEditar, esCrear, editandoId, posts]);

    // Manejo del Modal de Creación/Edición
    const handleAbrirModalCrear = () => navigate('/crear-post');

    // Envuelve las funciones que se pasan como props a PostCard con useCallback
    const handlePrepararEdicion = useCallback((post) => {
        navigate(`/editar-post/${post.id}`);
    }, [navigate]); // navigate es una dependencia externa

    // Al cancelar o terminar la acción, simplemente "volvemos" a /posts
    const handleCerrarModal = () => navigate('/posts');

    // LÓGICA DE GUARDADO ASÍNCRONA CON DEXIE
    const handleGuardarPost = async () => {
        if (editandoId) {
            // ACTUALIZAR (Update)
            await db.posts.update(editandoId, nuevoPost);
        } else {
            // CREAR (Create) - Dexie genera el ID automáticamente por el "++id" del esquema
            await db.posts.add({
                titulo: nuevoPost.titulo || "Post sin titulo",
                descripcion: nuevoPost.descripcion || "Sin descripción",
                img: nuevoPost.img || "Sin imágen"
            });
        }
        navigate('/posts');
    };

    const handlePrepararEliminacion = useCallback((post) => {
        setPostSeleccionado(post);
        setDialogoEliminarAbierto(true);
    }, []); // No tiene dependencias que cambien, el array queda vacío

    // LÓGICA DE ELIMINACIÓN ASÍNCRONA CON DEXIE
    const handleConfirmarEliminar = async () => {
        if (postSeleccionado) {
            await db.posts.delete(postSeleccionado.id);
            setDialogoEliminarAbierto(false);
            setPostSeleccionado(null);
        }
    };

    // Manejo de Restauración
    const handleConfirmarRestaurar = () => {
        restaurarBlog(); // Ejecutando la función que viene por props
        setDialogoRestaurarAbierto(false); // Cerramos el modal
    };

    return (
        // Container centra el contenido y le da márgenes a los lados
        <Container sx={{paddingY: 4}}>
            {/* Contenedor Flex para alinear el título y el bótón en la misma linea */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Últimos Articulos
                </Typography>

                {/* Botón que respeta el color "primary" definido en el ThemeProvider */}
                {usuario?.rol === 'admin' && (
                    <Button variant="contained" color="primary" onClick={handleAbrirModalCrear}>
                        + Crear Nuevo Post
                    </Button>
                )}
            </Box>

            {/* Grid container es la fila */}
            <Grid container spacing={4}>
                {posts.map((post) => (
                    // Grid item es la columna: ocupa 12 espacios en móvil (100%), 6 en tablet (50%), 4 en PC (33%)
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        {/* Renderizamos el PostCard y le pasamos las funciones */}
                        <PostCard
                            post={post}
                            onEdit={handlePrepararEdicion}
                            onDelete={handlePrepararEliminacion}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Botón para restablecer el blog */}
            {usuario?.rol === 'admin' && (
                <Box sx={{mt: 6, mb: 2, textAlign: 'center'}}>
                    <Button variant="outlined" color="error" onClick={() => setDialogoRestaurarAbierto(true)}>
                        Restablecer Blog
                    </Button>
                </Box>
            )}

            {/* Invocación de Modales Componentizados */}
            <ModalFormularioPost
                abierto={modalAbierto}
                alCerrar={handleCerrarModal}
                alGuardar={handleGuardarPost} // Pasamos la función asíncrona
                datosPost={nuevoPost}
                setDatosPost={setNuevoPost}
                esEdicion={esEditar}
            />

            <ModalConfirmacion
                abierto={dialogoEliminarAbierto}
                alCerrar={() => setDialogoEliminarAbierto(false)}
                alConfirmar={handleConfirmarEliminar} // Pasamos la función asíncrona
                titulo="Confirmar eliminación"
                mensaje={`¿Estás seguro de que deseas eliminar permanentemente el post: "${postSeleccionado?.titulo}"? Esta acción no se puede deshacer.`}
                textoBotonConfirmar="Eliminar Post"
            />

            <ModalConfirmacion
                abierto={dialogoRestaurarAbierto}
                alCerrar={() => setDialogoRestaurarAbierto(false)}
                alConfirmar={handleConfirmarRestaurar}
                titulo="Advertencia: Restablecer Blog"
                mensaje={`Estás seguro de que deseas restablecer el blog a sus valores de fábrica? Perderás permanentemente todos los posts que hayas creado o editado. Esta acción no se puede deshacer.`}
                textoBotonConfirmar="Si, Restablecer Todo"
            />
        </Container>
    );
};

export default ListaDePosts;