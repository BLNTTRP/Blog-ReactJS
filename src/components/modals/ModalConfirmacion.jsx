import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";

const ModalConfirmacion = ({
    abierto, alCerrar, alConfirmar, titulo, mensaje,
    textoBotonConfirmar = "Confirmar", colorBoton = "error"
}) => {
    return (
        <Dialog open={abierto} onClose={alCerrar}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                {/* DialogContentText es ideal para agregar el texto descriptivo de las alertas */}
                <DialogContentText>{mensaje}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: '16px 24px'}}>
                <Button onClick={alCerrar} color="primary">
                    Cancelar
                </Button>
                {/* Botón rojo (error) para advertir sobre la acción destructiva */}
                <Button onClick={alConfirmar} variant="contained" color={colorBoton}>
                    {textoBotonConfirmar}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirmacion;