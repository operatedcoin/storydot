import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../../hooks/useBleRssiScanner';

const DeviceCircle = ({ device, inRange }) => {
  return (
    <View style={[styles.circle, inRange ? styles.inRange : styles.outOfRange]}>
      <Text>{device.name}</Text>
      <Text>{device.rssi}</Text>
    </View>
  );
};

const GhostStartScreen = () => {
  const { devices } = useBleRssiScanner();
  const soundObjectsRef = useRef({});

  useEffect(() => {
    // Initialize sound objects for each device
    devices.forEach(async (device) => {
      const { sound } = await Audio.Sound.createAsync(device.audioFile);
      // Assign the sound objects to the ref's current property
      soundObjectsRef.current[device.name] = sound;
    });

    return () => {
      // Stop and unload all sounds on unmount
      // Access the sound objects from the ref
      Object.values(soundObjectsRef.current).forEach((sound) => {
        sound.stopAsync();
        sound.unloadAsync();
      });
    };
  }, []);

  useEffect(() => {
    devices.forEach(async (device) => {
      // Access the sound objects from the ref
      const sound = soundObjectsRef.current[device.name];
      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            if (device.rssi > -35 && !status.isPlaying) {
              await sound.playAsync().catch(() => {/* Handle or log specific play error */});
            } else if (device.rssi <= -35 && status.isPlaying) {
              await sound.stopAsync().catch(() => {/* Handle or log specific stop error */});
            }
          }
        } catch (error) {
          console.error(`Error with sound for device ${device.name}:`, error);
        }
      }
    });
  }, [devices]);
  
  
  return (
    <View style={styles.container}>
      {devices.map((device) => (
        <DeviceCircle key={device.name} device={device} inRange={device.rssi > -35} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  inRange: {
    backgroundColor: 'green',
  },
  outOfRange: {
    backgroundColor: 'grey',
  },
});

export default GhostStartScreen;
