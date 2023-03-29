//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',  
    byId: '/data/pets/'
}
//така взимаме всички книги
export async function getAllPets() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createPet(data) {
    return post(endpoins.create, data);
}

export async function updatePet(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deletePet(id) {
    return del(endpoins.byId + id);
}




