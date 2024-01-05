// AudioPlayerComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayerComponent = ({ audioFile, onPlaybackStatusChange, volume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundInstance = useRef(null);

  useEffect(() => {
    soundInstance.current = new Sound(audioFile, '', (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // loaded successfully
      soundInstance.current.setVolume(volume);
      soundInstance.current.play((success) => {
        if (success) {
          setIsPlaying(true);
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    });

    return () => {
      if (soundInstance.current) {
        soundInstance.current.release(); // Release the audio file
      }
    };
  }, [audioFile, volume]); // Reinitialize when audioFile or volume changes

  // Inform parent component about playback status
  useEffect(() => {
    onPlaybackStatusChange && onPlaybackStatusChange(isPlaying);
  }, [isPlaying, onPlaybackStatusChange]);

  return <View><Text>{isPlaying ? 'Playing' : 'Paused'}</Text></View>;
};

export default AudioPlayerComponent;

