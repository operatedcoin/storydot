import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { gyroscope } from 'react-native-sensors';
import { useIsFocused } from '@react-navigation/native';

const GyroAudioPlayerComponent = ({ audioFile }) => {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [sound, setSound] = useState(null);
  const [normalizedAverage, setNormalizedAverage] = useState(0);
  const minVolume = 0.0;
  const maxVolume = 1.0;
  const maxGyroValue = 2.5; // Adjust this value based on the gyroscope's range
  const isFocused = useIsFocused();

  const loadSound = async () => {
    const { sound: soundObject } = await Audio.Sound.createAsync(
      audioFile,
      { shouldPlay: true, isLooping: true, volume: minVolume } // Start with a default volume
    );
    setSound(soundObject);
  };

  useEffect(() => {
    let gyroSubscription;

    const setupGyroscope = async () => {
      await loadSound(); // Ensure sound is loaded before setting up the gyroscope

      gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
        setGyroData({ x, y, z });

        const avg = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
        const scaledAvg = Math.min(avg / maxGyroValue, 1);
        setNormalizedAverage(scaledAvg);
      });
    };

    setupGyroscope();

    return () => {
      if (gyroSubscription) {
        gyroSubscription.unsubscribe();
      }
      if (sound) {
        sound.stopAsync(); // Stop the sound
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      const newVolume = minVolume + (maxVolume - minVolume) * normalizedAverage;
      sound.setVolumeAsync(newVolume);
    }
  }, [normalizedAverage, sound]);

  useEffect(() => {
    // New useEffect for handling focus changes
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
      <TouchableOpacity onPress={togglePlayback}><Text>Toggle Playback</Text>
</TouchableOpacity>
<Text>Gyroscope Data:</Text>
<Text>X: {gyroData.x.toFixed(2)}</Text>
<Text>Y: {gyroData.y.toFixed(2)}</Text>
<Text>Z: {gyroData.z.toFixed(2)}</Text>
<Text>Normalized Average: {normalizedAverage.toFixed(2)}</Text>
<Text>Current Volume: {(minVolume + (maxVolume - minVolume) * normalizedAverage).toFixed(2)}</Text>
</View>
);
};

export default GyroAudioPlayerComponent;
       
