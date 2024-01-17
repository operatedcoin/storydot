import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../hooks/useBleRssiScanner';

const DeviceCircle = ({ device, inRange, isBlue }) => {
  const circleColor = isBlue ? styles.lightBlue : (inRange ? styles.inRange : styles.outOfRange);

  return (
    <View style={[styles.circle, circleColor]}>
      <Text>{device.name}</Text>
      <Text>{device.rssi}</Text>
    </View>
  );
};


const GhostBeacon = () => {
  const { devices } = useBleRssiScanner();
  const soundObjectsRef = useRef({});
  const [resetColor, setResetColor] = useState(false); // New state for resetting color

  const handleRefresh = () => {
    setResetColor(true);
  };

  useEffect(() => {
    if (resetColor) {
      setResetColor(false);
    }
  }, [resetColor]);



  useEffect(() => {
    // Asynchronously load sound objects for each device
    const loadSounds = async () => {
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
        }
      });
    };
  }, [devices]);

  useEffect(() => {
    const manageSounds = async () => {
      await Promise.all(devices.map(async (device) => {
        // Ignore devices with RSSI of 0 or greater
        if (device.rssi >= 0) return;

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
    <DeviceCircle 
      key={device.name} 
      device={device} 
      inRange={device.rssi > -45} 
      isBlue={!resetColor && device.rssi > -45} // Use isBlue prop
    />
  ))}
  <Button title="Refresh" onPress={handleRefresh} /> {/* Refresh button */}
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
        lightBlue: {
          backgroundColor: 'lightblue',
        },
        });
        
        export default GhostBeacon;
