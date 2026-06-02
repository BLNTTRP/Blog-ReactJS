import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
} from "@mui/material"

const ModalFormularioPost = ({
    abierto, alCerrar, alGuardar, datosPost, setDatosPost, esEdicion
}) => {

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosPost({
            ...datosPost,
            [name]: value
        });
    };

    return (
        <Dialog open={abierto} onClose={alCerrar} fullWidth maxWidth="sm">
            <DialogTitle>{esEdicion ? "Editar Post" : "Crear un Nuevo Post"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="titulo"
                    label="Título del Post"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={datosPost.titulo}
                    onChange={manejarCambio}
                    sx={{mb: 2, mt: 1}}
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
                    value={datosPost.descripcion}
                    onChange={manejarCambio}
                    sx={{mb: 2}}
                />
                <TextField
                    margin="dense"
                    name="img"
                    label="URL de la imágen (Opcional)"
                    type="url"
                    fullWidth
                    variant="outlined"
                    value={datosPost.img}
                    onChange={manejarCambio}
                />
            </DialogContent>
            <DialogActions sx={{padding: '16px 24px'}}>
                {/* Botón Cancelar con el color secondary del tema */}
                <Button onClick={alCerrar} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={alGuardar} variant="contained" color="primary">
                    {/* Cambiamos el texto del botón de guardado según el modo */}
                    {esEdicion ? "Actualizar" : "Publicar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalFormularioPost;