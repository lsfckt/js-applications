import { homeView } from './home.js';
import { loginView } from './login.js';
import { signupView } from './signup.js';
import { createView } from './create.js';
import { detailsView } from './details.js';
import { editView } from './edit.js';
import { logout } from './logout.js';
import { updateNav } from './util.js';

const html = {
    navBar: document.querySelector('nav'),

    createButton: document.querySelector('#add-movie-button a'),
}

const routes = {
    '/': homeView,
    '/login': loginView,
    '/register': signupView,
    '/logout': logout,
    '/create': createView,
}

html.navBar.addEventListener('click', onNavigation);
html.createButton.addEventListener('click', onNavigation);

function onNavigation(e) {
    if (e.target.tagName === 'a' && e.target.href) {
        e.preventDefault();

        const href= new URL(e.target.href).pathname;

        const view = routes[href];

        if (typeof view == 'function') {
            view();
        }

        updateNav();
    }
}
// start application from home page
updateNav();
homeView();