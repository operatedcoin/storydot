import React from 'react';
import { View, Text } from 'react-native';
import BleAudioPlayer from '../../../components/audioPlayers/BleAudioPlayer';
import { globalStyles } from '../../../themes/globalStyles';

const DemoStartScreen = () => {
  // Ensure this path is correct and accessible. Using require for local assets
  const audioFilePath = require('../../../assets/audio/Mayhap.mp3');
  
  return (
    <View style={globalStyles.box}>
    <Text style={globalStyles.boxHeader}>BLE Audio</Text>
    <BleAudioPlayer/>
    
  </View>
  );
};

export default DemoStartScreen;
