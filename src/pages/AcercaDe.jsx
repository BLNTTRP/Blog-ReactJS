import { Container } from '@mui/material';

// Importación de componentes
import TechStack from '../components/AcercaDe/TechStack';
import Biografia from '../components/AcercaDe/Biografia';
import FormularioSugerencias from '../components/FormularioSugerencias';

const AcercaDe = () => {
    return (
        <Container sx={{ paddingY: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Sección del Perfil y Tecnologías */}
            <TechStack />

            {/* Sección de la Biografía */}
            <Biografia />

            {/* Sección del Formulario de Sugerencias */}
            <FormularioSugerencias />

        </Container>
    );
};

export default AcercaDe;