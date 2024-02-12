import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Gyroscope } from 'expo-sensors';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const GyroAudioPlayerComponentBasicExpo = ({ gyroAudioFile }) => {
  const navigation = useNavigation();
  const [isSoundReady, setIsSoundReady] = useState(false);
  const [sound, setSound] = useState(null);
  const gyroDataRef = useRef({ x: 0, y: 0, z: 0 });
  const targetVolumeRef = useRef(0.1); // Adjusted initial volume from the first snippet
  const isFocused = useIsFocused();
  const gyroSubscriptionRef = useRef(null);

  useEffect(() => {
    let isComponentMounted = true;

    const loadSound = async () => {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        gyroAudioFile,
        { shouldPlay: false, isLooping: true, volume: targetVolumeRef.current }
      );
      if (isComponentMounted) {
        setSound(soundObject);
        setIsSoundReady(true);
      }
    };

    loadSound();

    return () => {
      isComponentMounted = false;
      sound?.unloadAsync().catch(console.error);
      setIsSoundReady(false);
    };
  }, []);

  useEffect(() => {
    const subscription = Gyroscope.addListener(({ x, y, z }) => {
      gyroDataRef.current = { x, y, z };
    });
    gyroSubscriptionRef.current = subscription;

    // Proper cleanup from the second snippet
    return () => {
      console.log('Unsubscribing from gyroscope updates');
      gyroSubscriptionRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      sound?.unloadAsync().catch(console.error);
      gyroSubscriptionRef.current?.remove();
    });

    return unsubscribe;
  }, [navigation, sound]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!sound) return;

      try {
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
          return;
        }

        const { x, y, z } = gyroDataRef.current;
        // Enhanced sensitivity calculation from the first snippet
        const movement = Math.sqrt(x * x + y * y + z * z);
        const volume = Math.min(Math.max(movement / 2, 0.05), 1);
        targetVolumeRef.current = volume;
        await sound.setVolumeAsync(volume).catch(console.error);
      } catch (error) {
        console.error('Error during interval operation', error);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isSoundReady, sound]);

  useEffect(() => {
    const managePlayback = async () => {
      if (!sound || !isSoundReady || !isFocused) return;

      try {
        const status = await sound.getStatusAsync();
        if (!status.isPlaying) {
          await sound.playAsync();
        }
      } catch (error) {
        console.error('Error during playback management', error);
      }
    };

    managePlayback();
  }, [isFocused, isSoundReady, sound]);

  return (
    <View/>
  );
};

export default GyroAudioPlayerComponentBasicExpo;