import axios from 'axios';

// Cutom Instance, this config will override the default config
const instance = axios.create({
	baseURL : 'https://jsonplaceholder.typicode.com'
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// We can add interceptors here as well

export default instance;
