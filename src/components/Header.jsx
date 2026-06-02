import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
    const { usuario, cerrarSesion } = useAuth(); // Obtenemos el estado y función
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/'); // Redirigiendo al home al cerrar sesión
    };

    return (
        // AppBar es el contenedor principal de la barra de navegación
        <AppBar position="sticky">
            {/* Toolbar maneja el espaciado y la alineación interna */}
            <Toolbar>

                {/* Typography se usa para el texto o logo de la izquierda */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mi Blog React
                </Typography>

                {/* Box funciona como un <div> pero con ventajas de MUI para dar estilos rápidos */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>

                    {/* Usamos el prop 'component' para integrar el Link de react-router-dom */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        startIcon={<HomeIcon />}
                    >
                        Inicio
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/posts"
                        startIcon={<ArticleIcon />}
                    >
                        Blog
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/acerca-de"
                        startIcon={<InfoIcon />}
                    >
                        Acerca De
                    </Button>

                    {/* Lógica condicional de Autenticación */}
                    {usuario ? (
                        <>
                            <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic' }}>
                                Hola, {usuario.nombre}
                            </Typography>
                            <Button color="inherit" onClick={handleCerrarSesion} sx={{ ml: 1, border: '1px solid white' }}>
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login" sx={{ ml: 2, fontWeight: 'bold' }}>
                            Iniciar Sesión
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;