import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../../hooks/useBleRssiScanner';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import GhostHeader from '../../../components/modules/GhostHeader';

const DeviceCircle = ({ device, inRange }) => {
    return (
      <View style={[styles.circle, inRange ? styles.inRange : styles.initialCircle]}>
        <Text>{device.name}</Text>
        <Text>{device.rssi}</Text>
      </View>
    );
  };


    const GhostChapterThree = () => {
      const { devices } = useBleRssiScanner();
      const soundObjectsRef = useRef({});
      const halfLength = Math.ceil(devices.length / 2);
      const firstRowDevices = devices.slice(0, halfLength);
      const secondRowDevices = devices.slice(halfLength);
      const [title, setTitle] = useState("Collect the Beacons");

      const updateTitle = () => {
        setTitle("Collect the B3acons"); // Update this to change the title dynamically
      };
    
    
  
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
              if (device.rssi > -45 && !status.isPlaying) {
                await sound.playAsync().catch(() => {/* Handle or log specific play error */});
              } else if (device.rssi <= -45 && status.isPlaying) {
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
        <ScrollView>
            <GhostHeader title={title} />
              <View style={styles.container}>
      <View style={styles.rowContainer}>
        {firstRowDevices.map((device) => (
          <DeviceCircle key={device.name} device={device} inRange={device.rssi > -45} />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {secondRowDevices.map((device) => (
          <DeviceCircle key={device.name} device={device} inRange={device.rssi > -45} />
        ))}
      </View>
      <Button title="Change Title" onPress={updateTitle} />
      <Text>Gyro Sensor Active</Text>
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
    </View>
        </ScrollView>
      );
    };
  
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    circle: {
      width: 60, // Adjusted size to fit two rows
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    initialCircle: {
      backgroundColor: 'white',
      borderColor: 'blue',
      borderWidth: 2,
    },
    inRange: {
      backgroundColor: 'green',
    },
    outOfRange: {
      backgroundColor: 'grey',
    },
  });

export default GhostChapterThree;