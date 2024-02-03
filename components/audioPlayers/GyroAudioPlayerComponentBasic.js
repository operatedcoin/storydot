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
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      gyroDataRef.current = { x, y, z };
    });
    gyroSubscriptionRef.current = gyroSubscription;

    // Proper cleanup from the second snippet
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
      if (!sound || !isSoundReady) return;

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
      {/* UI Components */}
    </View>
  );
};

export default GyroAudioPlayerComponentBasic;
