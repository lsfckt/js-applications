const host = 'http://localhost:3030';

async function request(method, url, id, bodyData) {

    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    }

    if (bodyData) {
        options.body = JSON.stringify(bodyData);
    }

    try {
        const response = await fetch(host + url + id, options);

        if (!response.ok) {
            throw new Error(response.status, response.statusText);
        }

        return await response.json();
    } catch (error) {
        alert(error);
        throw error;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');