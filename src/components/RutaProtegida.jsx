import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
    const { usuario } = useAuth();

    // Si no hay usuario logueado en absoluto, lo mandamos al Login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario logueado, pero su rol NO es de administrador, lo mandamos a Acceso Denegado
    if (usuario.rol !== 'admin') {
        return <Navigate to="/acceso-denegado" replace />;
    }

    // Si pasó ambas validaciones (es usuario y es admin), le permitimos ver la ruta
    return children;
};

export default RutaProtegida;