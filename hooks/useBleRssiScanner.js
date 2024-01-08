import { useState, useEffect, useRef } from 'react';
import { BleManager } from 'react-native-ble-plx';

const useBleRssiScanner = () => {
  const [devices, setDevices] = useState([
    { name: 'MsgSix', rssi: -55 },
    { name: 'Blue', rssi: -100 },
    { name: 'Green', rssi: -100 },
    { name: 'Yellow', rssi: -100 },
    { name: 'Purple', rssi: -100 },
  ]);

  const managerRef = useRef(new BleManager());

  const updateDeviceRssi = (device) => {
    setDevices((currentDevices) => {
      const deviceIndex = currentDevices.findIndex(d => d.name === device.localName);
      if (deviceIndex !== -1 && currentDevices[deviceIndex].rssi !== device.rssi) {
        const updatedDevices = [...currentDevices];
        updatedDevices[deviceIndex] = { ...updatedDevices[deviceIndex], rssi: device.rssi };
        return updatedDevices;
      }
      return currentDevices;
    });
  };

  const scanDevices = () => {
    managerRef.current.startDeviceScan(null, null, (error, device) => {
      if (device) {
        updateDeviceRssi(device);
      }
    });
  };

  useEffect(() => {
    scanDevices(); // Initial scan
    const interval = setInterval(scanDevices, 1000); // Adjusted scan frequency

    return () => {
      clearInterval(interval);
      managerRef.current.stopDeviceScan();
      managerRef.current.destroy();
    };
  }, []);

  return { devices, scanDevices };
};

export default useBleRssiScanner;