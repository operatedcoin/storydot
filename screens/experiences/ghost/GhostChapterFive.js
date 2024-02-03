import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ScrollView, Text, StyleSheet, Platform, Vibration, TouchableOpacity } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import BlackAnimatedButton from '../../../components/text/balckAnimatedButton';

const GhostChapterFive = () => {

const [hauntedText, setHauntedText] = useState(""); // Add this line
const [showButton, setShowButton] = useState(false); // Add this line
const navigation = useNavigation();
const [phase, setPhase] = useState(1); // Add phase state
const textOpacityAnim = useRef(new Animated.Value(1)).current; // For fading text
const handleButtonPress = () => {
  // Define what should happen when the button is pressed
  navigation.navigate('ChapterSix');
  console.log("Button Pressed");
};
const handleSkip = () => {
  // clearAllTimers(); // Clear all active timers
  // Define what should happen when the button is pressed
  clearAllTimers(); // Clear all active timers before navigating
  navigation.navigate('ChapterSix');
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
  timerRefs.current.push(timer); // Add the timer ID to the refs array


  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  if (phase === 2) {
    // Set a timeout to change to phase 3
    const timer = setTimeout(() => {
      setPhase(3);
    }, [50000]); // Replace [timeDuration] with the duration in milliseconds
    timerRefs.current.push(timer); // Add the timer ID to the refs array


    return () => clearTimeout(timer);
  }
}, [phase]);

useEffect(() => {
  if (phase === 3) {
    const vibrationPattern = [1000, 500, 1000, 500, 1000, 500, 1000];
    Vibration.vibrate(vibrationPattern);

    const newTextDelay = vibrationPattern.reduce((a, b) => a + b, 0);
    setTimeout(() => {
      setHauntedText("Something is here.");
      setShowButton(true); // Ensure this is set here
    }, newTextDelay);
  } else {
    setShowButton(false); // Reset when not in phase 3
  }
}, [phase]);

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
            text="This is where they collect two beacons..."
            startDelay={0}
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
{phase === 3 && (
<Animated.View style={{ opacity: textOpacityAnim }}>
  <HauntedText
    text={hauntedText}
    startDelay={0}
    blockStyle={styles.blockStyle}
    letterStyle={styles.letterStyle}
  />
  {showButton && (
    <BlackAnimatedButton 
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


export default GhostChapterFive;
