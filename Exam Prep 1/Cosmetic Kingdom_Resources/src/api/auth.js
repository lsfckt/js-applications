export function getAuth() {
    return JSON.parse(sessionStorage.getItem('user'))
}

export function setData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function deleteData() {
    sessionStorage.removeItem('user');
}



