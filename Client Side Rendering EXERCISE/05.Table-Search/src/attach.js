import { html } from "../node_modules/lit-html/lit-html.js";

export const dataTemp = (info) => html`
   ${info.map((student) => studentTemp(student))}`;

const studentTemp = (student) => html`
   <tr id=${student._id}>
         <td>${student.firstName} ${student.lastName}</td>
         <td>${student.email}</td>
         <td>${student.course}</td>
      </tr>`;
