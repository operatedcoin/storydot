import React from 'react';
import { SafeAreaView } from 'react-native';
import BleDashboardComponent from '../../../components/ble/bleDashboardComponent'; // Ensure correct path

const TownHallDashboardScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BleDashboardComponent />
    </SafeAreaView>
  );
};

export default TownHallDashboardScreen;
