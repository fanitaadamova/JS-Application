//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    byUserId: userId => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    byId: '/data/books/'
}
//така взимаме всички оферти
export async function getAllBooks() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createBook(data) {
    return post(endpoins.catalog, data);
}

export async function updateBook(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteBook(id) {
    return del(endpoins.byId + id);
}


export async function getMyBooks(userId) {
    return get(endpoins.byUserId(userId));
}