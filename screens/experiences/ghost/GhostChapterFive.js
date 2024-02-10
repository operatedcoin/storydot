import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Animated, View, ScrollView, Text, StyleSheet, Platform, Vibration, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { Audio } from 'expo-av';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import useBleRssiScannerGhost from '../../../hooks/useBleRssiScannerGhost';
import { Ionicons } from '@expo/vector-icons';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ghostBeaconDevices, processDevices } from '../../../utils/ghostBeacons2';
import * as Haptics from 'expo-haptics';

const townhallColor = 'white';

const DeviceCircle = ({ device, inRange, stayPink, x, y }) => {
  const circleColor = stayPink ? styles.lightPink : (inRange ? styles.inRange : styles.initialCircle);
  const circleText = stayPink ? townhallColor : (inRange ? styles.blackText : styles.blackText);

  return (
    <View style={[styles.circle, circleColor, { transform: [{ translateX: x }, { translateY: y }] }]}>
      <Text style={[circleText, {textAlign: 'center'}]}>{device.title}</Text>
    </View>
  );
};

const CircleLayout = ({ devices, stayPink }) => {
  const radius = 110; // Adjust this value to change the radius of the circle
  const numberOfDevices = devices.length;
  const angleStep = (2 * Math.PI) / numberOfDevices;

  return (
    <View style={styles.circleContainer}>
      {devices.map((device, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <DeviceCircle
            key={device.title}
            device={device}
            inRange={device.rssi > -45}
            stayPink={stayPink[device.name]}
            x={x}
            y={y}
          />
        );
      })}
    </View>
  );
};

const GhostChapterFive = () => {
  const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerGhost(ghostBeaconDevices, processDevices);
  const soundObjectsRef = useRef({});
  const [playedAudios, setPlayedAudios] = useState({});
  const [stayPink, setStayPink] = useState({Red: true, Blue: false, MsgSix: true, Yellow: true, Green: true, Orange: true,}); 
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up  
  const [shownModals, setShownModals] = useState({});
  const navigation = useNavigation();

  const beacondetectHaptic = async () => {
    try {
      // Start with a light vibration
      await Haptics.selectionAsync();
  
      // Wait for a short duration
      await new Promise(resolve => setTimeout(resolve, 100)); // Adjust duration as needed
  
      // Continue with a slightly stronger vibration
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  
      // Wait for another short duration
      await new Promise(resolve => setTimeout(resolve, 100)); // Adjust duration as needed
  
      // End with a heavier vibration
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.error('Error while generating tick-tock vibration:', error);
    }
  };

const handleButtonPress = () => {
  // Define what should happen when the button is pressed
  navigation.navigate('ChapterSix');
  console.log("Button Pressed");
};
const handleSkip = () => {
  // clearAllTimers(); // Clear all active timers
  // Define what should happen when the button is pressed
  clearAllTimers(); // Clear all active timers before navigating
  navigation.navigate('ChapterSix');
  console.log("Button Pressed");
};

const navigateToStart = () => {
  navigation.navigate('Details', { experienceId: 'ghost' });
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

  // Correctly handle the case for closing the 'Green' beacon's modal
  if (activeDevice && activeDevice.name === 'Blue') {
    // Set all beacons to collected (true) except for 'MsgSix'
    setStayPink(prevState => ({
      ...Object.keys(prevState).reduce((acc, beacon) => {
        acc[beacon] = beacon === 'MsgSix' ? false : true; // Explicitly set 'MsgSix' to false, others to true
        return acc;
      }, {})
    }));
    // Ensure to resume scanning only after updating the state
    startScanCycle();
  } else if (activeDevice && activeDevice.name === 'MsgSix') {
    // Navigate to the next chapter when 'MsgSix' is collected and its modal is closed
    navigation.navigate('ChapterSix');
  } else {
    // For any other modal, simply resume scanning without additional state updates
    startScanCycle();
  }

  setActiveDevice(null); // Close the modal by setting the active device to null
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

useFocusEffect(
  React.useCallback(() => {
    startScanCycle();
    return () => {
      stopScanCycle(); // Stop scanning when the screen loses focus
    };
  }, [])
);


useEffect(() => {
  const handleDevices = async () => {
    for (const device of devices) {
      // Check if the device has not been collected yet according to stayPink state
      if (!stayPink[device.name]) {
        const sound = soundObjectsRef.current[device.name];
        if (sound && !playedAudios[device.name]) {
          try {
            const status = await sound.getStatusAsync();
            // Ensure the sound is loaded and the device is within the desired RSSI range
            if (status.isLoaded && device.rssi < 0 && device.rssi > -45) {
              // Check if the collected device is 'MsgSix'
              if (device.name === 'MsgSix') {
                // Navigate to the next screen directly
                beacondetectHaptic();
                navigation.navigate('ChapterSix');
                return; // Exit the function early to prevent further execution
              }
              // Play audio for the device
              await sound.playAsync().catch((error) => {
                console.error(`Error playing sound for device ${device.name}:`, error);
              });
              // Update the playedAudios state to prevent replaying the audio
              setPlayedAudios(prev => ({ ...prev, [device.name]: true }));
              // Update the stayPink state to mark the device as collected
              setStayPink(prev => ({ ...prev, [device.name]: true }));
              beacondetectHaptic();
              // Set the active device to show the modal for this device
              setActiveDevice(device);
              // Stop scanning when a device is in range to avoid detecting multiple devices simultaneously
              stopScanCycle();
            }
          } catch (error) {
            console.error(`Error with sound for device ${device.name}:`, error);
          }
        }
      }
    }
  };
  
  handleDevices();
}, [devices, stayPink, playedAudios, soundObjectsRef, navigation, stopScanCycle]);




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
  <View style={{flex:1, backgroundColor: 'black'}}>

<ExitExperienceButton onPress={() => {
    Alert.alert(
      'Leave performance?',
      'Leaving will end the performance.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: navigateToStart,
        },
      ],
      { cancelable: true }
    );
  }} /> 
    <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />

  <SafeAreaView style={styles.container}>
  <View style={{flex: 2}}/>
    
    <View  style={{flex: 3}}>
    <Text style={styles.letterStyle}>Revisit the highlighted beacon</Text>
    </View>

      <CircleLayout devices={devices} stayPink={stayPink} />
      <View style={{flex: 1}}/>

      <View style={{flex: 2}}/>
  <TouchableOpacity
  style={{
    backgroundColor: 'transparent',
  }}
  onPress={handleSkip}
>
  <Text style={{ color: 'gray' }}>Skip</Text>
</TouchableOpacity>
      </SafeAreaView>

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
              <Ionicons name="close-sharp" size={20} color={'black'} />
              <Text style={{color: 'black', fontWeight: 700 }}>Close</Text>
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
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '50%',
    width: '100%',
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
  color: 'white',
  lineHeight: 30,
  textAlign: 'center'
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
  position: 'absolute',
},
whiteText: {
  color: 'white',
},
blackText: {
  color: 'black',
},
initialCircle: {
  backgroundColor:'aqua'
},
inRange: {
  backgroundColor: 'townhallColor',
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


export default GhostChapterFive;
