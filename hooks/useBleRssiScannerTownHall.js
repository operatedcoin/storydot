import { useState, useEffect, useRef } from 'react';
import { BleManager, ScanMode } from 'react-native-ble-plx';
import { townHallBeaconDevices, processDevices } from '../utils/townHallBeacons';

const useBleRssiScannerTownHall = () => {
  const [devices, setDevices] = useState(processDevices(townHallBeaconDevices));
  const managerRef = useRef(new BleManager());
  const scanIntervalRef = useRef();
  const scanPauseTimeoutRef = useRef();
  const scanningRef = useRef(false); // Add a reference to track if scanning is already in progress

  const updateDeviceRssi = (device) => {
    console.log(`Detected device: ${device.localName}, RSSI: ${device.rssi}`);
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
    console.log('Starting scan cycle');
    if (!scanningRef.current) { // Check if scanning is already in progress
      scanningRef.current = true; // Set scanning flag
      scanDevices();
      scanIntervalRef.current = setInterval(scanDevices, 250); // Restart scan every 250 milliseconds

      // Stop scanning after 10 seconds and set a pause
      scanPauseTimeoutRef.current = setTimeout(() => {
        clearInterval(scanIntervalRef.current);
        managerRef.current.stopDeviceScan();
        scanningRef.current = false; // Reset scanning flag
        setTimeout(startScanCycle, 2000); // Restart the whole cycle after a 2 seconds pause
      }, 10000);
    }
  };

  const stopScanCycle = () => {
    clearInterval(scanIntervalRef.current);
    clearTimeout(scanPauseTimeoutRef.current);
    managerRef.current.stopDeviceScan();
    scanningRef.current = false; // Reset scanning flag
    console.log('BLE scanning stopped.');
  };
  
  return { devices, scanDevices, startScanCycle, stopScanCycle };
};

export default useBleRssiScannerTownHall;
