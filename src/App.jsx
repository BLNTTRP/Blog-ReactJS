import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {ThemeProvider, CssBaseline} from "@mui/material";

// Importamos las configuraciones externas
import {temaBlog} from "./theme/theme";
import {postsDeFabrica} from "./data/postsIniciales";

// Importar los componentes de autenticación
import {AuthProvider} from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";

// Importamos Layouts y Páginas
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import ListaDePosts from "./pages/ListaDePosts";
import DetalleDePost from "./pages/DetalleDePost";
import AcercaDe from "./pages/AcercaDe";


const App = () => {
    // Inicialización "perezosa" (lazy initialization) del estado
    const [posts, setPosts] = useState(() => {
        const postsGuardados = localStorage.getItem('blog_posts');
        if (postsGuardados) {
            return JSON.parse(postsGuardados);
        }
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
        // Envolvemos todo con el Proveedor de Autenticación
        <AuthProvider>
            <ThemeProvider theme={temaBlog}>
                {/* CssBaseline aplica un reseteo de márgenes y aplica el color de fondo del tema */}
                <CssBaseline/>

                <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                    {/* El Header es constante en toda la App */}
                    <Header/>

                    <main style={{flexGrow: 1}}>
                        <Routes>
                            <Route path="/" element={<Inicio/>}/>
                            {/* Pasamos 'posts', 'setPosts' y 'restaurarBlog' como props */}
                            <Route path="/posts" element={<ListaDePosts posts={posts} setPosts={setPosts}
                                                                        restaurarBlog={restaurarBlog}/>}/>
                            {/* Ruta dinámica para leer un post especifico */}
                            {/* Pasamos 'posts' para que el detalle pueda encontrar el adecuado */}
                            <Route path="/post/:id" element={<DetalleDePost posts={posts}/>}/>
                            <Route path="/acerca-de" element={<AcercaDe/>}/>
                            <Route path="/login" element={<Login/>}/>

                            {/* Ruta protegida de prueba */}
                            <Route
                                path="/panel-admin"
                                element={
                                    <RutaProtegida>
                                        <div style={{textAlign: 'center', padding: '50px'}}>
                                            <h2>Panel de Administración</h2>
                                            <p>Si estás viendo esto es porque lograste iniciar sesión exitosamente!</p>
                                        </div>
                                    </RutaProtegida>
                                }
                            />

                            <Route path="*" element={<h2>Error 404 - Página no encontrada</h2>}/>
                        </Routes>
                    </main>

                    {/* El Footer también es constante */}
                    <Footer/>

                </div>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
