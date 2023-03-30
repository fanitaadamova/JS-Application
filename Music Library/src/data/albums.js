
import { get, post, put, del } from "./api.js";

//Create , editing and deliting from catalog and rendering ofer by ofer
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/albums?sortBy=_createdOn%20desc',
    create: '/data/albums',  
    byId: '/data/albums/'
}
//така взимаме всички книги
export async function getAllAbums() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createAlbum(data) {
    return post(endpoins.create, data);
}

export async function updateAlbum(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteAlbum(id) {
    return del(endpoins.byId + id);
}




