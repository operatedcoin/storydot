import React, { useState, useEffect, useCallback } from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import AudioPlayerComponent from '../../../components/audioPlayers/AudioPlayerComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const GhostChapterSix = () => {
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true); // Control playback
  

  const handleSkip = async () => {
    await stopAudio(); // Stop audio if playing
    navigation.navigate('Details', { experienceId: 'ghost' });
  };

  const navigateToStart = () => {
    stopAudio(); // Stop audio if playing
    navigation.navigate('Details', { experienceId: 'ghost' });
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GhostHeader />
      <TouchableOpacity onPress={handleSkip} style={{ position: 'absolute', top: 40, right: 20, backgroundColor: 'transparent' }}>
        <Text style={{ color: 'gray' }}>Skip</Text>
      </TouchableOpacity>
      <AudioPlayerComponent
  audioFile={require('../../../assets/audio/ghost/Recital.mp3')}
  volume={1.0}
  autoPlay={true}
  isPlaying={isPlaying} // Pass isPlaying state as a prop
  onEnd={navigateToStart}
/>
      <View style={styles.content}>
        <HauntedText
          text="..."
          startDelay={1000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
        {showContinue && (
          <Animated.View style={{ ...styles.continueButton, opacity: fadeAnim }}>
            {/* Continue button logic here */}
          </Animated.View>
        )}
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

export default GhostChapterSix;
