import { useState, useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';

const useBleRssiScanner = () => {
    const [devicesRSSI, setDevicesRSSI] = useState({});
    const manager = new BleManager();
  
    const deviceNames = ["green", "blue", "red", "yellow", "purple"];
  
    useEffect(() => {
        const subscription = manager.onStateChange((state) => {
          if (state === 'PoweredOn') {
            scanAndConnect();
          }
        }, true);

        const scanInterval = setInterval(() => {
          manager.stopDeviceScan();
          scanAndConnect();
        }, 1000); // Scan every second

        return () => {
          subscription.remove();
          clearInterval(scanInterval);
          manager.destroy();
        };
      }, [manager]);
      
      const scanAndConnect = () => {
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log(error); // Consider more robust error handling
            return;
          }
      
          if (device.name && deviceNames.includes(device.name)) {
            setDevicesRSSI(prevState => ({
              ...prevState,
              [device.name]: device.rssi,
            }));
          }
        });
      };

      return devicesRSSI;
};

export default useBleRssiScanner;
