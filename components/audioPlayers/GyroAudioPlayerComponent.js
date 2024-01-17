import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { gyroscope } from 'react-native-sensors';
import { useIsFocused } from '@react-navigation/native';

const GyroAudioPlayerComponent = ({ audioFile }) => {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [sound, setSound] = useState(null);
  const [normalizedAverage, setNormalizedAverage] = useState(0);
  const isFocused = useIsFocused();

  // Load sound only once
  useEffect(() => {
    let soundObject;

    const loadSound = async () => {
      ({ sound: soundObject } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false, isLooping: true, volume: 0.1 } // Initial configuration
      ));
      setSound(soundObject);
    };

    loadSound();

    return () => {
      soundObject?.unloadAsync();
    };
  }, []);

  // Gyroscope subscription
  useEffect(() => {
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      // Debounce or throttle this update if needed
      setGyroData({ x, y, z });
    });

    return () => {
      gyroSubscription.unsubscribe();
    };
  }, []);

  // Update volume based on gyroscope
  useEffect(() => {
    const updateVolume = async () => {
      if (sound) {
        const avg = (Math.abs(gyroData.x) + Math.abs(gyroData.y) + Math.abs(gyroData.z)) / 3;
        const scaledAvg = Math.min(avg / 2.5, 1);
        const newVolume = 0.1 + (0.9 - 0.1) * scaledAvg;
        await sound.setVolumeAsync(newVolume);
        setNormalizedAverage(scaledAvg);
      }
    };

    updateVolume();
  }, [gyroData, sound]);

  // Manage playback based on focus
  useEffect(() => {
    const managePlayback = async () => {
      if (sound) {
        if (isFocused) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
        }
      }
    };

    managePlayback();
  }, [isFocused, sound]);

  const togglePlayback = async () => {
    if (!sound) {
      console.log('Audio is not loaded yet');
      return;
    }
    try {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error during toggle playback', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={togglePlayback}>
        <Text>Toggle Playback</Text>
      </TouchableOpacity>
      <Text>Gyroscope Data:</Text>
      {/* Optionally, reduce the frequency of these updates */}
      <Text>X: {gyroData.x.toFixed(2)}</Text>
      <Text>Y: {gyroData.y.toFixed(2)}</Text>
      <Text>Z: {gyroData.z.toFixed(2)}</Text>
      <Text>Normalized Average: {normalizedAverage.toFixed(2)}</Text>
      <Text>Current Volume: {(0.1 + (0.9 - 0.1) * normalizedAverage).toFixed(2)}</Text>
    </View>
  );
};

export default GyroAudioPlayerComponent;
