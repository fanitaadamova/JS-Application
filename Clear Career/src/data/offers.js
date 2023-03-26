//Create , editing and deliting from catalog and rendering ofer by ofer

import { get, post, put, del } from "./api.js";
//линковете ни са даден по условия- byId за offer details, edit and delete 
const endpoins = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/'
}
//така взимаме всички оферти
export async function getAllOffers() {
    return get(endpoins.catalog);
}

export async function getById(id) {
    return get(endpoins.byId + id);
}

export async function createOffer(data) {
    return post(endpoins.catalog, data);
}

export async function updateOffer(id, data) {
    return put(endpoins.byId + id, data);
}

export async function deleteOffer(id) {
    return del(endpoins.byId + id);
}