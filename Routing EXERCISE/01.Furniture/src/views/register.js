import { html, render } from "../../node_modules/lit-html/node/lit-html.js";
import { post } from '../api.js';
import { endpoints } from '../app.js';
import page from '../../node_modules/page/page.mjs';
import { home } from "./home.js";

const navBar = document.querySelector('nav');
const containerDiv = document.querySelector('.container');

const regNavBar = html`
            <div id="guest">
                <a id="loginLink" href="/login">Login</a>
                <a id="registerLink" href="/register" class="active">Register</a>
            </div>
`;

const regViewTemp = html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" @click=${onReg}/>
                </div>
            </div>
        </form>
    </div>`;

export function register(ctx) {
    console.log('register');

    render(regNavBar, navBar);
    render(regViewTemp, containerDiv)
}

export function onReg(e) {
    e.preventDefault();

    const form = e.target.closest('form');
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email && password && rePass && password === rePass) {
        
        post(endpoints.reg, { email, password });

        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
    
        page.redirect('/');

    } else {
        return;
    }
}