import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import useBleRssiScanner from '../../hooks/useBleRssiScanner';
import { bleAudioComponentStyles } from '../../themes/bleAudioComponentStyles';
import { useIsFocused } from '@react-navigation/native';

const audioFile = require('../../assets/audio/Mayhap.mp3');

const BleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { devices } = useBleRssiScanner();
  const [sound, setSound] = useState(null);
  const isFocused = useIsFocused();

  // Load and unload the sound
  useEffect(() => {
    let isCancelled = false;

    const initSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
      if (!isCancelled) {
        setSound(newSound);
        console.log('Sound loaded successfully');
      }
    };

    initSound();

    return () => {
      isCancelled = true;
      sound?.unloadAsync();
    };
  }, []);

  // Handle RSSI check and play/pause sound
  useEffect(() => {
    let isMounted = true;
    let intervalId;

  
    const checkRssiAndPlayPauseSound = async () => {
      if (!isMounted) return;
  
      const isAnyDeviceClose = devices.some(device => device.rssi > -55);
      if (isAnyDeviceClose && !isPlaying && sound) {
        await sound.setVolumeAsync(1);
        await sound.playAsync();
        setIsPlaying(true);
      } else if (!isAnyDeviceClose && isPlaying && sound) {
        await sound.setVolumeAsync(0);
        await sound.pauseAsync();
        setIsPlaying(false);
      }
  
      setTimeout(checkRssiAndPlayPauseSound, 1000); // Scheduling next check
    };
  
    checkRssiAndPlayPauseSound(); // Initial call
  
    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clearing the interval
    };
  }, [devices, isPlaying, sound]);
  

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