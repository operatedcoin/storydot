import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const BackgroundAudioPlayer = ({ audioFile, play }) => {
  useEffect(() => {
    let sound;

    const loadAndPlay = async () => {
      try {
        // Load the sound
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
        sound = newSound;

        // Set the sound to loop
        await sound.setIsLoopingAsync(true);

        if (play) {
          await sound.playAsync();
        }
      } catch (error) {
        console.log('Error loading or playing sound:', error);
      }
    };

    loadAndPlay();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when the component unmounts
      }
    };
  }, [audioFile, play]);

  return null; // This component does not render anything
};

export default BackgroundAudioPlayer;
