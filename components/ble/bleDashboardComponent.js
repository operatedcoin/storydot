import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { circleDashboardStyles } from '../../themes/circleDashboardStyles';
import useBleRssiScanner from '../../hooks/useBleRssiScanner'; // Ensure correct path

const colors = {
  MsgSix: 'red',
  Blue: 'blue',
  Green: 'green',
  Yellow: 'black',
  Purple: 'purple',
  // Add other device colors or a default color
};

const bleDashboardComponent = () => {
  const { devices } = useBleRssiScanner(); // Use the hook to get devices

  // Calculate circle positions for the smaller circle
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  const smallerCircleRadius = 40; // Smaller circle radius
  const biggerCircleRadius = smallerCircleRadius * 3; // Bigger circle radius

  const circlePositions = devices.map((_, index) => {
    const angle = (2 * Math.PI * index) / devices.length;
    const x = centerX + biggerCircleRadius * Math.cos(angle);
    const y = centerY + biggerCircleRadius * Math.sin(angle);
    return { x, y };
  });

  return (
    <View style={circleDashboardStyles.container}>
      <View style={circleDashboardStyles.bigCircle}></View>
      {devices.map((device, index) => {
        const { x, y } = circlePositions[index];
        const color = colors[device.name] || 'gray'; // Fallback color
        return (
          <View
            key={index}
            style={circleDashboardStyles.smallCircle(color, x, y)}
          >
            <Text style={circleDashboardStyles.deviceText}>{device.name}</Text>
            <Text style={circleDashboardStyles.rssiText}>RSSI {device.rssi}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default bleDashboardComponent;
