import { html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import * as utils from './utils.js';

export const navTemp = (user) => html`
        <a href="/browse" class="action" @click=${utils.browse}}>Browse Teams</a>
        ${!user ? html`
        <a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>` : html`
        <a href="/myteams" class="action">My Teams</a>
        <a href="/" class="action">Logout</a>`}`;


page(utils.session);
page(utils.updateNav);

page('/', utils.home)
page('/browse', utils.browse);
page.start();