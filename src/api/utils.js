import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// client for sending REST based requested {post, get, put/patch, delete/destroy}
const client = axios;

export function post(url, data) {
    return client({
        method: 'post',
        url: url,
        data: data,
    });
}

// to parse error(s) caught by axios during any HTTP request
export function parseClientError(error) {
    let parsed = 'Seems like a cog stopped moving.';

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        parsed = error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        parsed = error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        parsed = error.message;
    }

    return parsed;
}
