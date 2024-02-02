// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import bleDashboardComponent from '../../../components/ble/bleDashboardComponent';
import AudioPlayerComponent from '../../../components/audioPlayers/AudioPlayerComponent';
import gyroAudioFile from '../../../assets/audio/drone.mp3';



// Define GhostChapterThree component
const GhostChapterTwo = () => {
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true); // Control playback


 const handleSkip = async () => {
    setIsPlaying(false); // Attempt to stop the audio
    // Since there might be a slight delay in audio stopping, consider awaiting a short timeout if needed
    navigation.navigate('ChapterThree');
  };
 

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Only resume the timer if it was previously running
    if (twentyMinutes.isTimerRunning()) {
      twentyMinutes.resumeTimer();
    }

    // Set up the animation for the continue button
    const timer = setTimeout(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 11000);

    return () => {
      // Optionally pause the timer when the component unmounts
      twentyMinutes.pauseTimer();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GhostHeader />
      <TouchableOpacity
  style={{
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
  }}
  onPress={handleSkip}
>
  <Text style={{ color: 'gray' }}>Skip</Text>
</TouchableOpacity>
      {/* <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} /> */}
    <AudioPlayerComponent
        audioFile={require('../../../assets/audio/ghost/theBrief.mp3')}
        volume={1.0}
        autoPlay={isPlaying} // Assuming `onEnd` is the correct prop for when the audio finishes
/>
      <View style={styles.content}>
        <HauntedText
          text="..."
          startDelay={1000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
        {/* Add more HauntedText components as needed */}
        {showContinue && (
          <Animated.View style={{ ...styles.continueButton, opacity: fadeAnim }}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('ChapterThree')}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity> */}
          </Animated.View>
        )}
                {/* <GyroAudioPlayerComponentBasic gyroAudioFile="../../../assets/audio/drone.mp3" /> */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
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

export default GhostChapterTwo;
