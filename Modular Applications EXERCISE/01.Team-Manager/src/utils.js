import { render } from "../node_modules/lit-html/lit-html.js";

import { navTemp } from "./app.js";
import { browseTeamTemp } from "./views/browse-teams.js";
import { homeTemp } from "./views/home.js";

const nav = document.querySelector('nav');
const main = document.querySelector('main');

export function userData() {
    if (sessionStorage.getItem('accessToken')) {
        return {
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password'),
            accessToken: sessionStorage.getItem('accessToken'),
            id: sessionStorage.getItem('_id'),
        }
    }
    return null;
}

export function session(ctx, next) {
    const user = userData();
    
    if(user) {
        ctx.user = user;
    }

    next();
}

export function updateNav(ctx, next) {
    render(navTemp(ctx.user), nav);

    next();
}

export function home(ctx, next) {
    render(homeTemp(ctx.user), main);

}
export function browse(ctx, next) {
    render(browseTeamTemp(ctx.user), main);

}