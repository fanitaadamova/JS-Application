import * as api from './api.js';

const endpoints = {
    'allMovies': 'data/movies',
    'movieById': 'data/movies/',
    'addLike': 'data/likes',
    'removeLike': 'data/likes/'
}

export async function getAllMovies(){
    return api.get(endpoints.allMovies);
}
export async function getMovie(id){
    return api.get(endpoints.movieById + id);
}
export async function editMovie(id, data){
    return api.put(endpoints.movieById + id, data)
}

export async function addMovie(data){
    return api.post(endpoints.allMovies, data)
}
export async function deleteMovie(id){
    return api.delete_(endpoints.movieById + id)
}

export async function getUserLike(id, userId){
    return api.get(`data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`)
}

export async function getLikes(id){
    return api.get(`data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function likeMovie(data){
    return api.post(endpoints.addLike, data)
}