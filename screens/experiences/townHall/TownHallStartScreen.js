import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../../hooks/useBleRssiScanner';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import TownHallHeader from '../../../components/modules/TownHallHeader.js';

const DeviceCircle = ({ device, inRange, stayPink }) => { // Changed stayBlue to stayPink
  const circleColor = stayPink ? styles.lightPink : (inRange ? styles.inRange : styles.initialCircle);

  return (
    <View style={[styles.circle, circleColor]}>
      <Text>{device.name}</Text>
      <Text>{device.rssi}</Text>
    </View>
  );
};

const TownHallStartScreen = () => {

  const { devices } = useBleRssiScanner();
  const soundObjectsRef = useRef({});
  const halfLength = Math.ceil(devices.length / 2);
  const firstRowDevices = devices.slice(0, halfLength);
  const secondRowDevices = devices.slice(halfLength);
  const [title, setTitle] = useState("Collect the Beacons");
  const [stayPink, setStayPink] = useState({}); // Changed stayBlue to stayPink
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up
  const closeModal = () => {
    setActiveDevice(null);
  };

  useEffect(() => {
    const newStayPink = { ...stayPink }; // Start with the current state
    devices.forEach(device => {
      // Only consider devices with RSSI less than 0 and greater than -45
      // and only update devices that haven't been set to pink yet
      if (device.rssi < 0 && device.rssi > -45 && !newStayPink[device.name]) {
        newStayPink[device.name] = true;
      }
    });
    setStayPink(newStayPink);
  }, [devices]);

  const handleRefresh = () => {
    setStayPink({}); // Reset the state to allow color change again
  };

  const updateTitle = () => {
    setTitle("Collect the B3acons"); // Update this to change the title dynamically
  };

  useEffect(() => {
    const checkAllCollected = Object.values(stayPink).length === devices.length &&
                              Object.values(stayPink).every(status => status);
    setAllCollected(checkAllCollected);
  }, [stayPink]);

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
      const sound = soundObjectsRef.current[device.name];
      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            if (device.rssi < 0 && device.rssi > -45 && !status.isPlaying) {
              await sound.playAsync().catch(() => {/* Handle error */});
              // Set stayPink here to ensure it remains set regardless of RSSI changes
              setStayPink(prev => ({ ...prev, [device.name]: true }));
            } else if ((device.rssi <= -45 || device.rssi >= 0) && status.isPlaying) {
              await sound.stopAsync().catch(() => {/* Handle error */});
            }
          }
        } catch (error) {
          console.error(`Error with sound for device ${device.name}:`, error);
        }
      }
    });
    const inRangeDevice = devices.find(device => device.rssi < 0 && device.rssi > -45);
    setActiveDevice(inRangeDevice || null);
  }, [devices]);

  return (
    <ScrollView>
    <TownHallHeader title={title} />
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {firstRowDevices.map((device) => (
          <DeviceCircle
            key={device.name}
            device={device}
            inRange={device.rssi > -45}
            stayPink={stayPink[device.name]} // Changed stayBlue to stayPink
          />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {secondRowDevices.map((device) => (
          <DeviceCircle
            key={device.name}
            device={device}
            inRange={device.rssi > -45}
            stayPink={stayPink[device.name]} // Changed stayBlue to stayPink
          />
        ))}
      </View>
      <Button title="Refresh" onPress={handleRefresh} />
      <Text>Gyro Sensor Active</Text>
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
      <Text>{beaconsCollectedCount} out of 5 beacons collected</Text>
      {allCollected && <Text>All devices collected!</Text>}
      <Modal
  animationType="slide"
  transparent={true}
  visible={activeDevice !== null}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      {activeDevice && (
        <>
          <Text style={styles.modalTitle}>{activeDevice.name}</Text>
          <Text>RSSI: {activeDevice.rssi}</Text>
          {/* Additional details about the active device */}
          <Button title="Close" onPress={closeModal} />
        </>
      )}
    </View>
  </View>
</Modal>
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
    borderColor: 'pink', // Changed blue to pink
    borderWidth: 2,
  },
  inRange: {
    backgroundColor: 'green',
  },
  outOfRange: {
    backgroundColor: 'grey',
  },
  lightPink: {
    backgroundColor: 'lightpink',
    },
  });

export default TownHallStartScreen;