import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import firebase from '../../firebaseConfig';
import { globalStyles } from '../../themes/globalStyles';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Navigate back to Login Screen or handle logout
      })
      .catch(error => console.log(error.message));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.container}>
        <TouchableOpacity onPress={handleLogout} style={globalStyles.logoutButton}>
          <Text style={globalStyles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
          <Text style={globalStyles.header}>Playable experiences</Text>
        </View>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%', height: 150}} // Set a fixed height for the ScrollView
        >
          {/* Add your module buttons here */}
          <TouchableOpacity onPress={() => navigation.navigate('DemoWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TownHallWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Parramatta Town Hall</Text>
          </TouchableOpacity>
          {/* Add more buttons or links for other experiences as needed */}
        </ScrollView>
                <View style={{alignSelf: 'stretch', alignItems: 'flex-start', marginTop: 0}}>
          <Text style={globalStyles.header}>More Info</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width: '100%', height: 150}}>
          {/* Your new module buttons */}
          <TouchableOpacity onPress={() => { /* Handle navigation */ }} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>How does it work?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Handle navigation */ }} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Handle navigation */ }} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Operated Coin</Text>
          </TouchableOpacity>
          {/* Add more buttons or links for other experiences as needed */}
        </ScrollView>

      </View>  
    </SafeAreaView>
  );
};

export default HomeScreen;
