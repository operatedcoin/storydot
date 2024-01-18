import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image } from 'react-native';
import { Audio } from 'expo-av';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import TownHallHeader from '../../../components/modules/TownHallHeader.js';
import useBleRssiScannerTownHall from '../../../hooks/useBleRssiScannerTownHall';

const DeviceCircle = ({ device, inRange, stayPink }) => { // Changed stayBlue to stayPink
  const circleColor = stayPink ? styles.lightPink : (inRange ? styles.inRange : styles.initialCircle);

  return (
    <View style={[styles.circle, circleColor]}>
      <Text>{device.title}</Text>
      <Text>{device.rssi}</Text>
    </View>
  );
};

const TownHallStartScreen = () => {

  const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerTownHall();
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
    startScanCycle();
    if (activeDevice && soundObjectsRef.current[activeDevice.name]) {
      soundObjectsRef.current[activeDevice.name].stopAsync();
    }
  };
  const [shownModals, setShownModals] = useState({});
  const [playedAudios, setPlayedAudios] = useState({});


  

  

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
  setStayPink({});
  setShownModals({});
  setPlayedAudios({}); // Reset the played audios state
  // ... other reset actions if needed
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
    // If there is an active device (meaning the modal is open), stop scanning.
    if (activeDevice) {
      stopScanCycle();
    } else {
      // When there is no active device (modal is closed), restart scanning.
      startScanCycle();
    }
  }, [activeDevice, stopScanCycle, startScanCycle]);

  useEffect(() => {
    devices.forEach(async (device) => {
      const sound = soundObjectsRef.current[device.name];
      if (sound && !playedAudios[device.name]) { // Check if the audio has not been played
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && device.rssi < 0 && device.rssi > -45 && !status.isPlaying) {
            await sound.playAsync().catch(() => {/* Handle error */});
            setPlayedAudios(prev => ({ ...prev, [device.name]: true })); // Mark as played
            setStayPink(prev => ({ ...prev, [device.name]: true }));
          }
        } catch (error) {
          console.error(`Error with sound for device ${device.name}:`, error);
        }
      }
    });
  
    if (!activeDevice) {
      const inRangeDevice = devices.find(device => 
        device.rssi < 0 && 
        device.rssi > -45 && 
        !shownModals[device.name]
      );
      if (inRangeDevice) {
        setActiveDevice(inRangeDevice);
        setShownModals(prev => ({ ...prev, [inRangeDevice.name]: true }));
      }
    }
  }, [devices, activeDevice, shownModals], playedAudios);
  
  

  return (
    <ScrollView>
    <TownHallHeader title={title} />
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {firstRowDevices.map((device) => (
          <DeviceCircle
            key={device.title}
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
          <Text style={styles.modalTitle}>{activeDevice.title}</Text>
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
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Aligns the modal to the bottom
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the rest of the screen
    },
    modalView: {
      backgroundColor: 'white', // Solid background for the modal
      padding: 20,
      borderTopLeftRadius: 20, // Optional, for rounded corners at the top
      borderTopRightRadius: 20, // Optional, for rounded corners at the top
      height: '50%', // Adjust this value as needed
      // You can also use a specific value like height: 300
    },
  
  });

export default TownHallStartScreen;