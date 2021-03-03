import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBzjAV96FeO-K4IWmZO42tupDVGaPGTAZI',
	authDomain: 'react-slack-clone-a9c0a.firebaseapp.com',
	projectId: 'react-slack-clone-a9c0a',
	storageBucket: 'react-slack-clone-a9c0a.appspot.com',
	messagingSenderId: '1057795378626',
	appId: '1:1057795378626:web:40c68af8f125db524fda5b',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
