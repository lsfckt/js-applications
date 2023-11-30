function solve() {
    // write get functionality and other tasks

    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const form = document.querySelector('form');
    form.addEventListener('submit', createBook);

    const tbody = document.querySelector('tbody');

    async function createBook(e) {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const title = formData.get('title');
            const author = formData.get('author');

            if (!title || !author) {
                throw new Error('Empty form, please write author and title');
            }

            const createRes = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author,
                    title,
                }),
            });

            const resData = await createRes.json();

            if (!createRes.ok) {
                throw new Error(createRes.status);
            }

            const values = Object.values(resData);

            const tr = document.createElement('tr');
            const id = values[2];
            tr.id = id;


            const td = '';

            values.forEach(td => {
                td = document.createElement('td');
                tr.appendChild(td);
            });

            tr.children[0].textContent = title
            tr.children[1].textContent = author

            const editBtn = document.createElement('button');
            editBtn.id = 'edit';
            editBtn.textContent = 'Edit';

            const deleteBtn = document.createElement('button');
            deleteBtn.id = 'delte';
            deleteBtn.textContent = 'Delete';
            const lastTd = tr.children[2];

            lastTd.append(editBtn, deleteBtn);
            tbody.appendChild(tr);

        } catch (error) {
            alert(error);
        };
    };
    
    function updateBook() {
        const editBtns = document.querySelectorAll('body>table>tbody>tr>td>button');

        editBtns.forEach(currBtn => {
            currBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                let parentEl = e.target.parentElement.parentElement;
                const titleEl = parentEl.children[0];
                const authorEl = parentEl.children[1];
    
                let editTitle = titleEl.textContent;
                let editAuthor = authorEl.textContent;
    
                const h3 = document.querySelector('h3');
                h3.textContent = 'Edit FORM';
                const submitBtn = form[2].textContent = 'Save';
    
                const editRes = await fetch(baseUrl + `/${parentEl.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        editTitle,
                        editAuthor,
                    }),
                });
    
                const editData = await editRes.json();
                console.log(editData);
                titleEl.textContent = editData.title;
                editAuthor.textContent = editData.author;
            });
        });
    }
    updateBook();
    
}
solve();