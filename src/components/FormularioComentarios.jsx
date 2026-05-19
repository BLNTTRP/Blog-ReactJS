import { useState } from "react";
import styled from "styled-components";

// Styled Components nos permite crear componentes visuales con CSS encapsulado.
// Esto nos evita los conflictos entre clases de estilos

const ContenedorFormulario = styled.div`
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    /* Media Query directamente dentro del componente */
    @media (max-width: 600px) {
        padding: 15px;
        background-color: #ffffff; /* En móviles lo hacemos blanco */
    }
`;

const GrupoInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Etiqueta = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
`;

// Podemos estilizar etiquetas HTML estándar
const InputTexto = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const AreaTexto = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    min-height: 100px;
    resize: vertical;
`;

const BotonEnviar = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #0056b3;
    }
    
    /* Agregamos estilos para cuando el botón esté deshabilitado */
    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;

const FormularioComentarios = () => {
    // Estado único para agrupar todos los campos del formulario
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        email: '',
        comentario: ''
    });

    // Función genérica para manejar los cambios en cualquier input
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        // Usamos el spread operator (...) para mantener los datos anteriores
        // y solo actualizar el campo que el usuario está modificando
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault(); // Evitar que la página se recargue
        console.log("Comentario listo para enviar a la base de datos: ", datosFormulario);

        // Opcional: Limpiar el formulario después de enviar
        setDatosFormulario({nombre: '', email: '', comentario: ''});
    };

    // Lógica de validación:
    // El formulario es inválido si el comentario tiene menos de 10 caracteres
    // O si el email no incluye el simbolo '@'
    const formularioEsInvalido = datosFormulario.comentario.length < 10 || !datosFormulario.email.includes('@');

    return (
        <ContenedorFormulario>
            <h2>Deja un comentario</h2>

            <form onSubmit={manejarEnvio}>
                <GrupoInput>
                    <Etiqueta htmlFor="nombre">Nombre:</Etiqueta>
                    <InputTexto
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={datosFormulario.nombre} // React controla el valor
                    onChange={manejarCambio} // React actualiza el estado al escribir
                    required
                    />
                </GrupoInput>

                <GrupoInput>
                    <Etiqueta htmlFor="email">Correo Electrónico:</Etiqueta>
                    <InputTexto
                    type="email"
                    id="email"
                    name="email"
                    value={datosFormulario.email}
                    onChange={manejarCambio}
                    required
                    />
                </GrupoInput>

                <GrupoInput>
                    <Etiqueta htmlFor="comentario">Tu Comentario (mínimo 10 caracteres):</Etiqueta>
                    <AreaTexto
                    id="comentario"
                    name="comentario"
                    value={datosFormulario.comentario}
                    onChange={manejarCambio}
                    required
                    />
                </GrupoInput>

                {/* Pasamos la variable booleana a la propiedad disabled */}
                <BotonEnviar type="submit" disabled={formularioEsInvalido}>
                    Publicar Comentario
                </BotonEnviar>
            </form>
        </ContenedorFormulario>
    );
};

export default FormularioComentarios;