// apiService.js - Capa de acceso compartida a la API (json-server)
// Todas las funciones de peticiones HTTP centralizadas aquí

const BASE_URL = 'http://localhost:3000';

// Obtener todos los usuarios
export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();
    return users;
};

// Obtener todas las publicaciones
export const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    const posts = await response.json();
    return posts;
};

// Obtener todos los comentarios
export const getComments = async () => {
    const response = await fetch(`${BASE_URL}/comments`);
    const comments = await response.json();
    return comments;
};

// Obtener comentarios filtrados por postId
export const getCommentsByPostId = async (postId) => {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
    const comments = await response.json();
    return comments;
};

// Eliminar una publicación por ID
export const deletePost = async (postId) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
    });
    return response;
};

// Obtener una publicación por ID
export const getPostById = async (postId) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if (!response.ok) {
        return null;
    }
    const post = await response.json();
    return post;
};
