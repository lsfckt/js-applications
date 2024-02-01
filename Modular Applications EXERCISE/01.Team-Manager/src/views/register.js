import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { handler, setData } from "../utils.js";
import { post } from "../api/api.js";

let err = '';

export const regTemp = (onReg) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form id="register-form" class="main-form pad-large" @submit=${onReg}>
                ${err.length > 0 ? html`<div class="error">${err}</div>` : nothing}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
            <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
            </footer>
        </article>
    </section>`;

const regExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/gm;

export async function onReg({ email, username, password }) {

    const isEmailValid = regExp.test(email);

    try {
        if (!isEmailValid) {
            throw new Error('Email is not valid!');
        }

        if(username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }

        if(password.length < 3) {
            throw new Error('Password must be at least 3 characters/digits')
        }
        

        const result = await post('/users/register', { email, username, password });
        setData(result);

        await page.redirect('/myteams');
    } catch (error) {
        err = error.message;
        register();
    }

}

export function register(ctx) {
    ctx.render(regTemp(handler(onReg)));
}