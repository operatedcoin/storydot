// screens/common/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signIn } = useAuth(); // Destructure signIn and error from useAuth

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn(email, password); // Use signIn from useAuth
  };

  const navigateToRegister = () => {
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

      {/* Error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Link to Register Screen */}
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
  },
  errorText: { // Style for error message
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default LoginScreen;
