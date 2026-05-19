import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
// Importamos los Layouts
import Header from "./components/Header";
import Footer from "./components/Footer";
// Importamos las Páginas
import Inicio from "./pages/Inicio";
import ListaDePosts from "./pages/ListaDePosts";
import DetalleDePost from "./pages/DetalleDePost";
import AcercaDe from "./pages/AcercaDe";

// Creamos nuestro tema personalizado
const temaBlog = createTheme({
    palette: {
        primary: {
            main: '#808000', // Verde oliva
        },
        secondary: {
            main: '#333333', // Gris oscuro
        },
        background: {
            default: '#f4f5f7' // Fondo general un poco más gris
        }
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

// Extraemos los posts por defecto (estado de fábrica) a una constante
const postsDeFabrica = [
        { id: 1, titulo: "Aprende React", descripcion: "Guia paso a paso...",
        img: "https://picsum.photos/400/200?random=1" },
        { id: 2, titulo: "Hooks a fondo", descripcion: "Entendiendo useEffect...",
        img: "https://picsum.photos/400/200?random=2"},
        { id: 3, titulo: "Material UI", descripcion: "Estilos rápidos...",
        img: "https://picsum.photos/400/200?random=3"},
    ]

const App = () => {
    // Inicialización "perezosa" (lazy initialization) del estado
    const [posts, setPosts] = useState(() => {
        const postsGuardados = localStorage.getItem('blog_posts');
        // Si hay datos en localStorage, los parseamos y los usamos
        if (postsGuardados) {
            return JSON.parse(postsGuardados);
        }
        // Si no hay datos, usamos los posts de fabrica
        return postsDeFabrica;
    });

    // Cada vez que el estado 'posts' cambie, lo guardamos en localStorage
    useEffect(() => {
        localStorage.setItem('blog_posts', JSON.stringify(posts));
    }, [posts]);

    // Función para devolver el blog a su estado inicial
    const restaurarBlog = () => {
        setPosts(postsDeFabrica);
    };

    return (
        // Envolvemos toda la aplicación en el ThemeProvider
        <ThemeProvider theme={temaBlog}>
            {/* CssBaseline aplica un reseteo de márgenes y aplica el color de fondo del tema */}
            <CssBaseline />

            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                {/* El Header es constante en toda la App */}
                <Header />

                <main style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        {/* Pasamos 'posts', 'setPosts' y 'restaurarBlog' como props */}
                        <Route path="/posts" element={<ListaDePosts posts={posts} setPosts={setPosts} restaurarBlog={restaurarBlog} />} />
                        {/* Ruta dinámica para leer un post especifico */}
                        {/* Pasamos 'posts' para que el detalle pueda encontrar el adecuado */}
                        <Route path="/post/:id" element={<DetalleDePost posts={posts} />} />
                        <Route path="/acerca-de" element={<AcercaDe />} />
                        <Route path="*" element={<h2>Error 404 - Página no encontrada</h2>} />
                    </Routes>
                </main>

                {/* El Footer también es constante */}
                <Footer />

            </div>
        </ThemeProvider>
    );
};

export default App;
