import {useState} from "react";
import {Container, Grid, Typography, Button, Box} from "@mui/material";
import {useAuth} from "../context/AuthContext";
// Importamos los componentes hijos
import PostCard from "../components/PostCard";
import ModalFormularioPost from "../components/modals/ModalFormularioPost";
import ModalConfirmacion from "../components/modals/ModalConfirmacion";

const estadoInicialPost = {
    titulo: '',
    descripcion: '',
    img: ''
};

const ListaDePosts = ({posts, setPosts, restaurarBlog}) => {

    const {usuario} = useAuth();

    // Estados para el Modal y el formulario
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoPost, setNuevoPost] = useState(estadoInicialPost);

    // Estado adicional para saber si estamos editando (guarda el ID) o creando (null)
    const [editandoId, setEditandoId] = useState(null);

    // Estado para controlar el menú desplegable de opciones en las tarjetas
    const [postSeleccionado, setPostSeleccionado] = useState(null);

    // Estado para controlar el Dialog de confirmación de eliminación
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);

    // Estado para controlar el Dialog de restablecimiento del blog
    const [dialogoRestaurarAbierto, setDialogoRestaurarAbierto] = useState(false);

    // Manejo del Modal de Creación/Edición
    const handleAbrirModalCrear = () => {
        setEditandoId(null); // Aseguramos que es modo "Crear"
        // Limpiar el formulario al cerrar
        setNuevoPost(estadoInicialPost);
        setModalAbierto(true);
    };

    const handlePrepararEdicion = (post) => {
        setNuevoPost({titulo: post.titulo, descripcion: post.descripcion, img: post.img});
        setEditandoId(post.id);
        setModalAbierto(true);
    };

    const handleCerrarModal = () => {
        setModalAbierto(false);
        setNuevoPost(estadoInicialPost);
        setEditandoId(null);
    };

    // Unificamos Crear y Editar en una sola función lógica
    const handleGuardarPost = () => {
        if (editandoId) {
            // Lógica de ACTUALIZAR (Update)
            setPosts(posts.map(post => post.id === editandoId ? {...post, ...nuevoPost} : post));
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

    // Manejo de Eliminación
    const handlePrepararEliminacion = (post) => {
        setPostSeleccionado(post);
        setDialogoEliminarAbierto(true);
    };

    const handleConfirmarEliminar = () => {
        // Solo filtramos y modificamos el estado global
        setPosts(posts.filter(post => post.id !== postSeleccionado.id));
        setDialogoEliminarAbierto(false);
        setPostSeleccionado(null);
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
                {usuario && (
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
            {usuario && (
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
                alGuardar={handleGuardarPost}
                datosPost={nuevoPost}
                setDatosPost={setNuevoPost}
                esEdicion={Boolean(editandoId)}
            />

            <ModalConfirmacion
                abierto={dialogoEliminarAbierto}
                alCerrar={() => setDialogoEliminarAbierto(false)}
                alConfirmar={handleConfirmarEliminar}
                titulo="Confirmar eliminación"
                mensaje={`Estás seguro de que deseas eliminar permanentemente el post: "${postSeleccionado?.titulo}"? Esta acción no se puede deshacer.`}
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