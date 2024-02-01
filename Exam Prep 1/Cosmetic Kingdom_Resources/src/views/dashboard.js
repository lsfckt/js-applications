import { html } from "../../node_modules/lit-html/lit-html.js";
import { endpoints, get } from "../api/api.js";

const dashboardProductsTemp = (product) => html`<h2>Products</h2>
        <section id="dashboard">
          ${product.length == 0
        ? html`<h2>No products yet.</h2>`
        : product.map((product) =>
            html`<div class="product">
            <img src=${product.imageUrl} alt="example1" />
            <p class="title">
              ${product.name}
            </p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/details/${product._id}">Details</a>
        </div>`)}
        </section>`;

export async function dashboard(ctx) {
    const productsData = await get(endpoints.products);

    ctx.render(dashboardProductsTemp(productsData));
}

