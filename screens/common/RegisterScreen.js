// screens/common/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signUp } = useAuth(); // Destructure signUp and error from useAuth

  const handleSignUp = () => {
    Keyboard.dismiss();
    signUp(email, password); // Use signUp from useAuth
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
      
      {/* Display error message if there is one */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Link to Login Screen */}
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.registerLink}>Already have an account? Log in</Text>
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
  },
  errorText: { // Style for error message
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
});


export default RegisterScreen;
