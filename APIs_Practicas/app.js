// app.js - Punto de entrada principal
// Importa y ejecuta los ejercicios desde los módulos de services

import { getUsersAndPosts } from './services/enun1.js';
import { getPostsWithComments } from './services/enun2.js';
import { getInformationOfPost } from './services/enun3.js';
import { deletePostWithValidation } from './services/enun4.js';

// Ejecutar todos los ejercicios en secuencia
const ejecutarEjercicios = async () => {
    try {
        

        // Ejercicio 1: Usuarios activos y sus publicaciones
        await getUsersAndPosts();

        // Ejercicio 2: Publicaciones con y sin comentarios
        await getPostsWithComments();

        // Ejercicio 3: Búsqueda de publicación por ID
        await getInformationOfPost(3);

        // Ejercicio 4: Eliminar publicación si no tiene comentarios
        await deletePostWithValidation(8);

    } catch (error) {
        console.error('Error al ejecutar los ejercicios:', error.message);
    }
};

ejecutarEjercicios();
