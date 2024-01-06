// screens/common/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../../firebaseConfig'; // Adjust path as necessary
import { globalStyles } from '../../themes/globalStyles'; // Import global styles

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Navigate back to Login Screen or handle logout
      })
      .catch(error => console.log(error.message));
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={handleLogout} style={globalStyles.logoutButton}>
        <Text style={globalStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text style={globalStyles.header}>Welcome</Text>
      <ScrollView style={{width: '100%'}}>
        <TouchableOpacity onPress={() => navigation.navigate('DemoWelcomeScreen')} style={globalStyles.moduleButton}>
          <Text style={globalStyles.buttonText}>Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TownHallWelcomeScreen')} style={globalStyles.moduleButton}>
          <Text style={globalStyles.buttonText}>Parramatta Town Hall</Text>
        </TouchableOpacity>
        {/* Add buttons or links for other experiences */}
      </ScrollView>
    </View>
  );
};



export default HomeScreen;