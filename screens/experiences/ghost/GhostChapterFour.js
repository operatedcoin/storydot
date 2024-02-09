import React, { useState, useEffect, useCallback } from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import AudioPlayerComponent from '../../../components/audioPlayers/AudioPlayerComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const GhostChapterFour = () => {

const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true); // Control playback

  const handleSkip = async () => {
    await stopAudio(); // Stop audio if playing
    navigation.navigate('ChapterFive');
  };

  const navigateToChapterThree = () => {
    navigation.navigate('ChapterFive');
  };

  const stopAudio = () => {
    setIsPlaying(false); // This should trigger the AudioPlayerComponent to stop playback
  };
  
  useFocusEffect(
    useCallback(() => {
      return () => stopAudio(); // Stops audio when navigating away
    }, [])
  );
  

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
    });

    const timer = setTimeout(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 11000);

    return () => {
      twentyMinutes.pauseTimer();
      clearTimeout(timer);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen comes into focus
      
      return () => stopAudio(); // Ensure audio is stopped when navigating away
    }, [])
  );

  return (
    <View style={{flex:1, backgroundColor: 'black'}}>

      <ExitExperienceButton onPress={() => navigation.goBack()} /> 

      <AudioPlayerComponent
  audioFile={require('../../../assets/audio/ghost/ThatsEverything.mp3')}
  volume={1.0}
  autoPlay={true}
  isPlaying={isPlaying}
  onEnd={navigateToChapterThree}
/>
<SafeAreaView style={styles.container}>
    <View>
        <View style={{flex: 1}}/>
        
        <View style={{width: 100, height: 100, backgroundColor: 'green', borderRadius: 50}} />
        
        <View style={{flex: 1}}/>

        <TouchableOpacity onPress={handleSkip} style={{backgroundColor: 'transparent',}}>
        <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: Platform.OS === 'ios' ? 44 : 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  blockStyle: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  letterStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 24,
    color: 'white',
    lineHeight: 30,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});
export default GhostChapterFour;
