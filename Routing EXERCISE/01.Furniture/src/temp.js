import { html } from "../node_modules/lit-html/node/lit-html.js"

export const guestUserTemp = html`
            <div id="guest">
                <a id="loginLink" href="/login">Login</a>
                <a id="registerLink" href="/register">Register</a>
            </div>
`;

export const regNavBar = html`
            <div id="user">
                <a id="createLink" href="/create">Create Furniture</a>
                <a id="logoutBtn" href="/">Logout</a>
            </div>
`;