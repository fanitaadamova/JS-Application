//Допълнителна функционалност - за Бонус точки

import { post, get } from "./api.js";

const endpoints = {
    applications: '/data/donation',
    byPostId: postId => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    byPostIdandUserId: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function donate(postId) {
    //Публикувам към endpoints.applications за коe viwotno darqwa и какви са моите данни(кой user)
    return post(endpoints.applications, { postId });
}

export async function getApplications(postId) {
    //
    return get(endpoints.byPostId(postId));
}

export async function getUserApplication(postId, userId) {
    return get(endpoints.byPostIdandUserId(postId, userId));
}