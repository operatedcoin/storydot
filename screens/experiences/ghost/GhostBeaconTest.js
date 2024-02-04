import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import AnimatedButton from '../../../components/text/AnimatedButton';
import BackgroundAudioPlayer from '../../../components/audioPlayers/BackgroundAudioPlayer';

const GhostBeaconTest = () => {
  const [playAudio, setPlayAudio] = useState(true);
  const [phase, setPhase] = useState(1);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  // Custom hook to manage phase transitions and animations
  usePhaseTransition(phase, setPhase, fadeAnim, buttonsFadeAnim);

  // Navigation and audio management
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => setPlayAudio(true));
    const unsubscribeBlur = navigation.addListener('blur', () => setPlayAudio(false));

    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  // Handle component unmount
  useEffect(() => () => setPlayAudio(false), []);

  const handleSkip = () => {
    setPlayAudio(false);
    navigation.navigate('ChapterOne');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          backgroundColor: 'transparent',
        }}
        onPress={handleSkip}
      >
        <Text style={{ color: 'white' }}>Skip</Text>
      </TouchableOpacity>

      <BackgroundAudioPlayer audioFile={require("../../../assets/audio/drone.mp3")} play={playAudio} />
      <GhostHeader />
      <PhaseContent phase={phase} fadeAnim={fadeAnim} buttonsFadeAnim={buttonsFadeAnim} setPhase={setPhase} />
    </ScrollView>
  );
};

const PhaseContent = ({ phase, fadeAnim, buttonsFadeAnim, setPhase }) => {
  // Depending on the phase, render different content
  // Use Animated.View or HauntedText along with AnimatedButton components as needed
  // Handle animations with fadeAnim and buttonsFadeAnim
  // This function should return JSX based on the current phase
  // Example for phase 1:
  if (phase === 1) {
    return (
      <>
        <HauntedText
          text="Hello."
          startDelay={0}
          // Pass styles as needed
        />
        <HauntedText
          text="Take a minute to find a place in the foyer you feel comfortable."
          startDelay={5000}
          // Pass styles as needed
        />
        {/* Render more content based on phase */}
      </>
    );
  }
  // Continue with other phases...
};

function usePhaseTransition(phase, setPhase, fadeAnim, buttonsFadeAnim) {
  useEffect(() => {
    let timer;
    switch (phase) {
      case 1:
        // Example: Transition from phase 1 to phase 2 after a delay
        timer = setTimeout(() => setPhase(2), 10000);
        break;
      case 2:
        // Start fade-in animation for phase 2 content
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        // Transition to phase 3 after a delay
        timer = setTimeout(() => setPhase(3), 10000);
        break;
      // Define other phases and their transitions/animations
    }

    return () => clearTimeout(timer); // Cleanup timer on phase change
  }, [phase, setPhase, fadeAnim, buttonsFadeAnim]);
}

const styles = StyleSheet.create({
  // Define your styles here
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
});

export default GhostBeaconTest;