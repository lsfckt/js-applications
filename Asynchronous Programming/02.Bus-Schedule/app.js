function solve() {

    // get elements
    const info = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arrivetBtn = document.getElementById('arrive');

    //initialize
    const url = `http://localhost:3030/jsonstore/bus/schedule/`;

    let nextStopId = 'depot';
    let stopName = '';

    async function depart() {
        
        try {
            // fetch 
            const resposne = await fetch(url + nextStopId);
            const data = await resposne.json();

            //validate response
            if (!resposne.ok) {
                throw new Error(resposne.status);
            }

            //get data
            nextStopId = data.next;
            stopName = data.name;

            //change content
            info.textContent = `Next stop ${stopName}`;

            departBtn.disabled = true;
            arrivetBtn.disabled = false;

        } catch (err) {
            info.textContent = 'Error';

            departBtn.disabled = true;
            arrivetBtn.disabled = true;
        }

    }

    function arrive() {
        info.textContent = `Arriving at ${stopName}`;

        departBtn.disabled = false;
        arrivetBtn.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();