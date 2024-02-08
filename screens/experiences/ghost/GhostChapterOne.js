import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import { Animated, View, ScrollView, Text, StyleSheet, Platform, Vibration, TouchableOpacity } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';

import CompassAudioPlayer from '../../../components/audioPlayers/compassAudio';
import { useIsFocused } from '@react-navigation/native';
import AnimatedButton from '../../../components/text/AnimatedButton';

const GhostChapterOne = () => {
  const [hauntedText, setHauntedText] = useState(""); // Add this line
  const [showButton, setShowButton] = useState(false); // Add this line
  const navigation = useNavigation();
  const [phase, setPhase] = useState(1); // Add phase state
  const textOpacityAnim = useRef(new Animated.Value(1)).current; // For fading text
  const isFocused = useIsFocused();
  const [shouldPlayCompassAudio, setShouldPlayCompassAudio] = useState(false);
  const currentPhaseRef = useRef(phase);
const isFocusedRef = useRef(isFocused);

useEffect(() => {
  currentPhaseRef.current = phase;
}, [phase]);

useEffect(() => {
  isFocusedRef.current = isFocused;
}, [isFocused]);

useEffect(() => {
  // Example logic adjustment
  // Assuming you want audio to play only in phase 2 when the component is focused
  const shouldAudioPlay = isFocused && phase === 2;
  setShouldPlayCompassAudio(shouldAudioPlay);
}, [isFocused, phase]);


  useEffect(() => {
    // Set shouldPlayAudio based on both navigation focus and current phase
    // For example, you might decide to play audio only when focused and not in phase 3
    const shouldAudioPlay = isFocused && phase !== 3;
    setShouldPlayCompassAudio(shouldAudioPlay);
  }, [isFocused, phase]); // Depend on both isFocused and phase

  const handleButtonPress = () => {
    // Define what should happen when the button is pressed
    console.log('this shoud stop the audio');

    navigation.navigate('ChapterTwo');
    console.log("Button Pressed");
  };
  const handleSkip = () => {
    // clearAllTimers(); // Clear all active timers
    // Define what should happen when the button is pressed
    clearAllTimers(); // Clear all active timers before navigating
    setShouldPlayCompassAudio(false);
    navigation.navigate('ChapterTwo');
    setShouldPlayCompassAudio(false);

    console.log("Button Pressed");
  };
  const timerRefs = useRef([]);
  const clearAllTimers = () => {
    timerRefs.current.forEach(timer => clearTimeout(timer));
    timerRefs.current = []; // Clear the refs array after clearing the timers
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
    const unsubscribeBlur = navigation.addListener('blur', () => {
      // Ensure audio is stopped when navigating away
      setShouldPlayCompassAudio(false);
      // Clear all timers here
      clearAllTimers();
    });
  
    return unsubscribeBlur;
  }, [navigation]);
  

  useEffect(() => {
    // Fade out text after 20 seconds from the appearance of the third text
    const timer = setTimeout(() => {
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setPhase(2)); // After fade-out, change to phase 2
    }, 24000); // 4000ms for the last text to appear + 20000ms delay
    timerRefs.current.push(timer); // Add the timer ID to the refs array


    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 2) {
      // Schedule transition to phase 3 independently of the compass audio logic
      const phaseChangeTimer = setTimeout(() => {
        setPhase(3); // Transition to phase 3 after appropriate duration
      }, 30000); // Total time in phase 2 before moving to phase 3, adjust as needed
  
      timerRefs.current.push(phaseChangeTimer);
  
      return () => {
        clearTimeout(phaseChangeTimer);
      };
    }
  }, [phase]);

  useEffect(() => {
    let audioStartDelayTimer;
  
    if (phase === 2) {
      // Set shouldPlayCompassAudio false immediately upon entering phase 2
      setShouldPlayCompassAudio(false);
  
      // Delay the start of the compass audio
      audioStartDelayTimer = setTimeout(() => {
        // Check the most current phase and focus status before starting audio
        if (currentPhaseRef.current === 2 && isFocusedRef.current) {
          setShouldPlayCompassAudio(true);
        }
      }, 10000); // 15-second delay
    }
  
    return () => {
      // Clear the delay timer when the component unmounts or if the phase changes
      if (audioStartDelayTimer) {
        clearTimeout(audioStartDelayTimer);
      }
    };
  }, [phase]); // Dependency on phase ensures this effect is re-run when phase changes
  
  
  

  useEffect(() => {
    if (phase === 3) {
      console.log(`Phase 3 Effect: Starting vibration and setting hauntedText and showButton`);
      setShouldPlayCompassAudio(false);
      print("compass stop")

      const vibrationPattern = [500, 200, 1500, 300, 800, 100, 1200, 400, 700];
      Vibration.vibrate(vibrationPattern);

  
      const newTextDelay = vibrationPattern.reduce((a, b) => a + b, 0);
      setTimeout(() => {
        console.log(`Phase 3 Effect: Updating hauntedText and showButton after delay`);
        setHauntedText("Something is here.");
        setShowButton(true); // Ensure this is set here
      }, newTextDelay);
    } else {
      // Potentially another log here to confirm when not in Phase 3
      console.log(`Phase 3 Effect: Not in Phase 3, current phase: ${phase}`);
      setShowButton(false); // Reset when not in phase 3
    }
  }, [phase]); // Assuming 'phase' is a state variable controlling the current phase
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <GhostHeader />
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />
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
<CompassAudioPlayer isFocused={isFocused} shouldPlay={shouldPlayCompassAudio} />
  </Animated.View>
)}
  {phase === 3 && (
  <Animated.View style={{ opacity: textOpacityAnim }}>
    <HauntedText
      text={hauntedText}
      startDelay={0}
      blockStyle={styles.blockStyle}
      letterStyle={styles.letterStyle}
    />
    {showButton && (
      <AnimatedButton 
        text="Hello?" 
        onPress={handleButtonPress}
        delay={3000} // You can adjust this delay
      />
    )}
  </Animated.View>
)}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Changed to white
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
    color: 'white', // Changed to black
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
    color: 'white', // Ensuring this is black
    textAlign: 'center',
    fontSize: 16,
  },
});

export default GhostChapterOne;