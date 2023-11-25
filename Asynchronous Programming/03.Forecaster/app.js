function attachEvents() {
    // symbols

    const SUNNY = '&#x2600';        // ☀
    const PARTLY_SUNNY = '&#x26C5'; // ⛅
    const OVERCAST = '&#x2601';     // ☁
    const RAIN = '&#x2614';         // ☂
    const DEGREES = '&#176';        // °

    //get elements
    const submitBtn = document.getElementById('submit');
    const locationField = document.getElementById('location');
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');
    const body = document.getElementsByTagName('body')[0];

    let locationCode = '';

    const baseUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
    const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

    submitBtn.addEventListener('click', async () => {

        //create and validate current and upcoming div
        try {

            if (body.children[3]) {
                body.children[3].remove();
            }

            if (currentDiv.querySelector('.forecasts')) {
                const secChild = currentDiv.children[1];
                currentDiv.removeChild(secChild);

                const upcomingSecChild = upcomingDiv.children[1];
                upcomingDiv.removeChild(upcomingSecChild);
            }

            const forecasts = document.createElement('div');
            forecasts.classList.add('forecasts');
            currentDiv.appendChild(forecasts);

            const forecastsInfo = document.createElement('div');
            forecastsInfo.classList.add('forecast-info');
            upcomingDiv.appendChild(forecastsInfo);

            const locationValue = locationField.value;

            const locations = await getInfo(baseUrl);

            // find code
            const { code } = locations.find(predicate => predicate.name === locationValue);
            locationCode = code;

            // fetch TODAY
            const today = await fetch(todayUrl);
            const todayData = await today.json();

            // get info
            const cityInfo = todayData[code];
            const todayCondition = cityInfo.forecast.condition;
            const todayLowTemp = cityInfo.forecast.low;
            const todayHighTemp = cityInfo.forecast.high;
            const locName = cityInfo.name;

            if (locName === undefined) {
                throw new Error();
            }

            // create current day
            forecastDiv.style.display = 'block';

            const symbolSpan = document.createElement('span');
            symbolSpan.classList.add('symbol');

            if (todayCondition === 'Sunny') {
                symbolSpan.innerHTML = SUNNY;
            } else if (todayCondition === 'Partly sunny') {
                symbolSpan.innerHTML = PARTLY_SUNNY;
            } else if (todayCondition === 'Overcast') {
                symbolSpan.innerHTML = OVERCAST;
            } else {
                symbolSpan.innerHTML = RAIN;
            }

            const conditionSpan = document.createElement('span');
            conditionSpan.classList.add('condition');

            forecasts.append(symbolSpan, conditionSpan);

            const cityData = document.createElement('span');
            cityData.classList.add('forecast-data');
            cityData.textContent = locName;

            const degreesData = document.createElement('span');
            degreesData.classList.add('forecast-data');
            degreesData.innerHTML = `${todayLowTemp}${DEGREES}/${todayHighTemp}${DEGREES}`;

            const conditionData = document.createElement('span');
            conditionData.classList.add('forecast-data');
            conditionData.textContent = todayCondition;

            conditionSpan.append(cityData, degreesData, conditionData);

            locationField.value = '';

            // fetch 3 DAYS
            const upcomingRes = await fetch(upcomingUrl);
            const upcomingData = await upcomingRes.json();

            // get info
            const upcomingInfo = upcomingData[code];

            // create upcoming days
            const values = Object.values(upcomingInfo.forecast);

            values.forEach(element => {

                const upcomingCondition = element.condition;
                const upcomingLowTemp = element.low;
                const upcomingHighTemp = element.high;

                const symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol');

                if (upcomingCondition === 'Sunny') {
                    symbolSpan.innerHTML = SUNNY;
                } else if (upcomingCondition === 'Partly sunny') {
                    symbolSpan.innerHTML = PARTLY_SUNNY;
                } else if (upcomingCondition === 'Overcast') {
                    symbolSpan.innerHTML = OVERCAST;
                } else {
                    symbolSpan.innerHTML = RAIN;
                }

                const upcomingSpan = document.createElement('span');
                upcomingSpan.classList.add('upcoming');

                forecastsInfo.append(upcomingSpan);

                const degreesData = document.createElement('span');
                degreesData.classList.add('forecast-data');
                degreesData.innerHTML = `${upcomingLowTemp}${DEGREES}/${upcomingHighTemp}${DEGREES}`;

                const conditionData = document.createElement('span');
                conditionData.classList.add('forecast-data');
                conditionData.textContent = upcomingCondition;

                upcomingSpan.append(symbolSpan, degreesData, conditionData);

            });
        } catch (error) {

            const child = body.children[3];

            if (child) {
                child.remove();
            }
            const forecast = document.getElementById('forecast');
            forecast.style.display = 'none';

            const errDiv = document.createElement('div');
            errDiv.textContent = 'Error'
            errDiv.classList.add('err');

            body.appendChild(errDiv);

        }


    });

    async function getInfo(baseUrl) {
        try {
            const response = await fetch(baseUrl);
            const data = response.json();

            if (response.status !== 200 || typeof data !== 'object') {
                throw new Error();
            }
            return data;
        } catch (err) {


            const child = body.children[3];

            if (child) {
                child.remove();
            }
            const forecast = document.getElementById('forecast');
            forecast.style.display = 'none';

            const errDiv = document.createElement('div');
            errDiv.textContent = 'Error'
            errDiv.classList.add('err');

            body.appendChild(errDiv);
        }
    }

}

attachEvents();