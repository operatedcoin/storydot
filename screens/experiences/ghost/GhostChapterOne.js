import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, View, ScrollView, Text, StyleSheet, Platform, Vibration, TouchableOpacity, Alert } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import AnimatedButton from '../../../components/text/AnimatedButton';
import CompassAudioPlayer from '../../../components/audioPlayers/compassAudio';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';


const GhostChapterOne = () => {
  const [hauntedText, setHauntedText] = useState(""); 
  const [showButton, setShowButton] = useState(false); 
  const navigation = useNavigation();
  const [phase, setPhase] = useState(1);
  const textOpacityAnim = useRef(new Animated.Value(1)).current; // For fading text
  const isFocused = useIsFocused();
  const [shouldPlayCompassAudio, setShouldPlayCompassAudio] = useState(false);

  useEffect(() => {
    // Set shouldPlayAudio based on both navigation focus and current phase
    // For example, you might decide to play audio only when focused and not in phase 3
    const shouldAudioPlay = isFocused && phase !== 3;
    setShouldPlayCompassAudio(shouldAudioPlay);
  }, [isFocused, phase]); // Depend on both isFocused and phase

  const handleButtonPress = () => {
    // Define what should happen when the button is pressed
    navigation.navigate('ChapterTwo');
    console.log("Button Pressed");
  };
  const handleSkip = () => {
    setShouldPlayCompassAudio(false);
    clearAllTimers(); // Clear all active timers before navigating
    navigation.navigate('ChapterTwo');
    console.log("Button Pressed");
  };
  const navigateToStart = () => {
    setShouldPlayCompassAudio(false);
    navigation.navigate('Details', { experienceId: 'ghost' });
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
      // Set a timeout to change to phase 3
      const timer = setTimeout(() => {
        setShouldPlayCompassAudio(false);
        setPhase(3);
      }, 50000); // Replace [timeDuration] with the duration in milliseconds
      timerRefs.current.push(timer); // Add the timer ID to the refs array

  
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 3) {
      console.log(`Phase 3 Effect: Starting vibration and setting hauntedText and showButton`);
  
      const vibrationPattern = [1000, 500, 1000, 500, 1000, 500, 1000];
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
    <View style={{flex:1, backgroundColor: 'black'}}>

<ExitExperienceButton onPress={() => {
    Alert.alert(
      'Leave performance?',
      'Leaving will end the performance.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: navigateToStart,
        },
      ],
      { cancelable: true }
    );
  }} />   


      {/* <GhostHeader /> */}
      <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />

    <SafeAreaView style={styles.container}>
       <View style={{flex: 1}}/>

       <View>
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
        <CompassAudioPlayer isFocused={shouldPlayCompassAudio} />
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

<View style={{flex: 1}}/>

      <TouchableOpacity
  style={{
    backgroundColor: 'transparent',
  }}
  onPress={handleSkip}
>
  <Text style={{ color: 'gray' }}>Skip</Text>
</TouchableOpacity>

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

export default GhostChapterOne;