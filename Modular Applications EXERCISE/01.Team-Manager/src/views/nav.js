import { removeData } from '../utils.js';
import { browse } from './browse-teams.js';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const nav = document.querySelector('nav');

export const navTemp = (user) => html`
        <a href="/browse" class="action" @click=${browse}}>Browse Teams</a>
        ${!user ? html`
        <a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>` : html`
        <a href="/myteams" class="action">My Teams</a>
        <a href="/" class="action" @click=${removeData}>Logout</a>`}`;

export function updateNav(ctx, next) {
    render(navTemp(ctx.user), nav);

    next();
}