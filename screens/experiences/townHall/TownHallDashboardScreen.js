import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const TownHallDashboardScreen = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();

  useEffect(() => {
      const scanDevices = () => {
          manager.startDeviceScan(null, null, (error, device) => {
              if (device && (device.localName === 'green' || device.localName === 'Yellow')) {
                  setDevices(prevDevices => [...prevDevices, { name: device.localName, rssi: device.rssi }]);
              }
          });

          setTimeout(() => {
              manager.stopDeviceScan();
          }, 2000); // Stop scanning after 2 seconds
      };

      const interval = setInterval(scanDevices, 2000); // Scan every 2 seconds

      return () => {
          clearInterval(interval);
          manager.destroy();
      };
  }, []);

  return (
    <View style={styles.container}>
        {devices.map((device, index) => (
            <Text key={index} style={styles.deviceText}>{device.name}: RSSI {device.rssi}</Text>
        ))}
    </View>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1, // This ensures that the view takes up the full space
      alignItems: 'center',
      justifyContent: 'center',
  },
  deviceText: {
      // Any additional styling for text goes here
  }
});



export default TownHallDashboardScreen;
