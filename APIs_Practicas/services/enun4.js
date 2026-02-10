// Enunciado 4: (Eliminación lógica y validación de datos)

// Antes de eliminar una publicación, el sistema debe validar si dicha publicación tiene
// comentarios asociados. Si tiene comentarios, no debe eliminarse; de lo contrario, puede
// proceder.

// Requerimientos:
// • Consultar las publicaciones.
// • Consultar los comentarios.
// • Verificar si una publicación específica tiene comentarios.
// • Si no tiene comentarios, ejecutar la eliminación.
// • Validar el resultado mediante una nueva consulta.

import { getPosts, getComments, deletePost } from './apiService.js';

// Declaración de función asíncrona con arrow function
// Recibe el ID de la publicación a eliminar
export const deletePostWithValidation = async (postId) => {
    // Inicia bloque de manejo de errores
    try {
        // Obtiene publicaciones y comentarios usando el servicio compartido
        const posts = await getPosts();
        const comments = await getComments();

        // Variable para verificar si la publicación existe
        let publicacionExiste = false;

        // Busca si la publicación existe
        for (let i = 0; i < posts.length; i++) {
            // Compara el ID de la publicación
            if (posts[i].id == postId) {
                // Marca que la publicación existe
                publicacionExiste = true;
            }
        } // Fin del for de publicaciones

        // Verifica si la publicación existe
        if (publicacionExiste == false) {
            // Muestra mensaje si no existe
            console.log(`No se encontró la publicación con ID: ${postId}`);
            return null;
        }

        // Contador de comentarios
        let contadorComentarios = 0;

        // Cuenta los comentarios de la publicación
        for (let j = 0; j < comments.length; j++) {
            // Compara si el comentario pertenece a la publicación
            if (comments[j].postId == postId) {
                // Incrementa el contador
                contadorComentarios = contadorComentarios + 1;
            }
        } // Fin del for de comentarios

        // Verifica si tiene comentarios
        if (contadorComentarios > 0) {
            // Muestra mensaje de error
            console.log('\n=== RESULTADO ===\n');
            console.log('No se puede eliminar la publicación porque tiene comentarios');
            console.log(`Cantidad de comentarios: ${contadorComentarios}`);
            return { eliminado: false, mensaje: 'No se puede eliminar la publicación porque tiene comentarios' };
        }

        // Si no tiene comentarios, procede a eliminar
        // Petición HTTP DELETE usando el servicio compartido
        const deleteResponse = await deletePost(postId);

        // Verifica si la eliminación fue exitosa
        if (deleteResponse.ok) {
            // Muestra mensaje de éxito
            console.log('\n=== RESULTADO ===\n');
            console.log('Publicación eliminada correctamente');
            return { eliminado: true, mensaje: 'Publicación eliminada correctamente' };
        } else {
            // Muestra mensaje de error en la eliminación
            console.log('\n=== RESULTADO ===\n');
            console.log('Error al eliminar la publicación');
            return { eliminado: false, mensaje: 'Error al eliminar la publicación' };
        }

    } catch (error) {
        // Muestra mensaje de error en consola
        console.error('Error:', error.message);
        // Lanza el error para manejo externo
        throw error;
    }
}; // Fin de la función

// Ejecuta la función si se corre directamente este archivo
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
    deletePostWithValidation(8);
}
