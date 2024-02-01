import { html } from "../../node_modules/lit-html/lit-html.js";
import { endpoints, getData, post } from "../api/api.js";
import { setData } from "../api/auth.js";
import page from "../../node_modules/page/page.mjs";

const regTemp = html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onReg}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export function register(ctx) {
    ctx.render(regTemp);
}

async function onReg(e) {
    e.preventDefault();

    const { email, password, rePass } = getData(e.target);


    try {

        if (!email || !password || !rePass) {
            throw new Error('All fields are required!')
        }

        if (password !== rePass) {
            throw new Error('Passwords don`t mach!');
        }

        const data = await post(endpoints.register, { email, password, rePass });

        setData(data);

        page.redirect('/products');

    } catch (error) {
        alert(error.message);
    }


}
