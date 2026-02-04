// Funcion principal 
const publicacionesConComentarios = async () => {
    // 1. Consultamos publicaciones
    const respuestaPosts = await fetch('http://localhost:3000/posts');
    const posts = await respuestaPosts.json();

    // 2. Consultamos comentarios
    const respuestaComentarios = await fetch('http://localhost:3000/comments');
    const comentarios = await respuestaComentarios.json();

    // 3. Procesamos la información
    const resultado = posts.map(post => {
        // Filtramos los comentarios que pertenecen a esta publicación
        const comentariosPost = comentarios.filter(comentario => comentario.postId === post.id);
    

        // 4. Conteo de comentarios por publicación
        const CantidadComentarios = comentariosPost.lenhgth;

        // 5. Clasificamos el estado de la publicacion
        const  estado = CantidadComentarios > 0 
        ? 'Con comentarios' 
        : 'Sin comentarios';

        return {
            titulo: post.title,
            numeroComentarios: CantidadComentarios,
            estado: estado
        };
    });

    // 6. Verificamos el resultado
     resultado.forEach(post => {
        console.log(`Titulo: ${post.titulo} - Número de Comentarios: ${post.numeroComentarios} - Estado: ${post.estado}`);
    });

    return resultado;
};

// Ejecutamos la función
publicacionesConComentarios();