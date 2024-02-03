import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerComponent = ({ audioFile, volume = 1.0, autoPlay = false, onEnd, isPlaying }) => {
  const soundInstance = useRef(new Audio.Sound());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const controlPlayback = async () => {
      if (isLoaded) {
        if (isPlaying) {
          await soundInstance.current.playAsync();
        } else {
          await soundInstance.current.pauseAsync();
        }
      }
    };
  
    controlPlayback();
  }, [isPlaying, isLoaded]);
  

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundInstance.current.unloadAsync(); // Ensure no previous sound is loaded
        const status = await soundInstance.current.loadAsync(audioFile, { shouldPlay: autoPlay, volume: volume });
        setIsLoaded(true); // Indicate that the audio is loaded

        if (autoPlay) {
          await soundInstance.current.playAsync(); // Start playing if autoPlay is true
        }

        // Setup the playback status update listener
        soundInstance.current.setOnPlaybackStatusUpdate(playbackStatusUpdate);

      } catch (error) {
        console.error("Couldn't load or play sound", error);
        setIsLoaded(false); // Indicate the audio failed to load
      }
    };

    loadSound();

    return () => {
      soundInstance.current.unloadAsync(); // Cleanup by unloading the sound
      soundInstance.current.setOnPlaybackStatusUpdate(null); // Remove the status update listener
    };
  }, [audioFile, volume, autoPlay]);

  // Define the playback status update function
  const playbackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      // Playback finished
      onEnd && onEnd(); // Call the onEnd callback if provided
    }
  };

  // No UI needed for this component as per the current setup
  return null;
};

export default AudioPlayerComponent;