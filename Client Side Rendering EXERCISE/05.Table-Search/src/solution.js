import { render } from "../node_modules/lit-html/lit-html.js";
import { get } from "./api.js";
import { onClick } from "./search.js";
onClick();
import { dataTemp } from "./attach.js";

const tbody = document.querySelector('tbody');

const data = await get();
render(dataTemp(data), tbody);



