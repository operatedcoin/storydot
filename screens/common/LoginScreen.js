// screens/common/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook
import { globalStyles } from '../../themes/globalStyles'; // Import global styles


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signIn } = useAuth(); // Destructure signIn and error from useAuth

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn(email, password); // Use signIn from useAuth
  };

  const navigateToRegister = () => {
    navigation.navigate('REGISTER');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Error message */}
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      {/* Link to Register Screen */}
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={globalStyles.subLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;
