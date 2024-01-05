// screens/common/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebaseConfig'; // Adjust path as necessary

import DemoWelcomeScreen from '../experiences/demo/DemoWelcomeScreen';
import TownHallWelcomeScreen from '../experiences/townHall/TownHallWelcomeScreen';

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
      <Text>Welcome</Text>
      <Button title="Demo" onPress={() => navigation.navigate('DemoWelcomeScreen')} />

      <Button title="Town Hall" onPress={() => navigation.navigate('TownHallWelcomeScreen')} />
      {/* Add buttons or links for other experiences */}
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