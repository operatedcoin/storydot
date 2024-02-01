import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';

const GhostChapterOne = () => {
  const navigation = useNavigation();
  const [phase, setPhase] = useState(1); // Add phase state
  const textOpacityAnim = useRef(new Animated.Value(1)).current; // For fading text

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Fade out text after 20 seconds from the appearance of the third text
    const timer = setTimeout(() => {
      Animated.timing(textOpacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setPhase(2)); // After fade-out, change to phase 2
    }, 24000); // 4000ms for the last text to appear + 20000ms delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GhostHeader />
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
      <View style={styles.content}>
        {phase === 1 && (
          <Animated.View style={{ opacity: textOpacityAnim }}>
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
              startDelay={4000}
              blockStyle={styles.blockStyle}
              letterStyle={styles.letterStyle}
            />
          </Animated.View>
        )}
        {phase === 2 && (
         <Animated.View style={{ opacity: textOpacityAnim }}>
         <HauntedText
           text="Now explore the foyer more widely."
           startDelay={0}
           blockStyle={styles.blockStyle}
           letterStyle={styles.letterStyle}
         />
       </Animated.View>
          
          
        )}
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