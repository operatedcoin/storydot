import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../hooks/useBleRssiScanner';
import { bleAudioComponentStyles } from '../../themes/bleAudioComponentStyles';
import { useIsFocused } from '@react-navigation/native';

const BleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { devices } = useBleRssiScanner();
  const [sound, setSound] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isCancelled = false;
    const loadAndPlaySound = async (audioFile) => {
      try {
        if (sound) {
          console.log('Unloading previous sound');
          await sound.unloadAsync();
        }
    
        console.log('Loading new sound');
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
    
        if (!isCancelled) {
          setSound(newSound);
          console.log('Playing sound');
          await newSound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    };
  
    const checkRssiAndPlayPauseSound = async () => {
      const closestDevice = devices.find(device => device.rssi > -55);
      console.log('Closest Device:', closestDevice);
  
      if (closestDevice) {
        console.log('Loading sound for closest device');
        await loadAndPlaySound(closestDevice.audioFile);
      } else if (isPlaying) {
        console.log('No close device. Pausing sound.');
        sound?.pauseAsync();
        setIsPlaying(false);
      }
  
      if (!isCancelled) {
        setTimeout(checkRssiAndPlayPauseSound, 1000);
      }
    };
  
    checkRssiAndPlayPauseSound();
  
    return () => {
      isCancelled = true;
      sound?.unloadAsync();
    };
  }, [devices, isPlaying]);
  

  // Handle un-focus
  useEffect(() => {
    if (!isFocused && isPlaying && sound) {
      sound.pauseAsync();
      setIsPlaying(false);
    }
  }, [isFocused, isPlaying, sound]);

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