import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { fetchAlbumDetails, fetchDeleteAlbum } from '../services/data.js';

const detailsTemp = (album, ownerId, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">0</span></div>


    <div id="action-buttons">
    ${ownerId === album._ownerId
        ? html`
        <a href="" id="like-btn">Like</a>
        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a href="" id="delete-btn" @click=${onDelete}>Delete</a>`
        : nothing}
    </div>


</div>
</section>`;

export async function detailsPage(ctx) {
    const albumId = ctx.params.id;
    const ownerId = ctx.user._id;

    const album = await fetchAlbumDetails(albumId);

    ctx.render(detailsTemp(album, ownerId, onDelete));

    async function onDelete(e) {
        e.preventDefault();

        await fetchDeleteAlbum(albumId);

        try {
            ctx.page.redirect('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }

}