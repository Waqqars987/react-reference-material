import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Setting default config in axios for application-wide usage
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Setting interceptors for axios
axios.interceptors.request.use(
	(request) => {
		console.log('request', request);
		return request; //must always return, otherwise request will be blocked
	},
	(error) => {
		//related to request error
		console.log('error', error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log('response', response);
		return response; //must always return, otherwise response will be blocked
	},
	(error) => {
		//related to response error
		console.log('error', error);
		return Promise.reject(error);
	}
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
