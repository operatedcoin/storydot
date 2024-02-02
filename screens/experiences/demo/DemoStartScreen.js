import BleAudioPlayer from '../../../components/audioPlayers/BleAudioPlayer';
import { globalStyles } from '../../../themes/globalStyles';
import CompassPlayer from '../../../components/sensors/CompassPlayer';
import { Magnetometer } from 'expo-sensors';
import bleDashboardComponent from '../../../components/ble/bleDashboardComponent';
import BleBeaconAudioTownHall from '../../../components/audioPlayers/BleBeaconAudioTownHall';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScannerTownHall from '../../../hooks/useBleRssiScannerTownHall';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import ScanIndicator from '../../../components/visual/scanIndicator';
import LinearGradient from 'react-native-linear-gradient';



const townhallColor = '#C7019C';

const DeviceCircle = ({ device, inRange, stayPink }) => {
  const circleColor = stayPink ? styles.lightPink : (inRange ? styles.inRange : styles.initialCircle);
  const circleText = stayPink ? 'white' : (inRange ? 'white' : townhallColor);


  return (
    <View style={[styles.circle, circleColor]}>
      <Text style={{color: circleText}}>{device.title}</Text>
      {/* <Text style={{color: circleText}}>{device.rssi}</Text> */}
    </View>
  );
};

const DemoStartScreen = () => {
  const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerTownHall();
  const soundObjectsRef = useRef({});
  const [playedAudios, setPlayedAudios] = useState({});
  const [stayPink, setStayPink] = useState({}); 
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up  
  const [shownModals, setShownModals] = useState({});


useEffect(() => {
  startScanCycle();
  return () => stopScanCycle();
}, []);

useEffect(() => {
  devices.forEach(async (device) => {
    if (!soundObjectsRef.current[device.name]) {
      const { sound } = await Audio.Sound.createAsync(device.audioFile);
      soundObjectsRef.current[device.name] = sound;
    }

    const sound = soundObjectsRef.current[device.name];
    if (sound && !playedAudios[device.name] && device.rssi < 0 && device.rssi > -45) {
      await sound.playAsync();
      setPlayedAudios(prev => ({ ...prev, [device.name]: true }));
      setActiveDevice(device);
    }
  });
}, [devices]);

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

useEffect(() => {
  const checkAllCollected = Object.values(stayPink).length === devices.length &&
                            Object.values(stayPink).every(status => status);
  setAllCollected(checkAllCollected);
}, [stayPink]);



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

// Additional logic and return statement
return (
  <View style={{flex: 1}}>
    <ImageBackground 
      source={require('../../../assets/images/placeholder.png')} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
  <LinearGradient
    colors={['rgba(0,0,0,0.5)', 'rgba(199, 1, 156, 0.8)']}
    locations={[0, 0.5]}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={{paddingTop:10, paddingLeft:10, zIndex: 100}}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
        <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: 15,    
              width: 30,            
              height: 30,
              overlayColor: "white",
              opacity: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            blurType="light"
            blurAmount={10}
          >
          <Ionicons name="close-sharp" size={26} color="white" style={{paddingLeft: 2}} />
          </BlurView>
        </TouchableOpacity>
        </SafeAreaView>

  <SafeAreaView style={styles.container}>

    <View style={{flex: 1}}/>

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.heroTitle}>Lost stories. Found.</Text>
      <Text style={styles.heroText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet tristique purus. Integer hendrerit ac enim in cursus. Curabitur luctus venenatis lorem semper commodo.
      </Text>
    </View>


    <View style={{flex: 1}}/>
    
    <View style={styles.scanTopbarWrapper}>
      <BlurView 
        style={styles.scanTopbar}
        blurType='dark'>
          <ScanIndicator/>
      </BlurView>
    </View>

    <View style={styles.scanBoxWrapper}>
      <BlurView 
        style={styles.scanBox}
        blurType='xlight'
        blurAmount={20}>
        <Text style={{ textAlign: 'center', paddingVertical: 20, color: townhallColor }}>{beaconsCollectedCount} out of 5 stories collected</Text>
        {allCollected && <Text>All devices collected!</Text>}
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
      </BlurView>
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
            <Ionicons name="close-outline" size={24} color={townhallColor} />
            <Text style={{color: townhallColor, }}>Close</Text>
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
  </SafeAreaView>
  </LinearGradient>
  </ImageBackground>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  exitButton: {
    padding: 6,
    borderRadius: 12,
  },
  exitButtonText: {
    fontSize: 12,
    color: 'white',
    paddingRight: 10,
  },
  scanTopbarWrapper: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    width: '100%',
    minHeight: 40,
  },
  scanTopbar: {
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  scanBoxWrapper: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  scanBox: {
    paddingTop: 10,
    paddingBottom: 20,
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
    },
    modalView: {
      backgroundColor: 'white', // Solid background for the modal
      padding: 30,
      borderTopLeftRadius: 10, // Optional, for rounded corners at the top
      borderTopRightRadius: 10, // Optional, for rounded corners at the top
      height: '80%', // Adjust this value as needed
      // You can also use a specific value like height: 300
    },
    heroTitle: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 24,
      paddingBottom: 20,
    },
    heroText: {
      color: 'white',
      textAlign: 'center'
    }
  
  });

export default DemoStartScreen;
