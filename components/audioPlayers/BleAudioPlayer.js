import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { bleAudioComponentStyles } from '../../themes/bleAudioComponentStyles'; // Assuming this is the correct path
import useBleRssiScanner from '../../hooks/useBleRssiScanner'; // Assuming this is the correct path

// Use require for local assets
const audioFile = require('../../assets/audio/Mayhap.mp3'); // Update with the actual file path

const BleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { devices } = useBleRssiScanner();
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        // Unload any previously loaded sound
        await sound.current.unloadAsync();
        // Load the sound file
        await sound.current.loadAsync(audioFile);
      } catch (error) {
        console.error('Error loading sound: ', error);
      }
    };

    loadSound();

    return () => {
      sound.current.unloadAsync(); // Unload the sound when the component is unmounted
    };
  }, []);

  useEffect(() => {
    const playPauseSound = async () => {
      const targetDevice = devices.find(device => device.id === 'your_device_id');
      if (targetDevice && targetDevice.rssi > -55 && !isPlaying) {
        try {
          await sound.current.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing sound: ', error);
        }
      } else if ((targetDevice && targetDevice.rssi <= -55) || (!targetDevice && isPlaying)) {
        try {
          await sound.current.stopAsync();
          setIsPlaying(false);
        } catch (error) {
          console.error('Error stopping sound: ', error);
        }
      }
    };

    playPauseSound();
  }, [devices, isPlaying]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={bleAudioComponentStyles.container}>
      <TouchableOpacity
        style={bleAudioComponentStyles.button}
        onPress={togglePlayback}
      >
        <Text>{isPlaying ? 'Playing' : 'Not Playing'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BleAudioPlayer;
