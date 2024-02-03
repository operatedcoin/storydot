import { useState, useEffect, useRef } from 'react';
import { BleManager, ScanMode } from 'react-native-ble-plx';
import { ghostBeaconDevices, processDevices } from '../utils/ghostBeacons';

const useBleRssiScannerGhost = () => {
  const [devices, setDevices] = useState(processDevices(ghostBeaconDevices));
  const managerRef = useRef(new BleManager());
  const scanIntervalRef = useRef();
  const scanPauseTimeoutRef = useRef();

  const updateDeviceRssi = (device) => {
    setDevices((currentDevices) => {
      const deviceIndex = currentDevices.findIndex(d => d.name === device.localName);
      if (deviceIndex !== -1 && currentDevices[deviceIndex].rssi !== device.rssi) {
        const updatedDevices = [...currentDevices];
        updatedDevices[deviceIndex] = { 
          ...updatedDevices[deviceIndex], 
          rssi: device.rssi 
        };
        return updatedDevices;
      }
      return currentDevices;
    });
  };

  const scanDevices = () => {
    managerRef.current.startDeviceScan(null, {
      allowDuplicates: true,
      scanMode: ScanMode.Balanced,
    },(error, device) => {
      if (device) {
        updateDeviceRssi(device);
      }
    });
  };

  const startScanCycle = () => {
    scanDevices();
    scanIntervalRef.current = setInterval(scanDevices, 250); // Restart scan every second

    // Stop scanning after 10 seconds and set pause
    scanPauseTimeoutRef.current = setTimeout(() => {
      clearInterval(scanIntervalRef.current);
      managerRef.current.stopDeviceScan();
      setTimeout(startScanCycle, 2000); // Restart the whole cycle after 5 seconds pause
    }, 4000);
  };

  const stopScanCycle = () => {
    clearInterval(scanIntervalRef.current);
    clearTimeout(scanPauseTimeoutRef.current);
    managerRef.current.stopDeviceScan();
    console.log('BLE scanning stopped.'); // Optional: log for verification

  };


  return { devices, scanDevices , startScanCycle, stopScanCycle};
};

export default useBleRssiScannerGhost;