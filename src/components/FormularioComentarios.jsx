import { useState } from "react";
import styled from "styled-components";

const ContenedorFormulario = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const GrupoInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const AreaTexto = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    font-family: inherit;
    
    &:focus {
        outline: none;
        border-color: #808000; /* Color primario del tema */
    }
`;

const BotonEnviar = styled.button`
    background-color: #808000;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #5c5c00;
    }
    
    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;

const FormularioComentarios = ({
    onEnviar,
    autoFocus = false,
    placeholder = "Escribe tu comentario..." }) => {

    const [texto, setTexto] = useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        if (texto.trim().length > 0) {
            onEnviar(texto); // Pasamos solo el texto al componente padre
            setTexto(''); // Limpiamos el input
        }
    };

    return (
        <ContenedorFormulario>
            <form onSubmit={manejarEnvio}>
                <GrupoInput>
                    <AreaTexto
                        name="comentario"
                        placeholder={placeholder}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        autoFocus={autoFocus}
                        required
                    />
                </GrupoInput>
                <BotonEnviar type="submit" disabled={texto.trim().length < 3}>
                    Publicar
                </BotonEnviar>
            </form>
        </ContenedorFormulario>
    );
};

export default FormularioComentarios;