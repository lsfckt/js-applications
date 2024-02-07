import { html } from '../../node_modules/lit-html/lit-html.js';
import { fetchRegister } from '../services/auth.js';
import { getFormData, setUser } from '../utils.js';

const regTemp = (onReg) => html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="login-form" @submit=${onReg}>
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`;

export function regPage(ctx) {
    ctx.render(regTemp(onReg));

    async function onReg(e) {
        e.preventDefault();

        const userData = getFormData(e.target);

        if (!userData.email || !userData.password || !userData['re-password']) {
            alert('All fields are required! Please try again.');
            return;
        } else if (userData.password !== userData['re-password']) {
            alert('Both passwords must match! Please try again.');
            return;
        }

        const res = await fetchRegister(userData);

        try {
            setUser(res);
            ctx.page.redirect('/dashboard');
            
            return res;
        } catch (error) {
            alert(error.message);
        }
    }
}