import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputField from '../../components/common/InputField';
import ButtonComponent from '../../components/common/ButtonComponent';
import { signIn } from '../../utils/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement login functionality using signIn function from /utils/auth.js
    try {
      await signIn(email, password);
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <ButtonComponent title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
