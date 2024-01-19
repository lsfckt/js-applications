import { render } from "../node_modules/lit-html/lit-html.js";
import { initTemp, theadTemp, tbodyTemp, editFormTemp } from "./temp.js";
import { get, post, put } from "./api.js";
import { getFormData } from "./utils.js";


const baseUrl = '/jsonstore/collections/books';

export const body = document.querySelector('body');
render(initTemp, body);

const thead = document.querySelector('thead');
render(theadTemp, thead);

export async function loadBooks() {

    const booksData = await get(baseUrl, '', '');
    const tbody = document.querySelector('tbody');

    const temp = Object.entries(booksData).map(tbodyTemp);
    render(temp, tbody);
}

export async function createBook(e) {
    e.preventDefault();

    const data = getFormData('add-form');
    post(baseUrl, '', data);

    loadBooks();
}

export function updateForm(e) {
    const addForm = document.getElementById('add-form');
    const editForm = document.getElementById('edit-form');

    addForm.style.display = 'none';
    editForm.style.display = 'block';

    const id = e.target.parentElement.parentElement.id;
    return id;
}

export async function updateBook(e) {
    e.preventDefault();

    const data = getFormData('edit-form');
    put(baseUrl, updateForm.id, data);

    loadBooks();
}