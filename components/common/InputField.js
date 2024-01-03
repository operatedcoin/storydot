import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({placeholder, value, onChangeText, secureTextEntry}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    padding: 10,
  },
});

export default InputField;
