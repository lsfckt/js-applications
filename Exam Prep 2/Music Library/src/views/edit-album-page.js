import { html } from '../../node_modules/lit-html/lit-html.js';
import { fetchAlbumDetails, fetchEditAlbum } from '../services/data.js';
import { getFormData } from '../utils.js';

const editTemp = (onEdit, album) => html`
<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form class="edit-form" @submit=${onEdit}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${album.singer} />
    <input type="text" name="album" id="album-album" placeholder="Album" value=${album.album} />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${album.imageUrl} />
    <input type="text" name="release" id="album-release" placeholder="Release date" value=${album.release} />
    <input type="text" name="label" id="album-label" placeholder="Label" value=${album.label} />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${album.sales} />

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editPage(ctx) {
    const albumId = ctx.params.id;
    const album = await fetchAlbumDetails(albumId);

    ctx.render(editTemp(onEdit, album));

    async function onEdit(e) {
        e.preventDefault();

        const data = getFormData(e.target);

        if (!data.singer ||
            !data.album ||
            !data.imageUrl ||
            !data.release ||
            !data.label ||
            !data.sales
        ) {
            alert('All fields are required! Please try again.');
            return;
        }

        await fetchEditAlbum(albumId, data);

        try {
            ctx.page.redirect(`/details/${albumId}`);
            

        } catch (error) {
            alert(error.message);
        }
    }

}