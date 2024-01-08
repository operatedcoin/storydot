import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles
import {BleManager} from 'react-native-ble-plx'
import { experienceStyles } from '../../../themes/experienceStyles'; // Import global styles

const TownHallWelcomeScreen = ({ navigation }) => {
  return (
    <View style={experienceStyles.container}>
      {/* Hero Tile */}
      <View style={experienceStyles.heroTile}>
        <Text style={experienceStyles.heroText}>Welcome to the Town Hall</Text>
      </View>

      {/* Scrollable Buttons */}
      <ScrollView style={experienceStyles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* Button to navigate to the Town Hall Settings */}
        <TouchableOpacity style={experienceStyles.moduleButton} onPress={() => navigation.navigate('Begin')}>
          <Text style={experienceStyles.buttonText}>Begin</Text>
        </TouchableOpacity>
        {/* Button to navigate to the Town Hall Dashboard */}
        <TouchableOpacity style={experienceStyles.moduleButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={experienceStyles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
        {/* Include other navigational elements as needed */}
      </ScrollView>
    </View>
  );
};

export default TownHallWelcomeScreen;