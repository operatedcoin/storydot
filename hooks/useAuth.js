// hooks/useAuth.js
import { useState } from 'react';
import firebase from '../firebaseConfig'; // Adjust the path as necessary

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const signUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser(null);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return { user, error, signIn, signUp, signOut };
};
