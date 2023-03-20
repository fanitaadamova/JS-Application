import { clearSessionStorageData } from '../util.js';

const HOST = 'http://localhost:3030';

async function request(method, endPoint, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(HOST + endPoint, options);
        if (response.ok != true) {
            if (response.status == 403) {
                clearSessionStorageData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export function get(endPoint) {
    return request('GET', endPoint);
}
export function post(endPoint, data) {
    return request('POST', endPoint, data);
}
export function put(endPoint, data) {
    return request('PUT', endPoint, data);
}
export function del(endPoint) {
    return request('DELETE', endPoint);
}