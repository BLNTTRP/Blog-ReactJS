import {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {ThemeProvider, CssBaseline} from "@mui/material";

// Importamos Dexie y nuestra DB
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db/database";

// Importamos las configuraciones externas
import {temaBlog} from "./theme/theme";
import {postsDeFabrica} from "./data/postsIniciales";

// Importar los componentes de autenticación
import {AuthProvider} from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AccesoDenegado from "./pages/AccesoDenegado.jsx";

// Importamos Layouts y Páginas
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import ListaDePosts from "./pages/ListaDePosts";
import DetalleDePost from "./pages/DetalleDePost";
import AcercaDe from "./pages/AcercaDe";


const App = () => {
    // MAGIA DE DEXIE: useLiveQuery mantiene 'posts' sincronizado con IndexedDB.
    // Usamos reverse() para que los posts más nuevos aparezcan primero.
    // Agregamos || [] para que el estado inicial no sea undefined mientras carga.
    const posts = useLiveQuery(() => db.posts.orderBy('id').reverse().toArray(), []) || [];

    // Función ASÍNCRONA para devolver el blog a su estado inicial usando Dexie
    const restaurarBlog = async () => {
        await db.posts.clear(); // Vaciamos la tabla de posts
        await db.posts.bulkAdd(postsDeFabrica); // Insertamos los de fábrica
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
                            {/* Rutas Públicas */}
                            <Route path="/" element={<Inicio/>}/>
                            <Route path="/acerca-de" element={<AcercaDe/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registro" element={<Registro/>}/>
                            <Route path="/acceso-denegado" element={<AccesoDenegado/>}/>

                            {/* Ruta de Lista de Posts Pública */}
                            <Route path="/posts" element={<ListaDePosts posts={posts} restaurarBlog={restaurarBlog}/>}/>
                            <Route path="/post/:id" element={<DetalleDePost posts={posts}/>}/>


                            {/* Rutas protegidas que disparan modales sobre la Lista de Posts */}
                            <Route
                                path="/crear-post"
                                element={
                                    <RutaProtegida>
                                        <ListaDePosts posts={posts} restaurarBlog={restaurarBlog} />
                                    </RutaProtegida>
                                }
                            />

                            <Route
                                path="editar-post/:id"
                                element={
                                    <RutaProtegida>
                                        <ListaDePosts posts={posts} restaurarBlog={restaurarBlog} />
                                    </RutaProtegida>
                                }
                            />
                            <Route path="*" element={<h2 style={{textAlign: 'center', marginTop: '50px'}}>Error 404 - Página no encontrada</h2>}/>
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
