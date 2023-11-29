function resolve() {

    const getElements = {
        baseUrl: 'http://localhost:3030/jsonstore/phonebook',
        phonebook: document.getElementById('phonebook'),

        personField: document.getElementById('person'),
        phoneField: document.getElementById('phone'),
    }

    function attachEvents() {

        document.getElementById('btnLoad').addEventListener('click', loadFn);
        document.getElementById('btnCreate').addEventListener('click', createFn);

    }
    attachEvents();

    async function loadFn() {

        getElements.phonebook.innerHTML = '';

        const loadRes = await fetch(getElements.baseUrl, { method: 'GET' });
        const loadData = await loadRes.json();

        Object.values(loadData).forEach(line => {
            const newLi = document.createElement('li');
            const btnDelete = document.createElement('button');
            btnDelete.setAttribute('id', line._id);
            btnDelete.innerText = 'Delete';

            newLi.textContent = `${line.person}: ${line.phone}`;
            newLi.appendChild(btnDelete);

            getElements.phonebook.appendChild(newLi);

            btnDelete.addEventListener('click', deleteFn);
        });
    }

    async function createFn() {

        const person = getElements.personField.value;
        const phone = getElements.phoneField.value;

        const createRes = await fetch(getElements.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person,
                phone,
            }),
        });

        const createData = await createRes.json();

        getElements.personField.value = '';
        getElements.phoneField.value = '';

        getElements.phonebook.innerHTML = '';
        loadFn();
        return createData

    }

    async function deleteFn() {
        const key = this.getAttribute('id');
        const deleteUrl = `http://localhost:3030/jsonstore/phonebook/${key}`;

        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const deleteData = await deleteResponse.json();

        loadFn();
        return deleteData;
    }
}
resolve();