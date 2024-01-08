import React, { useState, useEffect, useRef } from 'react';
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
  const fadeOutTimeout = useRef(null);
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
    const playPauseSound = async () => {
      const isAnyDeviceClose = devices.some(device => device.rssi > -55);

      if (isAnyDeviceClose && !isPlaying && sound) {
        if (fadeOutTimeout.current) {
          clearTimeout(fadeOutTimeout.current);
          fadeOutTimeout.current = null;
        }
        try {
          await sound.setVolumeAsync(1);
          await sound.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing sound: ', error);
        }
      } else if (!isAnyDeviceClose && isPlaying && sound) {
        if (!fadeOutTimeout.current) {
          fadeOutTimeout.current = setTimeout(async () => {
            if (isPlaying && sound) {
              try {
                await sound.setVolumeAsync(0);
                await sound.pauseAsync();
                setIsPlaying(false);
              } catch (error) {
                console.error('Error stopping sound: ', error);
              }
            }
          }, 0); // After 5 seconds of being away
        }
      }
    };

    playPauseSound();
    return () => {
      if (fadeOutTimeout.current) {
        clearTimeout(fadeOutTimeout.current);
      }
    };
  }, [devices, isPlaying, sound]);

  useEffect(() => {
    if (!isFocused && isPlaying && sound) {
      (async () => {
        await sound.pauseAsync();
        setIsPlaying(false);
      })();
    }
    return () => {
      if (fadeOutTimeout.current) {
        clearTimeout(fadeOutTimeout.current);
      }
    };
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
