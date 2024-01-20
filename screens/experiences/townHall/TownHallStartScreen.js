import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image } from 'react-native';
import { Audio } from 'expo-av';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import TownHallHeader from '../../../components/modules/TownHallHeader.js';
import useBleRssiScannerTownHall from '../../../hooks/useBleRssiScannerTownHall';

const DeviceCircle = ({ device, inRange, stayPink }) => {
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
  const [playedAudios, setPlayedAudios] = useState({});
  const [title, setTitle] = useState("Collect the Beacons");
  const [stayPink, setStayPink] = useState({}); 
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up  
  const [shownModals, setShownModals] = useState({});

  const closeModal = async () => {
    console.log('Closing Modal'); // Debugging line
    if (activeDevice && soundObjectsRef.current[activeDevice.name]) {
      await soundObjectsRef.current[activeDevice.name].stopAsync(); // Stop the audio
    }
    setActiveDevice(null); // Close the modal by setting modalDevice to null
    startScanCycle(); // Resume scanning
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
    startScanCycle();
    return () => stopScanCycle(); // Stop scanning when component unmounts
  }, []);

  
  useEffect(() => {
    const handleDevices = async () => {
      for (const device of devices) {
        const sound = soundObjectsRef.current[device.name];
        if (sound && !playedAudios[device.name]) {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && device.rssi < 0 && device.rssi > -45 && !status.isPlaying) {
              await sound.playAsync().catch(() => {/* Handle error */});
              setPlayedAudios(prev => ({ ...prev, [device.name]: true }));
              setStayPink(prev => ({ ...prev, [device.name]: true }));
              setActiveDevice(device); // Show the modal for this device
              stopScanCycle(); // Stop scanning when a device is in range
            }
          } catch (error) {
            console.error(`Error with sound for device ${device.name}:`, error);
          }
        }
      }
    };
  
    handleDevices();
  }, [devices, shownModals, playedAudios, soundObjectsRef, startScanCycle, stopScanCycle]);
  

  return (
    <ScrollView>
    <TownHallHeader title={title} />
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {devices.map((device) => (
          <DeviceCircle
            key={device.title}
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
  {activeDevice && (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <>
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold pb-4">{activeDevice.title}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Image
              className="rounded-lg mb-4"
              source={activeDevice.image}
              resizeMode="contain"
              style={{ width: '100%', height: undefined, aspectRatio: 1 }}
            />
            <Text>Description: {activeDevice.description}</Text>
          </ScrollView>
        </>
      </View>
    </View>
  )}
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the rest of the screen
    },
    modalView: {
      backgroundColor: 'white', // Solid background for the modal
      padding: 30,
      borderTopLeftRadius: 10, // Optional, for rounded corners at the top
      borderTopRightRadius: 10, // Optional, for rounded corners at the top
      height: '50%', // Adjust this value as needed
      // You can also use a specific value like height: 300
    },
  
  });

export default TownHallStartScreen;