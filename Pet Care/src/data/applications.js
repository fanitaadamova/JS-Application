//Допълнителна функционалност - за Бонус точки

import { post, get } from "./api.js";

const endpoints = {
    applications: '/data/donation',
    byPetId: petId => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    byPetIdandUserId: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function donate(petId) {
    //Публикувам към endpoints.applications за коe viwotno darqwa и какви са моите данни(кой user)
    return post(endpoints.applications, { petId });
}

export async function getApplications(petId) {
    //
    return get(endpoints.byPetId(petId));
}

export async function getUserApplication(petId, userId) {
    return get(endpoints.byPetIdandUserId(petId, userId));
}