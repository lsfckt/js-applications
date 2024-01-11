import { item } from "./utils.js";
import { addItem } from "./dropdown.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

export async function getItems() {
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();

    const values = Object.values(data)
    return values;
}


export async function newItem(town) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: town })
    }

    const res = await fetch(url, options);
    const data = await res.json();

    try {
        if (!res.ok) {
            const error = res.statusText;
            throw new Error(error);
        }

        addItem();

        return data;
    } catch (error) {
        alert(error.message);
    }
}