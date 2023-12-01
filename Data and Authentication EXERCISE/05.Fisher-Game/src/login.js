function login() {
    const url = 'http://localhost:3030/users/login';
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);

    async function onLogin(e) {
        e.preventDefault();

        try {
            const formData = new FormData(form);
            let email = formData.get('email');
            let password = formData.get('password');

            if (!email || !password) {
                document.getElementsByName('email')[0].value = '';
                document.getElementsByName('password')[0].value = '';

                throw new Error('Invalid email or password');
            }

            const logRes = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const logData = await logRes.json();

            if (!logRes.ok) {
                throw new Error(`${logRes.status}: ${logRes.statusText}`);
            }

            sessionStorage.setItem('accessToken', logData.accessToken);
            sessionStorage.setItem('email', logData.email);
            sessionStorage.setItem('password', logData.password);

            window.location.href = 'index.html';
        } catch (error) {
            document.querySelector('p').textContent = error;
        }
    }
}
login();