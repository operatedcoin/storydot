import React from 'react';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import bleDashboardComponent from '../../../components/ble/bleDashboardComponent'; // Adjust the path as necessary
import useBleRssiScanner from '../../../hooks/useBleRssiScanner';
import { circleDashboardStyles } from '../../../themes/circleDashboardStyles'; // Adjust the path as necessary

const colors = {
  MsgSix: 'red',
  Blue: 'blue',
  Green: 'green',
  Yellow: 'black',
  Purple: 'purple',
};

const TownHallDashboardScreen = () => {
  const { devices } = useBleRssiScanner(); // Use the hook to get devices
  // ...rest of your component logic remains the same...

    // Calculate circle positions for the smaller circle
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;
    const smallerCircleRadius = 40; // Smaller circle radius
    const biggerCircleRadius = smallerCircleRadius * 3; // Bigger circle radius
  
    // Recalculate circle positions
    const circlePositions = devices.map((_, index) => {
      const angle = (2 * Math.PI * index) / devices.length;
      const x = centerX + biggerCircleRadius * Math.cos(angle);
      const y = centerY + biggerCircleRadius * Math.sin(angle);
      return { x, y };
    });
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={circleDashboardStyles.container}>
        <View style={circleDashboardStyles.bigCircle}></View>
        {devices.map((device, index) => {
          const { x, y } = circlePositions[index];
          return (
            <View
              key={index}
              style={circleDashboardStyles.smallCircle(colors[device.name], x, y)}
            >
              <Text style={circleDashboardStyles.deviceText}>{device.name}</Text>
              <Text style={circleDashboardStyles.rssiText}>RSSI {device.rssi}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TownHallDashboardScreen;
