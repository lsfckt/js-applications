import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { del, endpoints, get } from "../api/api.js";

const detailsTemp = (product, user) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${product.imageUrl} alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>

            <!--Edit and Delete are only for creator-->
            ${user && user._id === product._ownerId ? html`
            <div id="action-buttons">
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${() => onDelete(product._id)}>Delete</a>` : nothing}

              <!--Bonus - Only for logged-in users ( not authors )-->
              <!-- <a href="" id="buy-btn">Buy</a> -->
            </div>
          </div>
        </section>`;

export async function details(ctx) {
  const productId = ctx.params.id;
  const product = await get(endpoints.details + productId);
  const user = ctx.authData;

  ctx.render(detailsTemp(product, user));
}

async function onDelete(id) {

  const isConfirm = confirm('Are you sure want to delete the product?');

  if (isConfirm) {
    await del(endpoints.delete + id);

    try {
      page.redirect('/products');
    } catch (error) {
      alert(error.message);
    }
  }
}









