import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Audio } from 'expo-av';
import gyroAudioFile from '../../../assets/audio/townHall/loststoriesAmbient.mp3';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import useBleRssiScannerTownHall from '../../../hooks/useBleRssiScannerTownHall';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { Ionicons } from '@expo/vector-icons';
import ScanIndicator from '../../../components/visual/scanIndicator';
import LinearGradient from 'react-native-linear-gradient';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const townhallColor = '#EFD803';

const IntroSection = ( ) => {
  const navigation = useNavigation();
  const soundRef = useRef(null);

  useEffect(() => {
    const loadAndPlayAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/audio/townHall/acknowledgement.mp3'), 
        { shouldPlay: true }
      );
      soundRef.current = sound;

      return () => {
        soundRef.current?.unloadAsync();
      };
    };

    loadAndPlayAudio();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor:'black'}}>
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
          onPress: navigation.goBack,
        },
      ],
      { cancelable: true }
    );
  }} />
    <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center'}}>
     <Image source={require('../townHall/lostStories_logo.png')} tintColor={'white'} resizeMode="contain" style={{width: '80%', height: undefined, aspectRatio: 2 }}/>
      <Text style={{color:'white', textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 600,}}>Acknowledgement of Country.</Text>
      <Text style={{color:'white', textAlign: 'center'}}>We acknowledge the traditional custodians of the land on which we gather, the Darug people. We pay our respects to their elders past and present, and acknowledge their deep and ongoing connection to the land, waters and culture. As you step into this experience and connect with stories of place, we ask you to take a moment to acknowledge that sovereignty was never ceded, and that this land always was, and always will be, Aboriginal land. </Text>
    </View>
    </View>
);
  };

const CreditsSection = ({ onDone }) => {
  const navigation = useNavigation();

  return (
  <View style={{flex: 1, backgroundColor:'black'}}>
  <ExitExperienceButton onPress={() => navigation.goBack()} />
  <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center'}}>
   <Image source={require('../townHall/lostStories_logo.png')} tintColor={'white'} resizeMode="contain" style={{width: '80%', height: undefined, aspectRatio: 2 }}/>
    <Text style={{color:'white', textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 600,}}>Congratulations, you've collected all the stories!</Text>
    <Text style={{color:'white', textAlign: 'center'}}>Thanks for participating in Lost Stories. Found. We recommend catching IF THESE WALLS COULD SING, an immersive theatre and song event hosted here at Town Hall runnings Fridays, Saturdays and Sundays till March 3. These initiatives are proudly supported by the NSW Government through the Culture Up Late Western Sydney Program. </Text>
  </View>
  </View>
);
  };

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

const TownHallStartScreen = ({ navigation }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showCredits, setShowCredits] = useState(false);

  const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerTownHall();
  const soundObjectsRef = useRef({});
  const [playedAudios, setPlayedAudios] = useState({});
  const [stayPink, setStayPink] = useState({}); 
  const [allCollected, setAllCollected] = useState(false);
  const beaconsCollectedCount = Object.values(stayPink).filter(status => status).length;
  const [activeDevice, setActiveDevice] = useState(null); // State to track the active device for the pop-up  
  const [shownModals, setShownModals] = useState({});

  useEffect(() => {
    // Hide intro and show main content after 10 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = async () => {
    console.log('Closing Modal'); // Debugging line
    if (activeDevice && soundObjectsRef.current[activeDevice.name]) {
      await soundObjectsRef.current[activeDevice.name].stopAsync(); // Stop the audio
    }
    setActiveDevice(null); // Close the modal by setting modalDevice to null
    startScanCycle(); // Resume scanning

  // New logic to trigger CreditsSection after last beacon's modal is closed
      if (allCollected) {
        setShowCredits(true);
        setTimeout(() => {
          setShowCredits(false);
          navigation.goBack();
        }, 10000);
        setAllBeaconsCollected(false); // Reset this flag
      }
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
  

  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" />
      {showIntro && <IntroSection />}
      {!showIntro && !showCredits && (
      <ImageBackground 
        source={require('../townHall/townHall_bg.jpg')} 
        style={{ flex: 1 }}
        resizeMode="cover"
      >
    <LinearGradient
      colors={['rgba(0,0,0,0.5)', 'rgba(244, 226, 59, 0.8)']}
      locations={[0, 0.7]}
      style={{ flex: 1 }}
    >
    
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
          onPress: navigation.goBack,
        },
      ],
      { cancelable: true }
    );
  }} />
    <SafeAreaView style={styles.container}>

      <View style={{flex: 1}}/>

      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../townHall/lostStories_logo.png')} tintColor={townhallColor} resizeMode="contain" style={{width: '100%', height: undefined, aspectRatio: 2 }}/>
        <Text style={styles.heroText}>
        Explore Town Hall and hold this device close to one of the five LOST STORIES objects to dive deeper.  
        </Text>
      </View>


      <View style={{flex: 1}}/>
      
      <View style={styles.scanTopbarWrapper}>
        <BlurView 
          style={styles.scanTopbar}
          blurType='dark'
          blurAmount={20}>
            <ScanIndicator/>
        </BlurView>
      </View>

      <View style={styles.scanBoxWrapper}>
        <BlurView 
          style={styles.scanBox}
          blurType='dark'
          blurAmount={20}>
          <Text style={{ textAlign: 'center', paddingVertical: 20, color: townhallColor }}>{beaconsCollectedCount} out of 5 Lost Stories Found.</Text>
          {allCollected && <Text>All stories have been found.!</Text>}
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

      {/* <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} /> */}

      
      
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
            {/* <Image
              className="rounded-lg mb-4"
              source={activeDevice.image}
              resizeMode="contain"
              style={{ width: '100%', height: undefined, aspectRatio: 1 }}
            /> */}
            <Text>{activeDevice.description}</Text>
          </ScrollView>
        </>
      </View>
    </View>
  )}
</Modal>
    </SafeAreaView>
    </LinearGradient>
    </ImageBackground>
          )}
          {showCredits && <CreditsSection onDone={() => navigation.goBack()} />}
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
    borderBottomWidth: 1,
    borderBottomColor: townhallColor,
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

export default TownHallStartScreen;