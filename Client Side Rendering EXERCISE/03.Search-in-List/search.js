import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from "./towns.js";

// function search() {

// }

const townsDiv = document.getElementById('#towns');
const townsTemp = html`
<ul>
   ${towns.map((town) => html`<li>${town}</li>`)};
</ul>`;

render(townsTemp, townsDiv);
