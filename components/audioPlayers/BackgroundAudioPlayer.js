import React, { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const BackgroundAudioPlayer = ({ audioFile, play, fadeOut }) => {
  const sound = useRef(new Audio.Sound());
  const fadeOutIntervalRef = useRef();

  useEffect(() => {
    const loadAndPlay = async () => {
      try {
        // Check if the sound object is already loaded
        const status = await sound.current.getStatusAsync();
        if (!status.isLoaded) {
          // Load the sound
          await sound.current.loadAsync(audioFile);
          await sound.current.setIsLoopingAsync(true); // Ensure it's looping initially if required
        }
        if (play) {
          await sound.current.playAsync();
        }
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    };

    if (play) {
      loadAndPlay();
    }

    return () => {
      sound.current.unloadAsync(); // Ensure the sound is unloaded when the component unmounts
    };
  }, [audioFile, play]);

  useEffect(() => {
    if (fadeOut) {
      const startFadeOut = async () => {
        await sound.current.setIsLoopingAsync(false); // Disable looping
        let volume = 1;
        const fadeOutDuration = 15000; // Total duration of the fade out
        const fadeOutStep = 0.01; // Volume decrease step
        const intervalTime = fadeOutDuration * fadeOutStep / volume; // Time between each step

        fadeOutIntervalRef.current = setInterval(async () => {
          volume -= fadeOutStep;
          if (volume <= 0) {
            clearInterval(fadeOutIntervalRef.current);
            await sound.current.stopAsync(); // Stop playback
            await sound.current.setVolumeAsync(1); // Reset volume for potential future plays
            return;
          }
          await sound.current.setVolumeAsync(volume);
        }, intervalTime);
      };

      startFadeOut();
    }

    return () => {
      if (fadeOutIntervalRef.current) {
        clearInterval(fadeOutIntervalRef.current);
      }
    };
  }, [fadeOut]);

  return null; // This component does not render anything
};

export default BackgroundAudioPlayer;
