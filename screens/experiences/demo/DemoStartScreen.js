import React from 'react';
import { View, Text } from 'react-native';
import AudioPlayerComponent from '../../../components/audioPlayers/AudioPlayerComponent';

const DemoStartScreen = () => {
  // Ensure this path is correct and accessible. Using require for local assets
  const audioFilePath = require('../../../assets/audio/Mayhap.mp3');
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Demo Start Screen</Text>
      <AudioPlayerComponent 
        audioFile={audioFilePath} 
        onPlaybackStatusChange={(isPlaying) => console.log(isPlaying ? 'Playing' : 'Paused')}
        volume={1.0} // Adjust as necessary
      />
    </View>
  );
};

export default DemoStartScreen;
