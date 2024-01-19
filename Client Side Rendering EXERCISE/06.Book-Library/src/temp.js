import { html } from "../node_modules/lit-html/lit-html.js";
import { loadBooks, createBook, updateForm, updateBook } from "./app.js";

const loadBooksBtnTemp = html`<button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>`;

const tableInitTemp = html`
<table>
    <thead>
    </thead>
    <tbody>
    </tbody>
</table>`;

const addFormTemp = html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit" @click=${createBook}>
    </form>
`;

export const editFormTemp = html`
    <form id="edit-form" style="display: none;">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save" @click=${updateBook}>
    </form>
`;
export const initTemp = html`${loadBooksBtnTemp}${tableInitTemp}${addFormTemp}${editFormTemp}`;

export const theadTemp = html`
<th>Title</th>
<th>Author</th>
<th>Action</th>
`;

export const tbodyTemp = (data) => html`
<tr id=${data[0]}>
    <td>${data[1].title}</td>
    <td>${data[1].author}</td>
    <td>
        <button @click=${updateForm}>Edit</button>
        <button>Delete</button>
    </td>
</tr>    
`;

