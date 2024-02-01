import { render } from "../node_modules/lit-html/lit-html.js";

export function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    }

    next();
}

export function userData() {
    if (sessionStorage.getItem('accessToken')) {
        return {
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('email'),
            accessToken: sessionStorage.getItem('accessToken'),
            id: sessionStorage.getItem('_id'),
        }
    }
    return null;
}

export function setData(data) {
    return {
        username: sessionStorage.setItem('username', data.username),
        email: sessionStorage.setItem('email', data.email),
        accessToken: sessionStorage.setItem('accessToken', data.accessToken),
        id: sessionStorage.setItem('_id', data._id),
    }
}

export function removeData() {

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('_id');

}

export function session(ctx, next) {
    const user = userData();

    if (user) {
        ctx.user = user;
    }

    next();
}

export function handler(callback) {
    return function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (data.password && data.repass) {
            if (data.password !== data.repass) {
                throw new Error('Passwords must matches!');
            }
        }

        callback(data);
    }
}












