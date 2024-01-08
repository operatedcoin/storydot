import React from 'react';
import { SafeAreaView } from 'react-native';
import BleDashboardComponent from '../../../components/ble/bleDashboardComponent'; // Ensure correct path
import BleAudioPlayer from '../../../components/audioPlayers/BleAudioPlayer';

const TownHallDashboardScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BleAudioPlayer />
      <BleDashboardComponent />
      
      
    </SafeAreaView>
  );
};

export default TownHallDashboardScreen;
