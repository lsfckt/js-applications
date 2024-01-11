import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from "./catSeeder.js";

const section = document.getElementById('allCats');

const template = (data) => html`
       <li>
            <img src=${`./images/${data.imageLocation}.jpg`} width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${statusCode}>Show status code</button>
                <div class="status" style="display: none" id=${data.id}>
                    <h4>Status Code: ${data.statusCode}</h4>
                    <p>${data.statusMessage}</p>
                </div>
            </div>
        </li>

`;

const catsTemplate = cats.map(template);
render(catsTemplate, section);

function statusCode(e) {

    const statusDiv = e.target.nextElementSibling;

    if (statusDiv.style.display === 'none') {
        statusDiv.style.display = 'block';
    } else {
        statusDiv.style.display = 'none';
    }
}