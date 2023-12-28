import { homeView } from "./home.js";
import { updateNav, displayView } from './util.js';

const loginSection = document.querySelector('#form-login');

export async function logout() {

    const url = 'http://localhost:3030/users/logout';
    const user = JSON.parse(localStorage.getItem('user'));
    const options = {
        method: 'GET',
        headers: { 'X-Authorization': user.accessToken }
    }
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error('Failed to logout');
        }

        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');

        updateNav();
        displayView(loginSection);
    } catch (err) {
        alert(err)
    }
}