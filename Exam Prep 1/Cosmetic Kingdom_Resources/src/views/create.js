import { html } from "../../node_modules/lit-html/lit-html.js";
// import page from "../../node_modules/page/page.mjs";

import { endpoints, getData, post } from "../api/api.js";

const createProductsTemp = (addProduct) => html`
        <section id="create">
          <div class="form" @submit=${addProduct}>
            <h2>Add Product</h2>
            <form class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>`;


export async function create(ctx) {
    ctx.render(createProductsTemp(addProduct));

    async function addProduct(e) {
        e.preventDefault();

        const { name, imageUrl, category, description, price } = getData(e.target);

        await post(endpoints.create, { name, imageUrl, category, description, price });

        try {
            ctx.page.redirect('/products');
        } catch (error) {
            alert(error.message);
            throw new Error(error);
        }
    }
}
