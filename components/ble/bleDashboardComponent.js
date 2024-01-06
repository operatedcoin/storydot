import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useBleRssiScanner from '../../hooks/useBleRssiScanner'; // adjust the path as necessary

const BleDashboard = () => {
  const devicesRSSI = useBleRssiScanner(); // Retrieves RSSI values

  return (
    <View style={styles.dashboard}>
      {["red", "yellow", "green", "blue", "purple"].map((color) => (
        <View key={color} style={[styles.circle, {backgroundColor: color}]}>
          <Text style={styles.text}>{devicesRSSI[color] || "N/A"}</Text>
          <Text style={styles.deviceName}>{color}</Text>
        </View>
      ))}
    </View>
  );
};

export default BleDashboard;

const styles = StyleSheet.create({
    dashboard: {
      flexDirection: 'row', // Arrange circles in a row
      justifyContent: 'space-around', // Evenly space out circles
      alignItems: 'center', // Center align items
      padding: 20, // Add padding for aesthetics
    },
    circle: {
      width: 100, // Size of the circle
      height: 100, // Size of the circle
      borderRadius: 50, // Half the width/height to make it a circle
      justifyContent: 'center', // Center the text vertically
      alignItems: 'center', // Center the text horizontally
    },
    text: {
      color: 'white', // Assuming white text for visibility
      fontWeight: 'bold', // Bold text for visibility
    },
    deviceName: {
      position: 'absolute', // Absolute to overlay on the bottom of the circle
      bottom: 10, // Position from the bottom
      color: 'white',
      fontWeight: 'bold',
    }
  });
  
