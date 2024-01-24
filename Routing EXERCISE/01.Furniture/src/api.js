const host = 'http://localhost:3030';

async function request(method, endpoint, bodyData) {
    const options = {
        method,
        headers: {}
    };
    
    if (bodyData !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(bodyData);
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + endpoint, options);

        if (!response.ok) {
            throw new Error(response.status, response.statusText);
        }

        return response.json();

    } catch (error) {
        alert(error);
        throw error;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');