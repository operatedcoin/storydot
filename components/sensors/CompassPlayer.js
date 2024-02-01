import React, { useEffect, useState } from 'react';
import { Magnetometer } from 'expo-sensors';
import { Audio } from 'expo-av';
import { View, Text } from 'react-native';


const useAudioSensor = (setAngle) => {
  useEffect(() => {
    // Initialize audio objects
    const soundObject1 = new Audio.Sound();
    const soundObject2 = new Audio.Sound();
    const soundObject3 = new Audio.Sound();

    const calculateAngleFromMagnetometerData = (data) => {
      const angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      // Normalize the angle to range from 0 to 360
      const normalizedAngle = (angle < 0) ? angle + 360 : angle;
      setAngle(normalizedAngle.toFixed(2)); // Update the state with the new angle, rounded to 2 decimal places
      return normalizedAngle;
    };
  
    async function loadAndPlayAudio() {
      // Load audio files
      await soundObject1.loadAsync(require('../../assets/audio/ghost/marktkirche.mp3'));
      await soundObject2.loadAsync(require('../../assets/audio/ghost/luisenplatz.mp3'));
      await soundObject3.loadAsync(require('../../assets/audio/ghost/huanted.mp3'));
    
      // Set to loop and start playing with volume set to 0
      await soundObject1.setIsLoopingAsync(true);
      await soundObject1.playAsync();
      soundObject1.setVolumeAsync(0);
      
      await soundObject2.setIsLoopingAsync(true);
      await soundObject2.playAsync();
      soundObject2.setVolumeAsync(0);
      
      await soundObject3.setIsLoopingAsync(true);
      await soundObject3.playAsync();
      soundObject3.setVolumeAsync(0);
    }

    loadAndPlayAudio();

    // Subscribe to magnetometer updates
    Magnetometer.setUpdateInterval(1000); // Adjust based on your needs
    const subscription = Magnetometer.addListener(async (data) => {
      const angle = calculateAngleFromMagnetometerData(data);
      adjustVolumeBasedOnOrientation(angle, [soundObject1, soundObject2, soundObject3]);
    });

    // Cleanup function
    return async () => {
      // Unload audio to free resources
      await soundObject1.unloadAsync();
      await soundObject2.unloadAsync();
      await soundObject3.unloadAsync();

      // Remove sensor subscription
      subscription.remove();
    };
  }, []);

  // Convert magnetometer data to an angle
  const calculateAngleFromMagnetometerData = (data) => {
    // Assuming that the phone is laying flat, we can use the arc tangent to get an angle
    // Adjust the calculation based on how you are holding the device
    return Math.atan2(data.y, data.x) * (180 / Math.PI);
  };

  // Adjust the volume of audio objects based on the user's orientation
  const adjustVolumeBasedOnOrientation = async (angle, soundObjects) => {
    const maxVolume = 1.0;
    const angleRange = 180; // Adjusted to 180 to give a full range of left to right

    // Normalize angle to range from 0 to 360
    if (angle < 0) {
      angle += 360;
    }

    soundObjects.forEach((soundObject, index) => {
      // Define angles for each sound object
      const soundAngles = [0, 120, 240]; // Adjust these angles based on your sound object placements
      let relativeAngle = Math.abs(angle - soundAngles[index]);
      
      // Normalize relative angle to range from 0 to 180
      relativeAngle = relativeAngle > 180 ? 360 - relativeAngle : relativeAngle;

      // Calculate volume based on relative angle
      const volume = relativeAngle > angleRange ? 0 : maxVolume * (1 - relativeAngle / angleRange);
      
      soundObject.setVolumeAsync(volume);
    });
  };
};

function CompassPlayer() {
  // State for storing the current angle
  const [angle, setAngle] = useState(0);

  useAudioSensor(setAngle); // Pass setAngle to the custom hook

  return (
    <View>
      {/* Replace p with Text component */}
      <Text>Current Angle: {angle}°</Text>
    </View>
  );
}

export default CompassPlayer;
