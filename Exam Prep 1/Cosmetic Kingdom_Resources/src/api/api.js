import { getAuth } from "./auth.js";

const host = 'http://localhost:3030';

export const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    products: '/data/products?sortBy=_createdOn%20desc',
    create: '/data/products',
    details: '/data/products/',
    edit: '/data/products/',
    delete: '/data/products/',
}

export function getData(target) {

    const formData = new FormData(target);
    return {
        email: formData.get('email'),
        password: formData.get('password'),
        rePass: formData.get('re-password'),
        name: formData.get('name'),
        imageUrl: formData.get('imageUrl'),
        category: formData.get('category'),
        description: formData.get('description'),
        price: formData.get('price'),
    }
}


export async function request(method, url, info) {
    const user = getAuth();

    const options = {
        method,
        headers: !user ? { 'Content-Type': "application/json" } : { 'X-Authorization': user.accessToken },
    }

    info ? options.body = JSON.stringify(info) : null;

    const response = await fetch(host + url, options);

    if (response.status !== 200 && response.status !== 204) {
        throw new Error(response.statusText);
    }

    try {
        const data = await response.json();

        return data;

    } catch (error) {
        alert(error.message);
    }

}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
