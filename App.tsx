import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebaseConfig'; // Adjust the path as necessary

// Import your screens
import LoginScreen from './screens/common/LoginScreen';
import RegisterScreen from './screens/common/RegisterScreen';
import HomeScreen from './screens/common/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // Listen for authentication state to change.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // No user is signed in
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
