//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/memes?sortBy=_createdOn%20desc',
    byUserId: userId => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes',  
    byId: '/data/memes/'
}
//така взимаме всички книги
export async function getAllMemes() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createMeme(data) {
    return post(endpoins.create, data);
}

export async function updateMeme(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteMeme(id) {
    return del(endpoins.byId + id);
}

export async function getMyMemes(userId) {

    return get(endpoins.byUserId(userId) );
}



