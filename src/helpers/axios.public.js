import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Custom-Header': 'iteaHello'
    }
});

export default instance;