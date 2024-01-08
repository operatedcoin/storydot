import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { bleAudioComponentStyles } from '../../themes/bleAudioComponentStyles'; // Assuming this is the correct path
import useBleRssiScanner from '../../hooks/useBleRssiScanner'; // Assuming this is the correct path
import { useIsFocused } from '@react-navigation/native';


const audioFile = require('../../assets/audio/Mayhap.mp3');

const BleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { devices } = useBleRssiScanner();
  const [sound, setSound] = useState(null);
  const fadeOutTimeout = useRef(null);
  // Clearing the timeout
if (fadeOutTimeout.current) {
  clearTimeout(fadeOutTimeout.current);
  fadeOutTimeout.current = null; // Reset after clearing
}
  const isFocused = useIsFocused(); // React Navigation hook to check if the screen is focused


  useEffect(() => {
    const initSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
      setSound(newSound);
      console.log('Sound loaded successfully');
    };

    initSound();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

 
  useEffect(() => {
    const playPauseSound = async () => {
      const isAnyDeviceClose = devices.some(device => device.rssi > -55);

      if (isAnyDeviceClose && !isPlaying && sound) {
        if (fadeOutTimeout.current) {
          clearTimeout(fadeOutTimeout.current);
          fadeOutTimeout.current = null;
        }
        try {
          await sound.setVolumeAsync(1);
          await sound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing sound: ', error);
        }
      } else if (!isAnyDeviceClose && isPlaying && sound) {
        if (!fadeOutTimeout.current) {
          fadeOutTimeout.current = setTimeout(async () => {
            // ...fade out logic, ideally decreasing volume over time...
            setIsPlaying(false);
          }, 5000); // After 5 seconds of being away
        }
      }
    }; 

    playPauseSound();
    return () => {
      if (fadeOutTimeout) {
        clearTimeout(fadeOutTimeout);
      }
    };
  }, [devices, isPlaying, sound, isFocused]);

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={bleAudioComponentStyles.container}>
      <TouchableOpacity style={bleAudioComponentStyles.button} onPress={togglePlayback}>
        <Text>{isPlaying ? 'Playing' : 'Not Playing'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BleAudioPlayer;