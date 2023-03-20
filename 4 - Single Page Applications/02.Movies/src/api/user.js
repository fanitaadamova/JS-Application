import { get, post } from "./api.js";

const nav = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout'
}

export async function login(email, password){
    const user = await post(nav.login, {email, password});
    localStorage.setItem('userData', JSON.stringify(user));
}

export async function register(email, password){
    const user = await post(nav.register, {email, password});
    localStorage.setItem('userData', JSON.stringify(user));
}

export async function logout(){
    get(nav.logout);
    localStorage.removeItem('userData');
}