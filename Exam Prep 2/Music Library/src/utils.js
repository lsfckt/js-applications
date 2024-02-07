export function getFormData(target) {

    const formData = new FormData(target);
    const data = Object.fromEntries(formData);

    return data;
}

export function setUser(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function delUser() {
    sessionStorage.removeItem('user');
}