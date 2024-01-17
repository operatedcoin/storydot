import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../hooks/useBleRssiScanner';

const DeviceCircle = ({ device, inRange }) => {
  return (
    <View style={[styles.circle, inRange ? styles.inRange : styles.outOfRange]}>
      <Text>{device.name}</Text>
      <Text>{device.rssi}</Text>
    </View>
  );
};

const GhostBeacon = () => {
  const { devices } = useBleRssiScanner();
  const soundObjectsRef = useRef({});

  useEffect(() => {
    // Asynchronously load sound objects for each device
    const loadSounds = async () => {
        console.log(devices.map(device => ({ name: device.name, audioFile: device.audioFile })));
      const loadSoundPromises = devices.map(async (device) => {
        try {
          const { sound } = await Audio.Sound.createAsync(device.audioFile);
          soundObjectsRef.current[device.name] = sound;
        } catch (error) {
          console.error(`Error loading sound for device ${device.name}:`, error);
        }
      });

      await Promise.all(loadSoundPromises);
    };

    loadSounds();

    return () => {
        // Stop and unload all sounds on unmount
        Object.values(soundObjectsRef.current).forEach((sound) => {
          if (sound) {
            sound.stopAsync();
            sound.unloadAsync();
            // Set the reference to null or undefined after unloading
            const key = Object.keys(soundObjectsRef.current).find(key => soundObjectsRef.current[key] === sound);
            if (key) soundObjectsRef.current[key] = null;
          }
        });
      };
    }, [devices]);

  useEffect(() => {
    const manageSounds = async () => {
      await Promise.all(devices.map(async (device) => {
        const sound = soundObjectsRef.current[device.name];
        if (sound) {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              if (device.rssi > -45 && !status.isPlaying) {
                await sound.playAsync();
              } else if (device.rssi <= -45 && status.isPlaying) {
                await sound.stopAsync();
              }
            }
          } catch (error) {
            console.error(`Error managing sound for device ${device.name}:`, error);
          }
        }
      }));
    };
  
    manageSounds();
  }, [devices]);
  

  return (
    <View style={styles.container}>
      {devices.map((device) => (
        <DeviceCircle key={device.name} device={device} inRange={device.rssi > -45} />
        ))}
        </View>
        );
        };
        
        const styles = StyleSheet.create({
        container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap' // Optional, for wrapping items to next line
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
        
        export default GhostBeacon;
