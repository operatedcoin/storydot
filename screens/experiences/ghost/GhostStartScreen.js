import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import gyroAudioFile from '../../../assets/audio/drone.mp3';
import GyroAudioPlayerComponentBasic from '../../../components/audioPlayers/GyroAudioPlayerComponentBasic';
import React, { useState, useEffect } from 'react';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';

const GhostStartScreen = () => {
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity for button
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '', // Hides the title
      headerStyle: {
        backgroundColor: 'black', // Sets header background color
      },
      headerTintColor: 'white', // Sets the color of the back button and title (if any)
      headerBackTitleVisible: false, // Hides the back button title (iOS)
    });
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 22000); // 3 seconds after the last HauntedText appears

    return () => clearTimeout(timer);
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <GhostHeader />
      <View style={styles.content}>
      <HauntedText
  text="A strange presence has been detected in this area."
  startDelay={5000}
  blockStyle={styles.blockStyle}
  letterStyle={styles.letterStyle}
/><HauntedText
  text="Blue indicator lights have been installed at points of abnormal activity."
  startDelay={12000}
  blockStyle={styles.blockStyle}
  letterStyle={styles.letterStyle}
/><HauntedText
  text="Hover this device by the indicator lights to scan for irregular signals."
  startDelay={17000}
  blockStyle={styles.blockStyle}
  letterStyle={styles.letterStyle}
/>  
   <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} />

        {showContinue && (
          <Animated.View style={{...styles.continueButton, opacity: fadeAnim}}>
          <TouchableOpacity onPress={() => console.log('Continue pressed')}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 44 : 56, // Adjust this based on the nav bar height
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  hauntedText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0, // Increase this value for a larger gap
    color: 'white',
    paddingHorizontal: 20,
    lineHeight: 20,
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
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
});


export default GhostStartScreen;