import { contacts } from "./contacts.js";
import { html, render } from './node_modules/lit-html/lit-html.js';

const initCard = (user) =>
    html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${user.name}</h2>
        <button class="detailsBtn" @click=${toggle.bind(user)}>Details</button>
        ${user.showDetails ? html`<div class="details" id=${user.id}>
            <p>Phone number: ${user.phoneNumber}</p>
            <p>Email: ${user.email}</p>
        </div>` : null
        }
    </div>
</div > `;

const root = document.querySelector('#contacts');
update();

function update() {
    render(contacts.map(initCard), root);
}

function toggle() {
    this.showDetails = !this.showDetails;
    update();
}




