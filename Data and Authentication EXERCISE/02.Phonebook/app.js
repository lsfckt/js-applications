function resolve() {

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    function attachEvents() {

        document.getElementById('btnLoad').addEventListener('click', loadFn);
        document.getElementById('btnCreate').addEventListener('click', createFn);

    }
    attachEvents();

    async function loadFn() {

        const phonebook = document.getElementById('phonebook');

        const response = await fetch(baseUrl, { method: 'GET' });
        const data = await response.json();

        Object.values(data).forEach(line => {
            const newLi = document.createElement('li');
            const btnDelete = document.createElement('button');
            // btnDelete.setAttribute('id', 'btnDelete');
            btnDelete.innerText = 'Delete';

            newLi.textContent = `${line.person}:${line.phone}`;
            newLi.appendChild(btnDelete);

            phonebook.appendChild(newLi);

            btnDelete.addEventListener('click', deleteFn);
        });
    }

    async function createFn() {

        const personField = document.getElementById('person');
        const phoneField = document.getElementById('phone');

        const person = personField.value;
        const phone = phoneField.value;

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person,
                phone,
            }),
        });

        const data = await response.json();
        key = data._id;

        personField.value = '';
        phoneField.value = '';

        loadFn();
        return data

    }

    let key;

    async function deleteFn() {
        const deleteUrl = `http://localhost:3030/jsonstore/phonebook/${key}`;

        const response = await fetch(deleteUrl, { 
            method: 'DELETE' ,
            headers: { 'Content-Type': 'application/json'},
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
}

resolve();