import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TownHallWelcomeScreen = ({ navigation }) => {
  return (
    <View style={globalstyles.container}>
      <Text>Welcome to TownHall!</Text>
      
      {/* Button to navigate to the TownHall Dashboard */}
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('TownHallDashboardScreen')}
      />

      {/* Button to navigate to the TownHall Start */}
      <Button
        title="Go to Start"
        onPress={() => navigation.navigate('TownHallStartScreen')}
      />

      {/* Include other navigational elements as needed */}
    </View>
  );
};

export default TownHallWelcomeScreen;
