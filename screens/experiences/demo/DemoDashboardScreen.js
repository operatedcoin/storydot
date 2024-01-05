import React, { useState } from 'react'; // Include useState here
import { ScrollView, View, Text, Button } from 'react-native';
import GyroscopeComponent from '../../../components/sensors/GyroscopeComponent'; // Adjust the import path
import AccelerometerComponent from '../../../components/sensors/AccelerometerComponent'; // Adjust the import path
import CompassComponent from '../../../components/sensors/CompassComponent'; // Adjust the import path
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const audioFilePath = '../../../assets/audioAssets/testAudio.mp3';

const DemoDashboardScreen = () => {

  const [volume, setVolume] = useState(0.5); // Default volume

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Demo Dashboard Screen</Text>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>BLE</Text>
        {/* BLE data will be displayed here */}
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Gyro</Text>
        {/* Gyro data will be displayed here */}
        <GyroscopeComponent />
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Accel</Text>
        <AccelerometerComponent />
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>GPS</Text>
        {/* GPS data will be displayed here */}
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Compass</Text>
        <CompassComponent />
      </View>
         {/* Implementing Gyro-Audio Player with UI controls */}
       <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Gyro-Audio Player</Text>
        <GyroAudioPlayerComponent
          audioFile={audioFilePath}
          onVolumeChange={setVolume} // Pass setVolume to the component
        />
        {/* Display the volume */}
        <Text>Volume: {volume.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default DemoDashboardScreen;