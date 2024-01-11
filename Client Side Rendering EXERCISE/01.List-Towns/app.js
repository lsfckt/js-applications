import { html, render } from './node_modules/lit-html/lit-html.js';

const btn = document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault();

    const input = document
        .getElementById('towns')
        .value;

        const towns = input.split(', ');

    const template = html`
        <ul>
            ${towns.map((town) => html`<li>${town}</li>`)};
        </ul>
`;
    const root = document.getElementById('root');

    render(template, root);
});

