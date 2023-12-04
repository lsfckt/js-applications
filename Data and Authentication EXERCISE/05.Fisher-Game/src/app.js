const login = document.getElementById('login');
const register = document.getElementById('register');
const user = sessionStorage.getItem('email');
const accessToken = sessionStorage.getItem('accessToken');
const userWelcome = document.querySelector('span');
const logOutBtn = document.getElementById('logout');
const main = document.getElementById('main');

if (accessToken) {
    login.style.display = 'none';
    register.style.display = 'none';
    userWelcome.textContent = user;
} else {
    userWelcome.textContent = 'guest';

    logOutBtn.style.display = 'none';
    login.style.display = 'inline-block';
    register.style.display = 'inline-block';
}

function logOut() {
    const url = 'http://localhost:3030/users/logout';
    logOutBtn.addEventListener('click', onLogOut);

    async function onLogOut() {

        const outRes = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });

        if (outRes.status === 204) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
}
logOut();

function load() {
    const url = 'http://localhost:3030/data/catches';
    const loadBtn = document.querySelector('.load');

    loadBtn.addEventListener('click', loadCatches);

    async function loadCatches(e) {
        e.preventDefault();

        const loadRes = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
        const loadData = await loadRes.json();

        // IMPLEMENTATION HERE
    }
}
load();

function createCatches(el) {
    const div = document.createElement('div');
    div.classList.add('catch');

    div.appendChild(el);
    main.appendChild(div);

    return main;
}

function createLabel(text) {
    const label = document.createElement('label');
    label.textContent = text;

    return label;
}

function createInput(type, newClass, newValue) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.classList.add(newClass);
    input.setAttribute('value', newValue);

    return input;
}

function createButtons(dataId) {
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    updateBtn.classList.add('update');
    deleteBtn.classList.add('delete');

    updateBtn.setAttribute('data-id', dataId);
    deleteBtn.setAttribute('data-id', dataId);

    return {
        updateBtn,
        deleteBtn,
    }
}


