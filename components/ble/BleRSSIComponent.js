import React from 'react';
import { Text, View } from 'react-native';
import useBleRssiScanner from '../../hooks/useBleRssiScanner'; // Ensure correct path

const BleRssiComponent = () => {
    const { devices } = useBleRssiScanner();
  
    return (
      <View>
        <Text>BLE RSSI Data:</Text>
        {devices.map((device, index) => (
          <View key={index}>
            <Text>{device.name}: {device.rssi}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  export default BleRssiComponent;