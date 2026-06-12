import { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Inicialización perezosa: Buscamos si ya hay un usuario guardado
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem('usuario_blog');
        if (usuarioGuardado) {
            return JSON.parse(usuarioGuardado);
        }
        return null;
    });

    // Efecto para mantener sincronizado el estado con el localStorage
    useEffect(() => {
        if (usuario) {
            localStorage.setItem('usuario_blog', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('usuario_blog');
        }
    }, [usuario])

    // Función para registrar un visitante
    const registrarUsuario = (datos) => {
        // Evitar que se registren con el correo del admin
        const adminEmail = 'admin@blog.com';
        if (datos.email === adminEmail) {
            return { exito: false, mensaje: 'El correo ya se encuentra registrado.' };
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];

        // Verificar si el email ya existe
        if (usuariosRegistrados.some(u => u.email === datos.email)) {
            return { exito: false, mensaje: 'El correo ya se encuentra registrado.' };
        }

        const nuevoUsuario = {
            nombre: datos.nombre,
            email: datos.email,
            password: datos.password,
            rol: 'visitante' // Asignamos el rol por defecto
        };

        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios_registrados', JSON.stringify(usuariosRegistrados));
        return { exito: true };
    };

    // Iniciar sesión verifica el localStorage
    const iniciarSesion = (datos) => {
        // Credenciales hardcodeadas del administrador
        const adminEmail = 'admin@blog.com';
        const adminPassword = '1234';

        // Verificamos si es el admin
        if (datos.email === adminEmail && datos.password === adminPassword) {
            setUsuario({ nombre: 'Admin', email: datos.email, rol: 'admin' });
            return true; // Éxito
        }

        // Verificamos si es un visitante registrado en localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
        const usuarioEncontrado = usuariosRegistrados.find(
            u => u.email === datos.email && u.password === datos.password
        );

        if (usuarioEncontrado) {
            // No guardamos la contraseña en el estado por seguridad
            setUsuario({ nombre: usuarioEncontrado.nombre, email: usuarioEncontrado.email, rol: usuarioEncontrado.rol });
            return true;
        }

        return false; // Error en credenciales
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, registrarUsuario }}>
            {children}
        </AuthContext.Provider>
    )
}