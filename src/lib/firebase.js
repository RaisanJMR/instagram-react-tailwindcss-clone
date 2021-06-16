import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA83pvlDB33IM8D52zKPwIB_JIcIssXFoM",
  authDomain: "instagram-clone-react-tailwind.firebaseapp.com",
  projectId: "instagram-clone-react-tailwind",
  storageBucket: "instagram-clone-react-tailwind.appspot.com",
  messagingSenderId: "426482873307",
  appId: "1:426482873307:web:2ebfab3107bcbc08e4adfe",
  measurementId: "G-F80YG7W2XQ"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
