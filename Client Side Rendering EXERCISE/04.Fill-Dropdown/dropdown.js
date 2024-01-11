import { html, render } from './node_modules/lit-html/lit-html.js';
import { getItems } from './api.js';

const select = document.querySelector('#menu');

export async function addItem() {
    const get = await getItems();

    const temp = html`
        ${get.map((item) => 
        html`<option value=${item._id}>${item.text}</option>`)}`;

    render(temp, select);
}

addItem();

