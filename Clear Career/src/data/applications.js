//Допълнителна функционалност - за Бонус точки

import { post, get } from "./api.js";

const endpoints = {
    applications: '/data/applications',
    byOfferId: offerId => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    byOfferIdandUserId: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function apply(offerId) {
    //Публикувам към endpoints.applications за коя оферта кандидатсвам и какви са моите данни(кой кандидатства)
    return post(endpoints.applications, { offerId });
}

export async function getApplications(offerId) {
    //
    return get(endpoints.byOfferId(offerId));
}

export async function getUserApplication(offerId, userId) {
    return get(endpoints.byOfferIdandUserId(offerId, userId));
}

