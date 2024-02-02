import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScannerTownHall from '../../hooks/useBleRssiScannerTownHall';
import { Ionicons } from '@expo/vector-icons';

const townhallColor = '#C7019C'; // Define the color value that you want for the townhall


const BleBeaconAudioTownHall = () => {
    const { devices, startScanCycle, stopScanCycle } = useBleRssiScannerTownHall();
    const soundObjectsRef = useRef({});
    const [playedAudios, setPlayedAudios] = useState({});
    const [stayPink, setStayPink] = useState({});
    const [activeDevice, setActiveDevice] = useState(null);
    const [allCollected, setAllCollected] = useState(false);


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

  // Additional logic and return statement
  return (
    <View style={styles.container}>
      {/* Your adapted UI components and layout */}
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
export default BleBeaconAudioTownHall;