import React, { useState } from 'react'; // Include useState here
import { ScrollView, View, Text, Button } from 'react-native';
import GyroscopeComponent from '../../../components/sensors/GyroscopeComponent'; // Adjust the import path
import AccelerometerComponent from '../../../components/sensors/AccelerometerComponent'; // Adjust the import path
import CompassComponent from '../../../components/sensors/CompassComponent'; // Adjust the import path
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles
import BleDashboardComponent from '../../../components/ble/bleDashboardComponent'; // Ensure correct path
import { SafeAreaView } from 'react-native';
import AudioPlayerComponent from '../../../components/audioPlayers/AudioPlayerComponent';


const DemoDashboardScreen = () => {

  const audioFilePath = require('../../../assets/audio/Mayhap.mp3');

  const [volume, setVolume] = useState(0.5); // Default volume

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Demo Dashboard Screen</Text>
      <SafeAreaView style={{flex: 1}}>
      <BleDashboardComponent />
    </SafeAreaView>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Simple Audio Player</Text>
        <AudioPlayerComponent 
        audioFile={audioFilePath} 
        onPlaybackStatusChange={(isPlaying) => console.log(isPlaying ? 'Playing' : 'Paused')}
        volume={1.0} // Adjust as necessary
      />
        {/* BLE data will be displayed here */}
      </View>
      <View style={globalStyles.box}>
        <Text style={globalStyles.boxHeader}>Gyro</Text>
        {/* Gyro data will be displayed here */}
        <GyroscopeComponent />
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
       
    </View>
  );
};

export default DemoDashboardScreen;