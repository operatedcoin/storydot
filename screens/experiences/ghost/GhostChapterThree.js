import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../../hooks/useBleRssiScanner';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import GhostHeader from '../../../components/modules/GhostHeader';

const DeviceCircle = ({ device, inRange, stayBlue }) => {
  const circleColor = stayBlue ? styles.lightBlue : (inRange ? styles.inRange : styles.initialCircle);

  return (
    <View style={[styles.circle, circleColor]}>
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
      const [stayBlue, setStayBlue] = useState({});
      const [allCollected, setAllCollected] = useState(false);
      const beaconsCollectedCount = Object.values(stayBlue).filter(status => status).length;
      const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up
      const closeModal = () => {
        setActiveDevice(null);
      };


      useEffect(() => {
        const newStayBlue = { ...stayBlue }; // Start with the current state
        devices.forEach(device => {
          // Only consider devices with RSSI less than 0 and greater than -45
          // and only update devices that haven't been set to blue yet
          if (device.rssi < 0 && device.rssi > -45 && !newStayBlue[device.name]) {
            newStayBlue[device.name] = true;
          }
        });
        setStayBlue(newStayBlue);
      }, [devices]);

  const handleRefresh = () => {
    setStayBlue({}); // Reset the state to allow color change again
  };

  const updateTitle = () => {
      setTitle("Collect the B3acons"); // Update this to change the title dynamically
  };

  useEffect(() => {
    const checkAllCollected = Object.values(stayBlue).length === devices.length &&
                              Object.values(stayBlue).every(status => status);
    setAllCollected(checkAllCollected);
  }, [stayBlue]);

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
                setStayBlue(prev => ({ ...prev, [device.name]: true }));
                setActiveDevice(device); // Set as active device if in range
              } else if ((device.rssi <= -45 || device.rssi >= 0) && status.isPlaying) {
                await sound.stopAsync().catch(() => {/* Handle error */});
                // Do not reset activeDevice to null here
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
              <DeviceCircle
                key={device.name}
                device={device}
                inRange={device.rssi > -45}
                stayBlue={stayBlue[device.name]}
              />
            ))}
          </View>
          <View style={styles.rowContainer}>
            {secondRowDevices.map((device) => (
              <DeviceCircle
                key={device.name}
                device={device}
                inRange={device.rssi > -45}
                stayBlue={stayBlue[device.name]}
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
      borderColor: 'blue',
      borderWidth: 2,
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
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalView: {
      backgroundColor: "white",
      padding: 20,
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: '100%',
      height: '50%', // Adjusted to make the modal twice as high
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
  });

export default GhostChapterThree;