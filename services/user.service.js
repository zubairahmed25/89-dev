// import { fetchWrapper } from 'helpers'

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method
            //headers: authHeader(url)
        };
        if (body) {
            //requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(data => data.json());
    }
}

export const userService = {
    register
};


async function register(user) {
    await fetchWrapper.post(`/api/test/register`, user);
}
