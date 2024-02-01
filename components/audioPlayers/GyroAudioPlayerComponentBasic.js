import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { gyroscope } from 'react-native-sensors';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const GyroAudioPlayerComponentBasic = ({ gyroAudioFile }) => {
  const navigation = useNavigation();
  const [isSoundReady, setIsSoundReady] = useState(false);
  const [sound, setSound] = useState(null);
  const gyroDataRef = useRef({ x: 0, y: 0, z: 0 });
  const targetVolumeRef = useRef(0.1); // Start with initial volume
  const isFocused = useIsFocused();
  const gyroSubscriptionRef = useRef(null); // Use a ref to hold the subscription

  useEffect(() => {
    let isComponentMounted = true; // Track component mount status

    const loadSound = async () => {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        gyroAudioFile,
        { shouldPlay: false, isLooping: true, volume: 0.1 }
      );
      if (isComponentMounted) {
        setSound(soundObject);
        setIsSoundReady(true); // Update state to indicate sound is ready
      }
    };

    loadSound();

    return () => {
      isComponentMounted = false; // Indicate component has unmounted
      sound?.unloadAsync().catch(console.error);
      setIsSoundReady(false); // Ensure sound state is reset
    };
  }, []); // Removed duplicate useEffect

  useEffect(() => {
    console.log('Subscribing to gyroscope updates');
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      gyroDataRef.current = { x, y, z };
    });
    gyroSubscriptionRef.current = gyroSubscription;
  
    return () => {
      console.log('Unsubscribing from gyroscope updates');
      gyroSubscriptionRef.current?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      sound?.unloadAsync().catch(console.error);
      gyroSubscriptionRef.current?.unsubscribe();
    });

    return unsubscribe;
  }, [navigation, sound]);

  useEffect(() => {
    if (!isSoundReady) {
      return;
    }

    const interval = setInterval(async () => {
      if (!sound) return; // Guard against sound not being loaded

      try {
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
          return;
        }

        const { x, y, z } = gyroDataRef.current;
        const avg = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
        const scaledAvg = Math.min(avg / 10, 1); // Adjust sensitivity as needed
        targetVolumeRef.current = scaledAvg;
        await sound.setVolumeAsync(scaledAvg).catch(console.error);
      } catch (error) {
        console.error('Error during interval operation', error);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isSoundReady, sound]);

  useEffect(() => {
    const managePlayback = async () => {
      if (!sound || !isSoundReady) return; // Guard against sound not being ready

      try {
        const status = await sound.getStatusAsync();
        if (isFocused && !status.isPlaying) {
          await sound.playAsync();
        } else if (!isFocused && status.isPlaying) {
          await sound.pauseAsync();
        }
      } catch (error) {
        console.error('Error during playback management', error);
      }
    };

    managePlayback();
  }, [isFocused, isSoundReady, sound]);

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

    </View>
  );
};

export default GyroAudioPlayerComponentBasic;
