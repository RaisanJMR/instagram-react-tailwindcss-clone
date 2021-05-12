import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyAZq3okr1bVZatawy0RcBdu_feBkXaINwE',
  authDomain: 'instagram-react-tailwindcss.firebaseapp.com',
  projectId: 'instagram-react-tailwindcss',
  storageBucket: 'instagram-react-tailwindcss.appspot.com',
  messagingSenderId: '662270598524',
  appId: '1:662270598524:web:e19d30a8cff15ce91618f9',
};
const firebase = Firebase.initializeApp(config);
// console.log(firebase);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);
export { firebase, FieldValue };
