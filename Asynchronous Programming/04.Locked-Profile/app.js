async function lockedProfile() {
    // initialize
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const main = document.getElementById('main');
    const profilesCard = document.querySelector('.profile');
    profilesCard.remove();

    let divClassUserName = '';
    let radioButtons = '';
    // fetch
    const response = await fetch(url);
    const data = await response.json();

    // create a profile card
    let counter = 0;
    const entries = Object.entries(data).forEach(element => {
        counter++;
        const currUser = element[1];

        const username = currUser.username;
        const email = currUser.email;
        const age = currUser.age;

        const clonedCard = profilesCard.cloneNode(true);

        // set attribute names;
        radioButtons = clonedCard.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.name = `user${counter}Locked`;
        });

        const usernameInputNames = clonedCard.querySelectorAll("input[name='user1Username']");
        usernameInputNames[0].name = `user${counter}Username`;
        usernameInputNames[0].value = username;

        divClassUserName = clonedCard.getElementsByClassName('user1Username')[0];
        divClassUserName.classList.remove();
        divClassUserName.classList.add(`user${counter}Username`);
        divClassUserName.style.display = 'none';

        const emailInputNames = clonedCard.querySelectorAll("input[name='user1Email']");
        emailInputNames[0].name = `user${counter}Email`;
        emailInputNames[0].value = email;

        const ageInputNames = clonedCard.querySelectorAll("input[name='user1Age']");
        ageInputNames[0].name = `user${counter}Age`;
        ageInputNames[0].value = age;

        main.appendChild(clonedCard);

    });

    // show more
    const profiles = document.querySelectorAll('.profile');

    profiles.forEach(profile => {
        const button = profile.querySelector('button');
        button.addEventListener('click', function (e) {

            const radio = profile.querySelectorAll("input[type='radio']");

            if (radio[0].checked) {
                return;
            }

            const hideDiv = profile.querySelector("div[style='display: none;']");
            const showDiv = profile.querySelector("div[style='display: block;']");

            if (e.target.textContent === 'Show more') {
                hideDiv.style.display = 'block';
                button.textContent = 'Hide it';
            } else {
                showDiv.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    });
}