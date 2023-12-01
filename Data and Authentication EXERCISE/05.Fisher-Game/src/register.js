const logout = document.getElementById('logout');
logout.style.display = 'none';
const url = 'http://localhost:3030/users/register';

function register() {

    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);

    async function onRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            const rePass = formData.get('rePass');

            if (!email || !password) {
                document.getElementsByName('email')[0].value = '';
                document.getElementsByName('password')[0].value = '';
                document.getElementsByName('rePass')[0].value = '';
                throw new Error('Empty email or passowrd field, please try again');
            } else if (password !== rePass) {
                throw new Error('Repeat password is different, please try again.')
            }

            const regRes = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const regData = await regRes.json();

            if (!regRes.ok) {
                throw new Error(regRes.status, regRes.statusText);
            }

            sessionStorage.setItem('accessToken', regData.accessToken);
            sessionStorage.setItem('email', regData.email);
            sessionStorage.setItem('passowrd', regData.password);

            window.location.href = 'index.html';
        } catch (error) {
            document.querySelector('p').textContent = error;
        }
    }

}
register();