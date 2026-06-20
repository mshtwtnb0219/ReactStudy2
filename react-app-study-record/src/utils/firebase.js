import firebase from 'firebase/app';
import 'firebase/analytics';

const config = {
  apiKey: import.meta.env.VITE_REACT_APP_APP_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export default firebase;