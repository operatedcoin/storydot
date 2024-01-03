// screens/common/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook
import { secondStyles } from '../../themes/secondStyles'; // Import global styles


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signUp } = useAuth(); // Destructure signUp and error from useAuth

  const handleSignUp = () => {
    Keyboard.dismiss();
    signUp(email, password); // Use signUp from useAuth
  };

  const navigateToLogin = () => {
    navigation.navigate('LOGIN');
  };

  return (
    <View style={secondStyles.container}>
      <TextInput
        style={secondStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={secondStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
        <TouchableOpacity style={secondStyles.button} onPress={handleSignUp}>
        <Text style={secondStyles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      {/* Display error message if there is one */}
      {error ? <Text style={secondStyles.errorText}>{error}</Text> : null}

      {/* Link to Login Screen */}
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={secondStyles.subLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};


export default RegisterScreen;
