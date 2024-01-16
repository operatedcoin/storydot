import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { gyroscope } from 'react-native-sensors';

const GyroAudioPlayerComponent = ({ audioFile }) => {
  const [volume, setVolume] = useState(0.01);
  const isLoaded = useRef(false);
  const soundInstance = useRef(null);

  useEffect(() => {
    console.log('Initializing sound instance');
    soundInstance.current = new Audio.Sound();

    const loadSound = async () => {
      try {
        console.log('Loading sound');
        await soundInstance.current.unloadAsync();
        const result = await soundInstance.current.loadAsync(audioFile, { shouldPlay: true, isLooping: true });
        console.log('Sound load result:', result);
        if (result.isLoaded) {
        isLoaded.current = true;
        await soundInstance.current.setVolumeAsync(volume);
        }
        } catch (error) {
        console.error('Failed to load and play the sound', error);
        }
        };
        loadSound();

return () => {
  if (soundInstance.current) {
    soundInstance.current.unloadAsync();
  }
};
}, [audioFile]);

useEffect(() => {
let gyroSubscription;
const maxGyroValue = 1.0; // Adjust this value based on the gyroscope's range
if (isLoaded.current) {
  gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
    const avg = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
    const scaledAvg = Math.min(avg / maxGyroValue, 1);
    const newVolume = scaledAvg;
    setVolume(newVolume);
    soundInstance.current.setVolumeAsync(newVolume).catch(console.error);
  });
}

return () => {
  if (gyroSubscription) {
    gyroSubscription.unsubscribe();
  }
};
}, [isLoaded.current]);

const togglePlayback = async () => {
if (!isLoaded.current) {
console.log('Audio is not loaded yet');
return;
}
try {
  const status = await soundInstance.current.getStatusAsync();
  if (status.isPlaying) {
    await soundInstance.current.pauseAsync();
  } else {
    await soundInstance.current.playAsync();
  }
} catch (error) {
  console.error('Error during toggle playback', error);
}
};

return (
<View>
<TouchableOpacity onPress={togglePlayback}>
<Text>Toggle Playback</Text>
</TouchableOpacity>
</View>
);
};

export default GyroAudioPlayerComponent;

