async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    buses.innerHTML = '';

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const arrivesInfo = `Bus ${busId} arrives in ${time} minutes`;

            const li = document.createElement('li');
            li.textContent = arrivesInfo;

            buses.appendChild(li);
        });
    } catch (err) {
        stopName.textContent = 'Error';
    }
}