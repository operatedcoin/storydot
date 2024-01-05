import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GyroscopeComponent from '../../../components/GyroscopeComponent'; // Adjust the import path
import AccelerometerComponent from '../../../components/AccelerometerComponent'; // Adjust the import path
import CompassComponent from '../../../components/CompassComponent'; // Adjust the import path
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const DemoDashboardScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Demo Dashboard Screen</Text>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>BLE</Text>
        {/* BLE data will be displayed here */}
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Gyro</Text>
        {/* Gyro data will be displayed here */}
        <GyroscopeComponent />
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Accel</Text>
        <AccelerometerComponent />
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>GPS</Text>
        {/* GPS data will be displayed here */}
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Compass</Text>
        <CompassComponent />
      </View>
    </View>
  );
};

export default DemoDashboardScreen;