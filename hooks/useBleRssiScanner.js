import { useState, useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';

const useBleRssiScanner = () => {
  const [devices, setDevices] = useState([
    { name: 'MsgSix', rssi: 0 },
    { name: 'Blue', rssi: 0 },
    { name: 'Green', rssi: 0 },
    { name: 'Yellow', rssi: 0 },
    { name: 'Purple', rssi: 0 },
  ]);

  const manager = new BleManager();

  const scanDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (device) {
        setDevices((currentDevices) =>
          currentDevices.map((d) =>
            d.name === device.localName ? { ...d, rssi: device.rssi } : d
          )
        );
      }
    });
  };

  useEffect(() => {
    scanDevices(); // Initial scan
    const interval = setInterval(scanDevices, 500); // Scan every 0.5 seconds

    return () => {
      clearInterval(interval);
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  return { devices, scanDevices };
};

export default useBleRssiScanner;
