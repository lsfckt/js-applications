function loadCommits() {

    const usernameField = document.getElementById('username');
    const repoField = document.getElementById('repo');
    const ul = document.getElementById('commits');

    const usernameValue = usernameField.value;
    const repoValue = repoField.value;

    const url = 'https://api.github.com/repos';

    fetch(url + '/' + usernameValue + '/' + repoValue + '/commits', {
        method: 'GET'
    })
    .then((res) => {

        if (res.status == 200) {
            return res.json();
        } else {

            throw new Error(res.status);
        }
    })
    .then((data) => {

        data.forEach(element => {
            const listItem = document.createElement('li');
            listItem.textContent = element.commit.message;

            ul.appendChild(listItem);

        });
    })

}