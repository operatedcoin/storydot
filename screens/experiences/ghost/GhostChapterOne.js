// GhostChapterOne.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import audioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';


// ... other imports

const GhostChapterOne = () => (
  <ScrollView>
    <GhostHeader />
    <View>
      <Text>Gryo Sensor Active</Text>
      <GyroAudioPlayerComponentBasic audioFile={audioFile} />
    </View>
  </ScrollView>
);

export default GhostChapterOne;
