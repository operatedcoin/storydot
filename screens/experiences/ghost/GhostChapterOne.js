import React, { useState, useEffect } from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';


const GhostChapterOne = () => {
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const volumeAnim = useState(new Animated.Value(1))[0]; // Start at full volume
  const [volume, setVolume] = useState(1); // Actual volume state to pass to the player

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: 'white', // Changed to white
      },
      headerTintColor: 'black', // Changed to black
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
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
      <View style={styles.content}>
        <HauntedText
          text="A strange presence has been detected in the area."
          startDelay={0}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
       <HauntedText
          text="This device tunes into traces the presence leaves behind."
          startDelay={2000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
          <HauntedText
          text="Move your hand around gently. See what you can hear."
          startDelay={3000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
  
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Changed to white
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
    color: 'black', // Changed to black
    lineHeight: 30,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'gray', // You might want to change this as well
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'black', // Ensuring this is black
    textAlign: 'center',
    fontSize: 16,
  },
});

export default GhostChapterOne;