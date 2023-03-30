
import { setUserData, clearUserData } from "../util.js";
import { post, get } from "./api.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

//TODO Change user objects according to the requarements

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}

export async function register(username, email, password, gender) {
    const result = await post(endpoints.register, { username, email, password, gender });
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}