// bleDashboardComponent

import React from 'react';
import { View, Text } from 'react-native';
import { circleDashboardStyles } from '../../themes/circleDashboardStyles'; // Adjust the path as necessary

const bleDashboardComponent = ({ deviceName, rssi, color, x, y }) => {
  return (
    <View
      style={circleDashboardStyles.smallCircle(color, x, y)}
    >
      <Text style={circleDashboardStyles.deviceText}>{deviceName}</Text>
      <Text style={circleDashboardStyles.rssiText}>RSSI {rssi}</Text>
    </View>
  );
};

export default bleDashboardComponent;
