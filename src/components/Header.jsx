import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';

const Header = () => {
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
                <Box sx={{ display: 'flex', gap: 1 }}>

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

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;