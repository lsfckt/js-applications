import { html } from '../../node_modules/lit-html/lit-html.js';
import { fetchGetAllAlbums } from '../services/data.js';

const dashboardTemp = (albums) => html`
<section id="dashboard">
<h2>Albums</h2>
<ul class="card-wrapper">

  ${albums.length > 0
    ? albums.map((a) => html`
<li class="card">
    <img src=${a.imageUrl} alt="pic" />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${a.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${a.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${a.sales}</span></p>
    <a class="details-btn" href="/details/${a._id}">Details</a>
  </li>`)
    :
    html`<h2>There are no albums added yet.</h2>`
  }
</ul>
</section>`;

export async function dashboardPage(ctx) {
  const albums = await fetchGetAllAlbums();

  ctx.render(dashboardTemp(albums));
}