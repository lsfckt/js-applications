const login = document.getElementById('login');
const register = document.getElementById('register');
const user = sessionStorage.getItem('email');
const accessToken = sessionStorage.getItem('accessToken');
const userWelcome = document.querySelector('span');
const logOutBtn = document.getElementById('logout');
const divCatches = document.getElementById('catches');
divCatches.innerHTML = '';
const addBtn = document.getElementsByClassName('add')[0];
addBtn.addEventListener('click', newCatch);

const loadBtn = document.querySelector('.load');
loadBtn.addEventListener('click', onLoad);

function validation() {

    if (accessToken) {
        login.style.display = 'none';
        register.style.display = 'none';
        userWelcome.textContent = user;
        addBtn.disabled = false;

    } else {
        userWelcome.textContent = 'guest';
        logOutBtn.style.display = 'none';
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
        addBtn.disabled = true;
    }
}
validation();

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

async function onLoad(e) {

    divCatches.innerHTML = '';

    const loadRes = await fetch('http://localhost:3030/data/catches', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
    });
    const loadData = await loadRes.json();

    const fieldsetMain = document.getElementById('main');

    loadData.forEach(element => {
        const div = createDivs();
        divCatches.appendChild(div);

        const angler = createLabel('Angler');
        const anglerInput = createInput('text', 'angler', element.angler);
        const weight = createLabel('Weight');
        const weightInput = createInput('text', 'weight', element.weight);
        const species = createLabel('Species');
        const speciesInput = createInput('text', 'species', element.species);
        const location = createLabel('Location');
        const locationInput = createInput('text', 'location', element.location);
        const bait = createLabel('Bait');
        const baitInput = createInput('text', 'bait', element.bait);
        const captureTime = createLabel('Capture Time');
        const captureTimeInput = createInput('number', 'captureTime', element.captureTime);

        const updt = updateButton(element._id);
        const dlt = deleteButton(element._id);

        div.append(angler, anglerInput, weight, weightInput, species, speciesInput, location, locationInput, bait, baitInput, captureTime, captureTimeInput, updt, dlt);
    
        updt.addEventListener('click', onUpdate);
        dlt.addEventListener('click', onDelete);
    });

    fieldsetMain.appendChild(divCatches);
}

function createDivs() {
    const catchDiv = document.createElement('div');
    catchDiv.classList.add('catch');

    return catchDiv;
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

function updateButton(dataId) {

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.classList.add('update');
    updateBtn.setAttribute('data-id', dataId);

    if (sessionStorage.getItem('ownerId')) {
        updateBtn.disabled = false;
    } else {
        updateBtn.disabled = true;
    }

    return updateBtn;

}

function deleteButton(dataId) {

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('data-id', dataId);

    if (sessionStorage.getItem('ownerId')) {
        deleteBtn.disabled = false;
    } else {
        deleteBtn.disabled = true;
    }

    return deleteBtn;
}

async function newCatch(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    const catchRes = await fetch('http://localhost:3030/data/catches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            angler,
            weight,
            species,
            location,
            bait,
            captureTime,
        }),
    });

    const catchData = await catchRes.json();

    sessionStorage.setItem('ownerId', catchData._ownerId);

    Array.from(form).forEach(element => {
        element.value = '';
    });
}

async function onUpdate(e) {

    const id = e.target.getAttribute('data-id');
    const catchUpd = e.target.parentElement;
    const childrens = catchUpd.children;

    const data = [];
    for (let i = 1; i < 12; i += 2) {
        data.push(childrens[i].value);

    }

    const [angler, weight, species, location, bait, captureTime] = [...data];

    const updateRes = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            angler,
            weight,
            species,
            location,
            bait,
            captureTime,
        }),
    });

    const dataUpdate = await updateRes.json();

    return dataUpdate;
}

async function onDelete(e) {

    const id = e.target.getAttribute('data-id');

    const deleteRes = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
    });

    onLoad();
}
