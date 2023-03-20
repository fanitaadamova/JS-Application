import { get, post } from './api.js';

export async function loginUser(email, password) {
    return post('/users/login', { email, password });
}

export async function registerUser(email, password) {
    return post('/users/register', { email, password });
}

export async function logoutUser() {
    return get('/users/logout');
}