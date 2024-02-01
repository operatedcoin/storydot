import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayerComponent = ({ audioFile, volume = 1.0, autoPlay = false }) => {
  const soundInstance = useRef(new Audio.Sound());
  const [isLoaded, setIsLoaded] = useState(false); // Define isLoaded state here

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundInstance.current.unloadAsync(); // Ensure no previous sound is loaded
        await soundInstance.current.loadAsync(audioFile, { shouldPlay: autoPlay, volume: volume });
        setIsLoaded(true); // Indicate that the audio is loaded

        if (autoPlay) {
          await soundInstance.current.playAsync(); // Start playing if autoPlay is true
        }
      } catch (error) {
        console.error("Couldn't load or play sound", error);
        setIsLoaded(false); // Indicate the audio failed to load
      }
    };

    loadSound();

    return () => {
      soundInstance.current.unloadAsync(); // Cleanup by unloading the sound
    };
  }, [audioFile, volume, autoPlay]);

  // No need to show play/pause button or status text if using autoPlay
  return null;
};

export default AudioPlayerComponent;
