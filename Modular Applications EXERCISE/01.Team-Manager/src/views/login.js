import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { handler, setData } from "../utils.js";
import { post } from "../api/api.js";

let err = '';

export const loginTemp = (onLogin) => html`
<section id="login">
        <article class="narrow">
            <header class="pad-med">
                <h1>Login</h1>
            </header>
            <form id="login-form" class="main-form pad-large" @submit=${onLogin}>
                ${err.length > 0 ? html`<div class="error">${err}</div>` : nothing}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input class="action cta" type="submit" value="Sign In">
            </form>
            <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
            </footer>
        </article>
    </section>`;


export async function onLogin({ email, password }) {

    try {
        const result = await post('/users/login', { email, password });
        setData(result);

        await page.redirect('/myteams');
    } catch (error) {
        err = error.message;
        login();
    }
}

export function login(ctx) {
    ctx.render(loginTemp(handler(onLogin)));
}