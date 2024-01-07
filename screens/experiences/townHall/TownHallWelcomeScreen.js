import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles
import {BleManager} from 'react-native-ble-plx'

const _BleManager = new BleManager();



const TownHallWelcomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
    {/* Adjusting header with inline style */}
      <ScrollView style={{width: '100%'}}>
          {/* Button to navigate to the Town Hall Settings */}
          <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Begin')}>
          <Text style={globalStyles.buttonText}>Begin</Text>
        </TouchableOpacity>
        {/* Button to navigate to the Town Hall Dashboard */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={globalStyles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

      

        {/* Include other navigational elements as needed */}
      </ScrollView>
    </View>
  );
};

export default TownHallWelcomeScreen;
