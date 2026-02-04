// Defino la función principal como asíncrona para poder usar await
const consultarPublicacionPorId = async (idPublicacion) => {
    
    // Realizo una petición HTTP al endpoint /posts para obtener todas las publicaciones
    const respuestaPosts = await fetch('http://localhost:3000/posts');
    
    // Convierto la respuesta de las publicaciones a formato JSON
    const posts = await respuestaPosts.json();
   
    // Busco dentro del arreglo de publicaciones la que tenga el id recibido por parámetro
    const publicacion = posts.find(post => post.id === idPublicacion);

    // Valido si la publicación no existe
    // Si no se encuentra, muestro un mensaje y termino la función
    if (!publicacion) {
        console.log('La publicación no existe');
        return;
    }
    
    // Realizo una petición HTTP al endpoint /comments para obtener los comentarios
    const respuestaComentarios = await fetch('http://localhost:3000/comments');
    
    // Convierto la respuesta de los comentarios a formato JSON
    const comentarios = await respuestaComentarios.json();

    // Filtro los comentarios que pertenecen a la publicación consultada
    const comentariosPublicacion = comentarios.filter(
        comentario => comentario.postId === idPublicacion
    );
    
    // Creo un objeto con la información final de la publicación
    // incluyendo el conteo de comentarios
    const resultado = {
        titulo: publicacion.title,
        contenido: publicacion.body,
        numeroComentarios: comentariosPublicacion.length
    };
   
    // Muestro en consola la información de la publicación consultada
    console.log('Información de la publicación consultada:');
    console.log(`Título: ${resultado.titulo}`);
    console.log(`Contenido: ${resultado.contenido}`);
    console.log(`Número de comentarios: ${resultado.numeroComentarios}`);

    // Retorno el resultado final por si se necesita usar más adelante
    return resultado;
};

// Ejecuto la función enviando como parámetro el id de la publicación
consultarPublicacionPorId(1);