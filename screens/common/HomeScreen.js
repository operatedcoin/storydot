// screens/common/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebaseConfig'; // Adjust path as necessary

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Navigate back to Login Screen or handle logout
      })
      .catch(error => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
