import React from 'react';
import { View, Text } from 'react-native';
import BleDashboard from '../../../components/ble/BleDashboardComponent'; // Adjust the path as necessary
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles


const TownHallDashboardScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Town Hall Dashboard Screen</Text>
      <BleDashboard />
    </View>
  );
};

export default TownHallDashboardScreen;
