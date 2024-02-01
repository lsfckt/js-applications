import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../api/api.js";
import page from "../../node_modules/page/page.mjs";
import { handler } from "../utils.js";

let err = '';

export const createTemp = (onCreate) => html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form id="create-form" class="main-form pad-large" @submit=${onCreate}>
                ${err.length > 0 ? html`<div class="error">${err}</div>` : nothing}
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>`;


export function create(ctx) {
    ctx.render(createTemp(handler(onCreate)));


    async function onCreate({ name, logoUrl, description }) {

        try {
            if (name.length < 4) {
                throw new Error('Name must be at least 4 characters!')
            }

            if (description.length < 10) {
                throw new Error('Name must be at least 10 characters!');
            }

            const result = await post('/data/teams', { name, logoUrl, description });
            console.log(result);

            page('/browse');
        } catch (error) {
            err = error.message;
            create();
        }
    }
}