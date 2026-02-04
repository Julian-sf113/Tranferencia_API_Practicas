// Defino la función principal como asíncrona para poder usar await
const usuariosConPublicaciones = async () => {
    
    // Realizo una petición HTTP al endpoint /users para obtener los usuarios
    const respuestaUsuarios = await fetch('http://localhost:3000/users');
    
    // Convierto la respuesta de los usuarios a formato JSON
    const usuarios = await respuestaUsuarios.json();

    // Realizo una petición HTTP al endpoint /posts para obtener las publicaciones
    const respuestaPosts = await fetch('http://localhost:3000/posts');
    
    // Convierto la respuesta de las publicaciones a formato JSON
    const posts = await respuestaPosts.json();

    // Proceso la información recorriendo el arreglo de usuarios
    const resultado = usuarios.map(usuario => {
        
        // Filtro las publicaciones que pertenecen al usuario actual
        const publicacionesUsuario = posts.filter(post => post.userId === usuario.id);

        // Retorno un nuevo objeto con el nombre del usuario
        // y la cantidad de publicaciones que tiene
        return {
            nombre: usuario.name,
            cantidadPublicaciones: publicacionesUsuario.length
        };

    });

    // Muestro un mensaje inicial en consola
    console.log(`Listado de usuarios y sus publicaciones:`);
    
    // Recorro el resultado final para mostrar cada usuario y su cantidad de publicaciones
    resultado.forEach(usuario => {
        console.log(`Usuario: ${usuario.nombre} - Cantidad de Publicaciones: ${usuario.cantidadPublicaciones}`);
    });

    // Retorno el resultado final por si se necesita usar después
    return resultado;

};

// Ejecuto la función principal
usuariosConPublicaciones();
