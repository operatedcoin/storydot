// screens/common/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConfig'; // Adjust path as necessary

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // Navigate to Home Screen or handle login
      })
      .catch(error => console.log(error.message));
  };

  const navigateToRegister = () => {
    // Use the navigate function with the name of the route you want to move to
    navigation.navigate('Register');
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
      <Button title="Log In" onPress={handleLogin} />

      {/* Add a text link or button to navigate to the Register Screen */}
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  registerLink: {
    marginTop: 15,
    color: 'blue', // Feel free to change the color
    textAlign: 'center'
  }
});

export default LoginScreen;
