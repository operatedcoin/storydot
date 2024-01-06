import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const DemoWelcomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <ScrollView style={{width: '100%'}}>
         {/* Button to navigate to the Demo Settings */}
         <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Begin')}>
          <Text style={globalStyles.buttonText}>Begin</Text>
        </TouchableOpacity>
        {/* Button to navigate to the Demo Dashboard */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={globalStyles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

       

        {/* Include other navigational elements as needed */}
      </ScrollView>
    </View>
  );
};

export default DemoWelcomeScreen;
