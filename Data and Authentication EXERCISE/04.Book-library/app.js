const state = {};

async function request(url, options) {
    const response = await fetch(url, options);

    if (response.ok === false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();
    return data;
}

async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    state.books = books;
    const bookRows = Object.entries(books).map(createBookRow).join('')
    document.querySelector('tbody').innerHTML = bookRows;

    function createBookRow([id, book]) {
        const result = `
        <tr data-id="${id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>`;

        return result;
    }
}

async function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    event.target.reset();

    getAllBooks();
}

async function updateBook(event) {
    const formData = new FormData(event.target.parentNode);
    const id = formData.get('id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.parentNode.reset();

    getAllBooks();
}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });

    getAllBooks();
}

function start() {
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('createForm').addEventListener('submit', createBook);
    document.querySelector('#editForm [value="Save"]').addEventListener('click', updateBook);
    document.querySelector('#editForm [value="Cancel"]').addEventListener('click', (event) => {
        event.target.parentNode.reset();
        document.getElementById('createForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';
    });
    document.querySelector('table').addEventListener('click', handleTableClick)

    getAllBooks();
}

function handleTableClick(event) {
    // console.log(event.target);
    if (event.target.className === 'editBtn') {
        // console.log('clicked edit');
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';

        const bookId = event.target.parentNode.parentNode.dataset.id;
        loadBookForEditing(bookId);

    } else if (event.target.className === 'deleteBtn') {
        const bookId = event.target.parentNode.parentNode.dataset.id;
        const confirmDelete = confirm('Are you sure you want to delete given book?');
        if (confirmDelete) {
            deleteBook(bookId);
            getAllBooks();
        }
    }
}

async function loadBookForEditing(bookId) {
    const book = state.books[bookId];
    document.querySelector('#editForm [name="id"]').value = bookId;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}

start();