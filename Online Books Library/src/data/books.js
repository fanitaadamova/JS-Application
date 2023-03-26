//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    byUserId: userId => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    byId: '/data/books/'
}
//така взимаме всички книги
export async function getAllBooks() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createBook(data) {
    return post(endpoins.create, data);
}

export async function updateBook(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteBook(id) {
    return del(endpoins.byId + id);
}


export async function getMyBooks(userId) {

    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}


//Бонус точки

export function getAllLikesForBookById(id) {
    return get(`/data/likes?where=id%3D%22${id}%22&distinct=_ownerId&count`);
}

export function getLikeForUserById(id, userId) {
    return get(`/data/likes?where=id%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function addLike(id) {
    return post('/data/likes', { id });
} 