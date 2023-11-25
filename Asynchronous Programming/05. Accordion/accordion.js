async function solution() {

    let data;

    try {
        const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

        const response = await fetch(baseUrl);
        data = await response.json();

    } catch (error) {
        throw new Error('Error');

    }


    function createDOMThree() {

        data.forEach(element => {
            const main = document.getElementById('main');

            const firstDiv = createHTML('div', 'accordion');
            const divHead = createHTML('div', 'head');
            const span = createHTML('span', '', '', '', element.title);
            const button = createHTML('button', 'button', 'id', element._id, 'More');
            const extraDiv = createHTML('div', 'extra');
            const p = createHTML('p', '', '', '', '');

            main.appendChild(firstDiv);
            firstDiv.append(divHead, extraDiv);
            divHead.append(span, button);
            extraDiv.appendChild(p);

        });

    }

    function createHTML(...params) {
        const [type, newClass, newId, valueId, text] = params;
        // const [newClass, id, valueId] = attribute;

        const myElement = document.createElement(type);

        newClass ? myElement.classList.add(newClass) : '';
        newId ? myElement.setAttribute(newId, valueId) : '';

        text ? myElement.textContent = text : '';

        return myElement;
    }

    function btnsListener() {
        const moreButtones = document.querySelectorAll('button');

        moreButtones.forEach(btn => {
            btn.addEventListener('click', show);
        });
    }

    async function show(e) {

        const targ = e.target;
        const id = targ.id;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const targetParent = targ.parentNode;
        const hiddenDiv = targetParent.nextSibling;

        let showData;
        try {
            const showRes = await fetch(url);
            showData = await showRes.json();
        } catch (error) {
            throw new Error('Error');
        }
        const values = Object.values(showData);
        const content = values[2];

        if (targ.textContent === 'More' && id) {
            hiddenDiv.children[0].textContent = content;
            hiddenDiv.style.display = 'block';
            targ.textContent = 'Less';

        } else {
            hiddenDiv.style.display = 'none';
            targ.textContent = 'More';
        }
    }

    createDOMThree();
    btnsListener();
}

solution();