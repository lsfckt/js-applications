import { html } from "../../node_modules/lit-html/lit-html.js";
import { endpoints } from "../api/api.js";
import { getData } from "../api/api.js";
import { post } from "../api/api.js";
import { setData } from "../api/auth.js";
// import page from "../../node_modules/page/page.mjs";

const loginTemp = (onLogin) => html`
     <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export async function login(ctx) {
  ctx.render(loginTemp(onLogin));

  async function onLogin(e) {
    e.preventDefault();

    const { email, password } = getData(e.target);

    if (!email || !password) {
      throw new Error('Both input fields are required!');
    }

    const data = await post(endpoints.login, { email, password });
    setData(data);

    try {
      ctx.page.redirect('/products');
    } catch (error) {
      alert(error.message);
    }
  }
}

