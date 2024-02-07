import { html } from '../../node_modules/lit-html/lit-html.js';
import { setUser } from '../utils.js';
import { fetchLogin } from '../services/auth.js';
import { getFormData } from '../utils.js';

const loginTemp = (onLogin) => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onLogin}>
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemp(onLogin));

    async function onLogin(e) {
        e.preventDefault();

        const userData = getFormData(e.target);

        if (!userData.email || !userData.password) {
            alert('All fields are required! Please try again.');
            return;
        }


        try {
            const res = await fetchLogin(userData);
            setUser(res);
            ctx.page.redirect('/dashboard');

            return res;
        } catch (error) {
            alert(error.message);
        }
    }
}