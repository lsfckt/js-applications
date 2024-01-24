import { html, render } from "../../node_modules/lit-html/node/lit-html.js"
const container = document.querySelector('.container');

const guestUserNavTemp = html`
            <div id="guest">
                <a id="loginLink" href="/login">Login</a>
                <a id="registerLink" href="/register">Register</a>
            </div>
`;

const homeViewTemp = html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src="/images/table.png" />
                    <p>Description here</p>
                    <footer>
                        <p>Price: <span>235 $</span></p>
                    </footer>
                    <div>
                        <a href=”/details” class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>
</div>
`;


export function home() {
    const navBar = document.querySelector('nav');
    render(guestUserNavTemp, navBar);

    container.innerHTML = '';
    render(homeViewTemp, container);
}