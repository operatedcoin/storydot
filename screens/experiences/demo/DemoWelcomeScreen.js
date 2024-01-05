import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles


const DemoWelcomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text>Welcome to Demo!</Text>
      
      {/* Button to navigate to the Demo Dashboard */}
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('DemoDashboardScreen')}
      />

      {/* Button to navigate to the Demo Settings */}
      <Button
        title="Begin the Experience"
        onPress={() => navigation.navigate('DemoStartScreen')}
      />

      {/* Include other navigational elements as needed */}
    </View>
  );
};
export default DemoWelcomeScreen;
