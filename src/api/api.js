import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

API.defaults.headers.common['X-Browser-ID'] =
    localStorage.getItem('browser_id') ||
    (() => {
        const id = crypto.randomUUID();
        localStorage.setItem('browser_id', id);
        return id;
    })();

export default API;