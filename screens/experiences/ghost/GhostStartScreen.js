import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import React, { useState, useEffect } from 'react';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import twentyMinutes from '../../../components/timers/twentyMinutes';


const GhostStartScreen = () => {
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

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
    const timer = setTimeout(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 11000); // Set this to the desired time in milliseconds (22000ms = 22 seconds)
  
    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);
  

  useEffect(() => {
    twentyMinutes.startTimer(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      twentyMinutes.pauseTimer();
    };
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
          startDelay={1000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
        <HauntedText
          text="Blue indicator lights have been installed at points of abnormal activity."
          startDelay={3000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
        <HauntedText
          text="Hover this device by the indicator lights to scan for irregular signals."
          startDelay={5000}
          blockStyle={styles.blockStyle}
          letterStyle={styles.letterStyle}
        />
        {/* <GyroAudioPlayerComponentBasic gyroAudioFile={gyroAudioFile} /> */}

        {showContinue && (
          <Animated.View style={{ ...styles.continueButton, opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => navigation.navigate('ChapterOne')}>
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
    marginTop: 20, // Increase the margin to move it closer to the text
    paddingVertical: 15, // Increase the vertical padding to make it taller
    paddingHorizontal: 30, // Increase the horizontal padding to make it wider
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16, // Increase the font size to make it bigger
  },
});



export default GhostStartScreen;