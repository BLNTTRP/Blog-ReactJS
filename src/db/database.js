import Dexie from 'dexie';
import { postsDeFabrica } from '../data/postsIniciales';

// Inicializamos la base de datos con un nombre
export const db = new Dexie('BlogReactDB');

// Definimos el esquema de la base de datos (las "tablas" o stores)
// El primer elemento es la llave primaria. El '++' significa auto-incremental.
// Los demás elementos son índices por los que luego podremos filtrar búsquedas rápidamente.
db.version(1).stores({
    posts: '++id, titulo',
    usuarios: 'email, rol', // Usaremos el email como llave primaria única
    comentarios: '++id, postId, parentId, emailAutor', // Índices para buscar comentarios rápido por post
    sugerencias: '++id, correo'
});

// Poblamos la base de datos con valores por defecto LA PRIMERA VEZ que se crea
db.on('populate', async () => {
    // Insertamos los posts de fábrica
    await db.posts.bulkAdd(postsDeFabrica);
});

// Exportamos la db para usarla en los componentes
export default db;