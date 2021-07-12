import firebase from 'firebase';

const config = {
	projectId: process.env.REACT_APP_PROJECT_ID,
	apiKey: process.env.REACT_APP_API_KEY,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
};

firebase.initializeApp(config);

export default firebase;
