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
    const checkRssiAndPlayPauseSound = () => {
      const isAnyDeviceClose = devices.some(device => device.rssi > -55);

      if (isAnyDeviceClose && !isPlaying && sound) {
        try {
          sound.setVolumeAsync(1);
          sound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing sound: ', error);
        }
      } else if (!isAnyDeviceClose && isPlaying && sound) {
        try {
          sound.setVolumeAsync(0);
          sound.pauseAsync();
          setIsPlaying(false);
        } catch (error) {
          console.error('Error stopping sound: ', error);
        }
      }
    };

    // Start checking RSSI and audio playback state every 100 milliseconds
    const intervalId = setInterval(checkRssiAndPlayPauseSound, 100);

    return () => {
      clearInterval(intervalId); // Clean up the interval
    };
  }, [devices, isPlaying, sound]);

  useEffect(() => {
    if (!isFocused && isPlaying && sound) {
      (async () => {
        try {
          await sound.pauseAsync();
          setIsPlaying(false);
        } catch (error) {
          console.error('Error pausing sound: ', error);
        }
      })();
    }
  }, [isFocused, isPlaying, sound]);

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error('Error pausing sound: ', error);
      }
    } else {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing sound: ', error);
      }
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