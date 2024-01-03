// firebaseConfig.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzG9IAvjtn8JjBHHcrRlQeH6pkEujNn7g",
  authDomain: "storydotdemo.firebaseapp.com",
  projectId: "storydotdemo",
  storageBucket: "storydotdemo.appspot.com",
  messagingSenderId: "30801786404",
  appId: "1:30801786404:ios:03ac2171ab282c73bdcab1"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the auth module and Firebase instance
export default firebase;