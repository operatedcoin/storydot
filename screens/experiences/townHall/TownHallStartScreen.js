
import React from 'react';
import { View, Text, Image } from 'react-native';
import { experienceStyles } from '../../../themes/experienceStyles'; // Import global styles
import BleAudioPlayer from '../../../components/audioPlayers/BleAudioPlayer';


const TownHallStartScreen = () => {
  return (
    <View style={experienceStyles.container}>
      {/* Top Block 1 */}
      <View style={experienceStyles.topBlock}>
        <BleAudioPlayer />
      </View>
      
        {/* Top Block 2 - Divided Horizontally */}
        <View style={experienceStyles.topBlockHalf}>
        {/* 5 Circle Icons (now with coin images) */}
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} style={experienceStyles.icon}>
            <Image
              source={require('../../../assets/images/ocoin.jpeg')} // Update the path to where your asset is
              style={experienceStyles.iconImage} // Define this style in your experienceStyles.js
            />
          </View>
        ))}
      </View>
      
      {/* Bottom Block */}
      <View style={experienceStyles.bottomBlock}>
        <Text>Bottom Block</Text>
      </View>
    </View>
  );
};

export default TownHallStartScreen;