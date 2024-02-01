import { render } from "../../node_modules/lit-html/lit-html.js";

import { navbarTemp } from "../views/navbar.js";


export function navbar(ctx, next) {
    const isAuth = ctx.authData;
    render(navbarTemp(isAuth), document.querySelector('nav'));
    next();
}