import { useParams, Link } from "react-router-dom";
import { Container, Typography, Button, Box, Card, CardMedia, CardContent } from "@mui/material";

const DetalleDePost = ({ posts }) => {
    // Extraer el ID dinámico de la URL
    const { id } = useParams();

    // Buscamos el post correspondiente. (El ID de la URL llega como String, por eso lo convertimos a Number)
    const post = posts.find((p) => p.id === Number(id));

    // Validar por si alguien ingresa un ID que no existe
    if (!post) {
        return (
            <Container sx={{ paddingY: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="error">Post no encontrado</Typography>
                <Button component={Link} to="/posts" variant="contained" sx={{ mt: 2 }}>Volver a los Posts</Button>
            </Container>
        );
    }

    return (
        <Container sx={{ paddingY: 4, maxWidth: '800px' }}>
            <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image={post.img}
                    alt={post.titulo}
                />
                <CardContent>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {post.titulo}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {post.descripcion}
                    </Typography>
                </CardContent>
            </Card>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button component={Link} to="/posts" variant="contained" color="primary">
                    Volver al Blog
                </Button>
            </Box>
        </Container>
    );
};

export default DetalleDePost;