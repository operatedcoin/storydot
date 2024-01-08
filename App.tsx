// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import HomeNavigator from './navigation/HomeNavigator';
import firebase from './firebaseConfig'; // Adjust path as necessary

export default function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // Listen for authentication state to change.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

    return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
}

//   return (
//     <NavigationContainer>
//       {user ? <HomeNavigator /> : <AuthNavigator />}
//     </NavigationContainer>
//   );
// }
