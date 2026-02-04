// Defino la función principal como asíncrona para poder usar await
const eliminarPublicacionSiNoTieneComentarios = async (postId) => {

    // Realizo una petición HTTP al endpoint /posts para obtener todas las publicaciones
    const respuestaPosts = await fetch('http://localhost:3000/posts');
    
    // Convierto la respuesta de las publicaciones a formato JSON
    const posts = await respuestaPosts.json();

    // Busco la publicación que tenga el id recibido por parámetro
    const publicacion = posts.find(post => post.id === postId);
    
    // Valido si la publicación no existe
    // Si no se encuentra, muestro un mensaje y finalizo la función
    if (!publicacion) {
        console.log('La publicación no existe');
        return;
    }

    // Realizo una petición HTTP al endpoint /comments para obtener todos los comentarios
    const respuestaComentarios = await fetch('http://localhost:3000/comments');
    
    // Convierto la respuesta de los comentarios a formato JSON
    const comentarios = await respuestaComentarios.json();

    // Filtro los comentarios que pertenecen a la publicación indicada
    const comentariosPublicacion = comentarios.filter(
        comentario => comentario.postId === postId
    );

    // Valido si la publicación tiene uno o más comentarios
    // Si tiene comentarios, no se permite eliminarla
    if (comentariosPublicacion.length > 0) {
        console.log('No se puede eliminar la publicación porque tiene comentarios');
        return;
    }

    // Realizo la petición DELETE para eliminar la publicación
    await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
    });

    // Realizo una petición GET para validar si la publicación fue eliminada
    const respuestaValidacion = await fetch(
        `http://localhost:3000/posts/${postId}`
    );

    // Si la respuesta no es correcta, significa que la publicación ya no existe
    if (!respuestaValidacion.ok) {
        console.log('Publicación eliminada correctamente');
    }
};

// Ejecuto la función enviando el id de la publicación a eliminar
eliminarPublicacionSiNoTieneComentarios(8);