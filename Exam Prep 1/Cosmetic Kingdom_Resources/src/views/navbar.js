import { html } from "../../node_modules/lit-html/lit-html.js";
import { onLogout } from "../app.js";

const loggedNavTemp = html`
    <div class="user">
        <a href="/create">Add Product</a>
        <a href="javascript:void(0)" @click=${onLogout}>Logout</a>
    </div>`;

const guestNavTemp = html`
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`;

export const navbarTemp = (user) => {
    return html`
        <div>
            <a href="/products">Products</a>
          </div>

          ${user ? html`${loggedNavTemp}` : html`${guestNavTemp}`}
    `;
}


