import { newItem } from "./api.js";

export const item = document
    .querySelector('input[type=submit]')
    .addEventListener('click', async (e) => {
        e.preventDefault();

        const inputItem = document.querySelector('#itemText').value;
      
        newItem(inputItem);
    });