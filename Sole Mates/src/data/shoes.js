//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/shoes?sortBy=_createdOn%20desc',
    create: '/data/shoes',  
    byId: '/data/shoes/'
}
//така взимаме всички книги
export async function getAllShoes() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createShoes(data) {
    return post(endpoins.create, data);
}

export async function updateShoes(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteShoes(id) {
    return del(endpoins.byId + id);
}




