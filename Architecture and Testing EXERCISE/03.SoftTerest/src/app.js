import { onHomePage } from "./home.js";
import { register } from "./register.js";
onHomePage();
await register();

const homePage = document.getElementById('home-page');
const registerPage = document.getElementById('reg-page');
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-holder');
const detailsPage = document.getElementById('details-page');
const createPage = document.getElementById('create-page');
const startDiv = document.getElementById('start-div');
const root = document.getElementById('root');

startDiv.remove();
root.replaceChildren(homePage);

export const routes = {
    '/': homePage,
    '/dashboard': dashboardPage,
    '/create': createPage,
    '/logout': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/details': detailsPage,
}

const navBar = document.querySelector('nav').addEventListener('click', onNavigate);

export function onNavigate(e) {
    const target = e.target;

    if (target.tagName === 'A') {
        e.preventDefault();

        const url = new URL(target.href);
        const page = routes[url.pathname];
        
        document.getElementById('root').replaceChildren(page);
    }
}