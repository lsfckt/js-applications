import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { fetchLogout } from '../services/auth.js';
import { delUser } from '../utils.js';

const navBarTemp = (user, onLogout) => html`
        <div>
          <a href="/dashboard">Dashboard</a>
        </div>

        ${user
    ?
    html`<div class="user">
          <a href="/new">Add Album</a>
          <a href="" @click=${onLogout}>Logout</a>
        </div>`
    :
    html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}`;

export async function navBarView(ctx, next) {
  const user = ctx.user;

  render(navBarTemp(user, onLogout), document.querySelector('nav'));

  async function onLogout(e) {
    e.preventDefault();



    try {
      await fetchLogout();
      delUser();

      ctx.page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }

  next();
}

