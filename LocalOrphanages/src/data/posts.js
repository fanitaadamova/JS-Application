//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/posts?sortBy=_createdOn%20desc',
    byUserId: userId => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/posts',
    byId: '/data/posts/'
}
//така взимаме всички книги
export async function getAllPosts() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createPost(data) {
    return post(endpoins.create, data);
}

export async function updatePost(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deletePost(id) {
    return del(endpoins.byId + id);
}


export async function getMyPosts(userId) {

    return get(endpoins.byUserId(userId) );
}


//Бонус точки


