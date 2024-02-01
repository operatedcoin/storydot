import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { gyroscope } from 'react-native-sensors';
import { useIsFocused } from '@react-navigation/native';

const GyroAudioPlayerComponentBasic = ({ gyroAudioFile }) => {
  const [sound, setSound] = useState(null);
  const gyroDataRef = useRef({ x: 0, y: 0, z: 0 });
  const targetVolumeRef = useRef(0.1); // Start with initial volume
  const isFocused = useIsFocused();

  useEffect(() => {
    let soundObject;

    const loadSound = async () => {
      ({ sound: soundObject } = await Audio.Sound.createAsync(
        gyroAudioFile,
        { shouldPlay: false, isLooping: true, volume: 0.1 }
      ));
      setSound(soundObject);
    };

    loadSound();

    return () => {
      soundObject?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      gyroDataRef.current = { x, y, z };
    });

    return () => {
      gyroSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const { x, y, z } = gyroDataRef.current;
        const avg = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
        const scaledAvg = Math.min(avg / 1.0, 1); // Increased sensitivity
        targetVolumeRef.current = scaledAvg; // Direct mapping to volume

        const currentVolume = await sound.getStatusAsync().then(status => status.volume);
        const newVolume = currentVolume + (targetVolumeRef.current - currentVolume) / 2; // Faster interpolation
        await sound.setVolumeAsync(newVolume);
      }, 200); 

      return () => clearInterval(interval);
    }
  }, [sound]);

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

  // return (
  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  // <TouchableOpacity onPress={togglePlayback}>
  // <Text>Toggle Playback</Text>
  // </TouchableOpacity>
  // {/* Optionally, reduce the frequency of these updates or remove them for better performance */}
  // <Text>Gyroscope Data:</Text>
  // <Text>X: {gyroDataRef.current.x.toFixed(2)}</Text>
  // <Text>Y: {gyroDataRef.current.y.toFixed(2)}</Text>
  // <Text>Z: {gyroDataRef.current.z.toFixed(2)}</Text>
  // </View>
  // );
  };
  
  export default GyroAudioPlayerComponentBasic;
