import { onHomePage } from "./home.js";

const url = 'http://localhost:3030/users/register';
const emailField = document.querySelector('#email');
const passField = document.querySelector('#password');
const rePassField = document.querySelector('#inputRepeatPassword');

export async function register() {
    const form = document.querySelector('#reg-page form');
    form.addEventListener('submit', onRegister);

    async function onRegister(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const pass = formData.get('password');
        const rePass = formData.get('repeatPassword');



        if (email.length < 3) {
            alert('The email should be at least 3 characters long!');
            emailField.value = '';

            return;
        } else if (pass.length < 3) {
            alert('The password should be at least 3 characters long!');
            passField.value = '';
            rePassField.value = '';

            return;
        } else if (rePass !== pass) {
            alert('The repeat password should be equal to the password!');

            passField.value = '';
            rePassField.value = '';

            return;
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();

        try {
            if (!res.ok) {
                const error = res.statusText;
                throw new Error(error);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.pass);

            onHomePage();

        } catch (error) {
            alert(error.message);
            return;
        }
    }
}
