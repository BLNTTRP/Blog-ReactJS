import { useState, useRef } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ModalFormularioPost = ({
    abierto, alCerrar, alGuardar, datosPost, setDatosPost, esEdicion
}) => {

    // Estados y referencias para el Drag and Drop
    const [dragActivo, setDragActivo] = useState(false);
    const inputFileRef = useRef(null);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosPost({
            ...datosPost,
            [name]: value
        });
    };

    // LÓGICA DE DRAG AND DROP
    // Maneja cuando el usuario arrastra algo sobre el área
    const manejarDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActivo(true);
        } else if (e.type === "dragleave") {
            setDragActivo(false);
        }
    };

    // Procesa el archivo (ya sea por drop o por click) y lo convierte a Base64
    const procesarArchivo = (archivo) => {
        if (archivo && archivo.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (evento) => {
                // Guardamos el resultado en Base64 en el estado del post
                setDatosPost({ ...datosPost, img: evento.target.result });
            };
            reader.readAsDataURL(archivo);
        } else {
            alert("Por favor, selecciona un archivo de imagen válido (jpg, png, webp, etc.)");
        }
    };

    // Maneja el momento en el que el usuario suelta la imagen
    const manejarDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActivo(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            procesarArchivo(e.dataTransfer.files[0]);
        }
    };

    // Maneja la selección de archivo al hacer clic en el área
    const manejarSeleccionArchivo = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            procesarArchivo(e.target.files[0]);
        }
    };

    // Eliminar la imagen seleccionada
    const eliminarImagen = (e) => {
        e.stopPropagation(); // Evita que se abra el cuadro de diálogo de archivos al hacer clic en eliminar
        setDatosPost({ ...datosPost, img: '' });
        if (inputFileRef.current) {
            inputFileRef.current.value = ""; // Resetea el input file
        }
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

                {/* ÁREA DE DRAG AND DROP */}
                <Box
                    onDragEnter={manejarDrag}
                    onDragLeave={manejarDrag}
                    onDragOver={manejarDrag}
                    onDrop={manejarDrop}
                    onClick={() => inputFileRef.current.click()}
                    sx={{
                        border: '2px dashed',
                        borderColor: dragActivo ? 'primary.main' : 'grey.400',
                        bgcolor: dragActivo ? 'rgba(128, 128, 0, 0.05)' : 'transparent',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '150px'
                    }}
                >
                    <input
                        ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        onChange={manejarSeleccionArchivo}
                        style={{ display: 'none' }}
                    />

                    {datosPost.img ? (
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <img
                                src={datosPost.img}
                                alt="Vista previa"
                                style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                            />
                            <IconButton
                                size="small"
                                onClick={eliminarImagen}
                                sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -10,
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'error.dark' }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ) : (
                        <>
                            <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="body1" color="text.secondary">
                                Arrastra y suelta una imagen aquí
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                o haz clic para examinar
                            </Typography>
                        </>
                    )}
                </Box>
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