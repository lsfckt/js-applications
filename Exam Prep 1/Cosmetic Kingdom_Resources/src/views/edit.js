import { html } from "../../node_modules/lit-html/lit-html.js";
// import page from "../../node_modules/page/page.mjs";

import { endpoints, getData, put } from "../api/api.js";


const editTemp = (editProduct) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${editProduct}>
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
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;


export async function edit(ctx) {
    ctx.render(editTemp(editProduct));

    async function editProduct(e) {
        e.preventDefault();

        const editedId = ctx.params.id;

        const {
            name,
            imageUrl,
            category,
            description,
            price
        } = getData(e.target);

        try {
            if (!name || !imageUrl || !category || !description || !price) {
                throw new Error('All fields are required!');
            }

            await put(endpoints.edit + editedId, { name, imageUrl, category, description, price });

            const route = `/details/${editedId}`;
            
            ctx.page.redirect(route);
            
        } catch (error) {
            alert(error.message);
            throw new Error(error);
        }
    }
}


