import { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    const iniciarSesion = (datos) => {
        // Credenciales hardcodeadas del administrador
        const adminEmail = 'admin@blog.com';
        const adminPassword = '1234';

        if (datos.email === adminEmail && datos.password === adminPassword) {
            setUsuario({ nombre: 'Admin', email: datos.email });
            return true; // Éxito
        }
        return false; // Error en credenciales
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}