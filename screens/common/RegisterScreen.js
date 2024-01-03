import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';
import firebase from '../../services/api/firebaseService'; // Adjust the path as necessary

export default function RegisterScreen() { // Rename the function to RegisterScreen
  // State hooks for user email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user sign up
  const handleSignUp = () => {
    // Using Firebase to create a user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
