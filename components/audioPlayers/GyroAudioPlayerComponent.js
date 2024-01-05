// GyroAudioPlayerComponent.js
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import GyroscopeComponent from '../sensors/GyroscopeComponent';
import AudioPlayerComponent from './AudioPlayerComponent';

const GyroAudioPlayerComponent = ({ audioFile, onVolumeChange }) => {
  const [volume, setVolume] = useState(0.5);
  
  const handleGyroData = ({ x, y, z }) => {
    const movement = Math.sqrt(x*x + y*y + z*z); 
    const newVolume = Math.min(movement / 10, 1);
    setVolume(newVolume);
    onVolumeChange && onVolumeChange(newVolume); // Update volume in parent component
  };

  useEffect(() => {
    // Start playing the audio when component mounts
    // handlePlay();
    // You might also want to handle stopping the audio when component unmounts
  }, []);

  return (
    <View>
      <GyroscopeComponent onDataReceived={handleGyroData} />
      <AudioPlayerComponent audioFile={audioFile} volume={volume} />
      {/* Now controls are external, no buttons here */}
    </View>
  );
};

export default GyroAudioPlayerComponent;
