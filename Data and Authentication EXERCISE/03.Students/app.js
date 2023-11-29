function solve() {
    
    const DICTIONARY = {
        url: 'http://localhost:3030/jsonstore/collections/students',
        tbody: document.querySelector('#results tbody'),
        form: document.getElementById('form'),

    }

    function createHTML(type) {
        const newEl = document.createElement(type);
        return newEl;
    }

    async function extract() {
        try {
            const extractRes = await fetch(DICTIONARY.url, { method: 'GET' });
            const extractData = await extractRes.json();

            if (!extractRes.ok) {
                throw new Error(extractRes.status);
            }
            Object.entries(extractData).forEach(element => {

                const tr = createHTML('tr');

                let counter = 0;
                Object.values(element[1]).forEach(el => {
                    counter++;

                    if (counter % 5 !== 0) {
                        const td = createHTML('td');
                        td.textContent = el;
                        tr.appendChild(td);
                    }
                });

                DICTIONARY.tbody.appendChild(tr);
            });
        } catch (error) {
            console.log(error);
        }

    }
    extract();

    function newStudent() {
        try {
            DICTIONARY.form.addEventListener('submit', async (e) => {

                const formData = new FormData(DICTIONARY.form);

                const firstName = formData.get('firstName');
                const lastName = formData.get('lastName');
                const facultyNumber = formData.get('facultyNumber');
                const grade = formData.get('grade');

                const studentRes = await fetch(DICTIONARY.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        facultyNumber,
                        grade,
                    }),
                });

                const studentData = await studentRes.json();
                 
                if(!studentRes.ok) {
                    throw new Error(studentRes.status);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    newStudent();
}
solve();