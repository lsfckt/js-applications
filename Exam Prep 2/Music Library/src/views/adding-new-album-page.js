import { html } from '../../node_modules/lit-html/lit-html.js';
import { fetchAddingNewAlbum } from '../services/data.js';
import { getFormData } from '../utils.js';

const newAlbumTemp = (onCreate) => html`
<section id="create">
<div class="form">
  <h2>Add Album</h2>
  <form class="create-form" @submit=${onCreate}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function newAlbumPage(ctx) {
    ctx.render(newAlbumTemp(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        const data = getFormData(e.target);

        if (!data.singer || !data.album || !data.imageUrl || !data.release || !data.label || !data.sales) {
            alert('All fields are required! Please try again.');
            return;
        }

        await fetchAddingNewAlbum(data);
        
        try {
            ctx.page.redirect('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }
}