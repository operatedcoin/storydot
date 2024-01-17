import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import GhostBeacon from '../../../components/modules/GhostBeacon';
import GhostHeader from '../../../components/modules/GhostHeader';
import gyroAudioFile from '../../../assets/audio/drone.mp3';


const GhostChapterTwo = () => (
    <ScrollView>
      <GhostHeader />
      <View>
        <Text>Chapter Two</Text>
        <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
        <GhostBeacon/>

      </View>
    </ScrollView>
  );
export default GhostChapterTwo;
