// AudioPlayerComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayerComponent = ({ audioFile, onPlaybackStatusChange, volume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);  // Track if audio is loaded
  const soundInstance = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        // Unloading any previous sound
        await soundInstance.current.unloadAsync();

        // Loading the sound from the provided file
        await soundInstance.current.loadAsync(audioFile, { shouldPlay: false, volume: volume });
        setIsLoaded(true);  // Set as loaded if successful

        // More setup code here...

      } catch (error) {
        console.error('Failed to load the sound', error);
        // Additional error handling
      }
    };

    loadSound();

    return () => soundInstance.current.unloadAsync(); // Cleanup function
  }, [audioFile, volume]);

  const togglePlayback = async () => {
    if (!isLoaded) {
      console.log('Audio is not loaded yet');
      return;  // Exit if audio is not loaded
    }
    
    try {
      if (isPlaying) {
        await soundInstance.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundInstance.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error during toggle playback', error);
      // Additional error handling
    }
  };

  return (
    <View>
      <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
      <TouchableOpacity onPress={togglePlayback} disabled={!isLoaded}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayerComponent;

