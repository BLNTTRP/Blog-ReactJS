import {useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton,
    Button, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PostCard = ({post, onEdit, onDelete}) => {
    const {usuario} = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const menuAbierto = Boolean(anchorEl);

    const handleAbrirMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCerrarMenu = () => {
        setAnchorEl(null);
    };

    const handlePrepararEdicion = () => {
        onEdit(post);
        handleCerrarMenu();
    };

    const handlePrepararEliminacion = () => {
        onDelete(post);
        handleCerrarMenu();
    }

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>

            {/* CardHeader nos permite ubicar fácilmente el título y un botón de accion (opciones) */}
            <CardHeader
                action={
                    usuario ? (
                        <IconButton aria-label="opciones" onClick={(e) => handleAbrirMenu(e)}>
                            <MoreVertIcon/>
                        </IconButton>
                    ) : null
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
            <CardContent sx={{flexGrow: 1, overflow: 'hidden', width: '100%'}}>
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

            <Menu
                anchorEl={anchorEl}
                open={menuAbierto}
                onClose={handleCerrarMenu}
            >
                <MenuItem onClick={handlePrepararEdicion}>
                    Editar
                </MenuItem>

                {/* Click para que abra la confirmación */}
                <MenuItem onClick={handlePrepararEliminacion} sx={{color: 'error.main'}}>
                    Eliminar
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default PostCard;