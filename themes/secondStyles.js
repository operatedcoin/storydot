// themes/globalStyles.js

import { StyleSheet } from 'react-native';

export const secondStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#c0fc91',
    color: 'black',
  },
  button: {
    backgroundColor: '#15231a', // Example button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // or any other color
    textAlign: 'center',
    fontWeight: 'bold', // Make text bold
    fontSize: 25, // Increase font size
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  subLink: {
    marginTop: 15,
    color: '#15231a', // Feel free to change the color
    textAlign: 'center'
  },
});
