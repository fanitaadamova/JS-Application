import { del, get, post, put } from './api.js';

export async function getAllFurnitures() {
    return get('/data/catalog');
}

export async function getFurnitureById(furnitureId) {
    return get(`/data/catalog/${furnitureId}`);
}

export async function getMyFurnitures(userId) {
    return get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createFurniture({ description, img, make, material, model, price, year }) {
    return post('/data/catalog', { description, img, make, material, model, price, year });
}

export async function editFurnitureById(furnitureId, { description, img, make, material, model, price, year }) {
    return put(`/data/catalog/${furnitureId}`, { description, img, make, material, model, price, year });
}

export async function deleteFurnitureById(furnitureId) {
    return del(`/data/catalog/${furnitureId}`);
}