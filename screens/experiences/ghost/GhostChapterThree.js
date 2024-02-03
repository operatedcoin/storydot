import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Animated, View, ScrollView, Text, StyleSheet, Platform, Image, TouchableOpacity, Modal } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import BlackAnimatedButton from '../../../components/text/balckAnimatedButton';
import useBleRssiScannerGhost from '../../../hooks/useBleRssiScannerGhost';
import { Ionicons } from '@expo/vector-icons';

const townhallColor = 'black';

const DeviceCircle = ({ device, inRange, stayPink }) => {
  const circleColor = stayPink ? styles.lightPink : (inRange ? styles.inRange : styles.initialCircle);
  const circleText = stayPink ? 'white' : (inRange ? 'white' : townhallColor);
  return (
    <View style={[styles.circle, circleColor]}>
      <Text style={{color: circleText, textAlign: 'center'}}>{device.title}</Text>
      {/* <Text style={{color: circleText}}>{device.rssi}</Text> */}
    </View>
  );
};

const GhostChapterThree = () => {
  const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerGhost();
  const soundObjectsRef = useRef({});
  const [playedAudios, setPlayedAudios] = useState({});
  const [stayPink, setStayPink] = useState({}); 
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up  
  const [shownModals, setShownModals] = useState({});

  const [hauntedText, setHauntedText] = useState(""); // Add this line
  const [showButton, setShowButton] = useState(false); // Add this line
  const navigation = useNavigation();
  const [phase, setPhase] = useState(1); // Add phase state
  const textOpacityAnim = useRef(new Animated.Value(1)).current; // For fading text
  const handleButtonPress = () => {
    // Define what should happen when the button is pressed
    navigation.navigate('ChapterFour');
    console.log("Button Pressed");
  };

  const handleSkip = () => {
    // clearAllTimers(); // Clear all active timers
    // Define what should happen when the button is pressed
    clearAllTimers(); // Clear all active timers before navigating
    navigation.navigate('ChapterFour');
    console.log("Button Pressed");
  };

  const timerRefs = useRef([]);
  const clearAllTimers = () => {
    timerRefs.current.forEach(timer => clearTimeout(timer));
    timerRefs.current = []; // Clear the refs array after clearing the timers
  };

  const closeModal = async () => {
    console.log('Closing Modal'); // Debugging line
    if (activeDevice && soundObjectsRef.current[activeDevice.name]) {
      await soundObjectsRef.current[activeDevice.name].stopAsync(); // Stop the audio
    }
    setActiveDevice(null); // Close the modal by setting modalDevice to null
    startScanCycle(); // Resume scanning

  // New logic to trigger CreditsSection after last beacon's modal is closed
      if (allCollected) {
        navigation.navigate('ChapterFour');  }
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
  

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerBackTitleVisible: false,
    });
  }, [navigation]);


  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GhostHeader />
      
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
      
      <TouchableOpacity
  style={{
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
  }}
  onPress={handleSkip}
>
  <Text style={{ color: 'gray' }}>Skip</Text>
</TouchableOpacity>

      <View style={styles.content}>

      <View style={styles.rowContainer}>
            {devices.map((device) => (
              <DeviceCircle
                key={device.title}
                device={device}
                inRange={device.rssi > -45}
                stayPink={stayPink[device.name]}
              />
            ))}
          </View>
  
       
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={activeDevice !== null}
>
  {activeDevice && (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <>
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold pb-4">{activeDevice.title}</Text>
            <TouchableOpacity onPress={closeModal} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 8 }}>
              <Ionicons name="close-sharp" size={20} color={townhallColor} />
              <Text style={{color: townhallColor, fontWeight: 700 }}>Close</Text>
            </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed to white
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  blockStyle: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  letterStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 24,
    color: 'black', // Changed to black
    lineHeight: 30,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'gray', // You might want to change this as well
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'black', // Ensuring this is black
    textAlign: 'center',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  initialCircle: {
    borderColor: townhallColor,
    borderWidth: 2,
  },
  inRange: {
    backgroundColor: townhallColor,
  },
  outOfRange: {
    backgroundColor: 'grey',
  },
  lightPink: {
    backgroundColor: townhallColor,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Aligns the modal to the bottom
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for the rest of the screen
      zIndex: 200,
    },
    modalView: {
      backgroundColor: 'white', // Solid background for the modal
      padding: 30,
      borderTopLeftRadius: 10, // Optional, for rounded corners at the top
      borderTopRightRadius: 10, // Optional, for rounded corners at the top
      height: '80%', // Adjust this value as needed
      // You can also use a specific value like height: 300
    },
});

export default GhostChapterThree;
