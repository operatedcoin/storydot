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

        <View style={globalStyles.heroTile}>
          <Text style={globalStyles.heroText}>Hero Tile</Text>
        </View>


        <View style={globalStyles.scrollModule}>
          <View style={{alignSelf: 'stretch', alignItems: 'flex-start', marginVertical: 0}}>
            <Text style={globalStyles.header}>Play Now</Text>
          </View>

          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{width: '100%', height: globalStyles.moduleButton.height, marginVertical: 0}} 
          >
          {/* Add your module buttons here */}
          <TouchableOpacity onPress={() => navigation.navigate('GhostWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Ghost</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DemoWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TownHallWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>Parramatta Town Hall</Text>
          </TouchableOpacity>
          {/* Add more buttons or links for other experiences as needed */}
        </ScrollView>
        </View>

        <View style={globalStyles.scrollModule}>
        <View style={{alignSelf: 'stretch', alignItems: 'flex-start', marginVertical: 0}}>
          <Text style={globalStyles.header}>More Info</Text>
        </View>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%', height: globalStyles.moduleButton.height}} // Set a fixed height for the ScrollView
        >
          {/* Your new module buttons */}
          <TouchableOpacity onPress={() => { /* Handle navigation */ }} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>How does it work?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Handle navigation */ }} style={globalStyles.moduleButton}>
            <Text style={globalStyles.buttonText}>About Operated Coin</Text>
          </TouchableOpacity>

          {/* Add more buttons or links for other experiences as needed */}
        </ScrollView>
        </View>
      </View>  
    </SafeAreaView>
  );
};

export default HomeScreen;
