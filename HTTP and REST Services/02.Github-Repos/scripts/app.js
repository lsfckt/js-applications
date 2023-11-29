function loadRepos() {
	const username = document.getElementById('username').value;
	const ul = document.getElementById('repos');

	const url = `https://api.github.com/users/${username}/repos`;

	ul.innerHTML = '';

	fetch(url)
	.then((res) => {

		if(!res.ok) {
			throw new Error(res.status);
		} 

		return res.json();
	})
	.then((data) => {
		data.forEach(element => {
			const li = document.createElement('li');
			const a = document.createElement('a');

			a.href = element.html_url;
			a.textContent = element.full_name;

			li.appendChild(a);
			ul.appendChild(li);
		});
	})
	.catch(err => {
		const errorItem = document.createElement('li');
		errorItem.textContent = `Error: ${err.message}`;
		ul.appendChild(errorItem);
	});

}