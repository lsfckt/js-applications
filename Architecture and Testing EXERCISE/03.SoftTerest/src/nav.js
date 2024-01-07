import { routes } from "./app.js";
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