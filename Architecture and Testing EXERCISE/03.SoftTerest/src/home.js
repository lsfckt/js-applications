
export function onHomePage() {
    const user = localStorage.getItem('accssesToken');

    const dashNav = document.getElementById('dash-nav');
    const createNav = document.getElementById('create-nav');
    const logoutNav = document.getElementById('logout-nav');
    const loginNav = document.getElementById('login-nav');
    const regNav = document.getElementById('reg-nav');


    if (user) {
        regNav.style.display = 'none';
        loginNav.style.display = 'none';

        createNav.style.display = 'inline-block';
        logoutNav.style.display = 'inline-block';
    } else {
        regNav.style.display = 'inline-block';
        loginNav.style.display = 'inline-block';

        createNav.style.display = 'none';
        logoutNav.style.display = 'none';
    }
}