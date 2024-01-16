import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles
import GyroAudioPlayerComponent from '../../../components/audioPlayers/GyroAudioPlayerComponent';
import audioFile from '../../../assets/audio/Mayhap.mp3';

const GhostChapterOne = () => <View><Text>Test Screen</Text>
<GyroAudioPlayerComponent audioFile={audioFile} /></View>;


export default GhostChapterOne;
