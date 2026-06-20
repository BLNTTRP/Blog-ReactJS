import { createContext, useState, useContext, useEffect } from 'react';
import db from '../db/database'; // Importamos nuestra base de datos

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Mantenemos la sesión activa en el estado y en localStorage
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
    // AHORA ES ASÍNCRONA: Buscar y agregar en Dexie
    const registrarUsuario = async (datos) => {
        const adminEmail = 'admin@blog.com';
        if (datos.email === adminEmail) {
            return { exito: false, mensaje: 'El correo ya se encuentra registrado.' };
        }

        // Buscamos si el email ya existe en la tabla usuarios
        const usuarioExistente = await db.usuarios.get(datos.email);

        if (usuarioExistente) {
            return { exito: false, mensaje: 'El correo ya se encuentra registrado.' };
        }

        const nuevoUsuario = {
            nombre: datos.nombre,
            email: datos.email,
            password: datos.password,
            rol: 'visitante'
        };

        // Insertamos el nuevo usuario en Dexie
        await db.usuarios.add(nuevoUsuario);
        return { exito: true };
    };

    // Función para iniciar sesión
    // AHORA ES ASÍNCRONA: Validar contra Dexie
    const iniciarSesion = async (datos) => {
        const adminEmail = 'admin@blog.com';
        const adminPassword = '1234';

        if (datos.email === adminEmail && datos.password === adminPassword) {
            setUsuario({ nombre: 'Admin', email: datos.email, rol: 'admin' });
            return true;
        }

        // Buscamos al usuario en Dexie por su email (nuestra primary key)
        const usuarioEncontrado = await db.usuarios.get(datos.email);

        if (usuarioEncontrado && usuarioEncontrado.password === datos.password) {
            setUsuario({ nombre: usuarioEncontrado.nombre, email: usuarioEncontrado.email, rol: usuarioEncontrado.rol });
            return true;
        }

        return false;
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