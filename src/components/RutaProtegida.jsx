import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
    const { usuario } = useAuth();

    // Si no hay usuario logueado, redirigimos de forma forzada a la pantalla de Login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario, renderizamos el componente hijo (la ruta solicitada)
    return children;
};

export default RutaProtegida;