import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Audio } from 'expo-av';
import { StatusBar } from 'react-native';
import HauntedText from '../../../components/text/HauntedText';
import AnimatedButton from '../../../components/text/AnimatedButton';

const GhostChapterTwo = () => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const videoRef = useRef(null); // Create a ref for the video component
  const [currentPhase, setCurrentPhase] = useState(1);
  const [showTextAndButtons, setShowTextAndButtons] = useState(false);

  const audioRef = useRef(new Audio.Sound()); // Ref for the audio component

  const audioFiles = [
    require('../../../assets/audio/ghost/TheBriefPartOne.mp3'),
    require('../../../assets/audio/ghost/TheBriefPartTwo.mp3'),
    require('../../../assets/audio/ghost/TheBriefPartThree.mp3'),
  ];

  const loadAndPlayAudio = async (audioIndex) => {
    try {
      await audioRef.current.unloadAsync(); // Ensure no previous audio is loaded
      await audioRef.current.loadAsync(audioFiles[audioIndex]);
      await audioRef.current.playAsync();
    } catch (error) {
      console.error("Couldn't load audio", error);
    }
  };

  useEffect(() => {
    // Play audio at the start of each phase
    loadAndPlayAudio(currentPhase - 1);

    audioRef.current.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish && currentPhase < 3) {
        setShowTextAndButtons(true);
      } else if (currentPhase === 3 && status.didJustFinish) {
        finishPhaseThree();
      }
    });


    return () => {
      audioRef.current.setOnPlaybackStatusUpdate(null); // Remove listener
      audioRef.current.stopAsync(); // Stop audio when component unmounts or phase changes
    };
  }, [currentPhase]); // Re-run effect when currentPhase changes


  const goToPhaseTwo = () => setCurrentPhase(2);
  const goToPhaseThree = () => setCurrentPhase(3);
  const finishPhaseThree = () => navigation.navigate('ChapterThree');

  const handleSkip = async () => {
    navigation.navigate('ChapterThree');
  };

  const navigateToStart = () => {
    navigation.navigate('Details', { experienceId: 'ghost' });
  };

  const handleVideoEnd = (status) => {
    if (status.didJustFinish) {
      navigation.navigate('ChapterThree');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // This function is called when the screen comes into focus
      return () => {
        // This function is called when the screen goes out of focus
        if (videoRef.current) {
          videoRef.current.stopAsync(); // Stop the video when navigating away
        }
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
    });

    // Uncomment and fix the timer logic if needed
    // const timer = setTimeout(() => {
    //   setShowContinue(true);
    //   Animated.timing(fadeAnim, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }).start();
    // }, 11000);

    return () => {
      // twentyMinutes.pauseTimer(); // Ensure this function exists or is relevant
      // clearTimeout(timer); // Uncomment and fix this if you're using the timer logic above
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ExitExperienceButton onPress={() => { /* Your existing onPress logic */ }} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {/* UI Elements for phases */}
        {currentPhase === 1 && showTextAndButtons && (
        <>
          <HauntedText
            text="Would you describe yourself as still or stuck?"
            startDelay={1000}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
          <AnimatedButton text="Still." onPress={goToPhaseTwo} delay={1000} />
        </>
      )}
      {currentPhase === 2 && !showTextAndButtons && (
        <>    <HauntedText
        text="Would you describe yourself as still or stuck?"
        startDelay={1000}
        blockStyle={styles.blockStyle}
        letterStyle={styles.letterStyle}
      />
      <AnimatedButton text="Still." onPress={goToPhaseThree} delay={1000} />
    </>
  )}
        {currentPhase === 3 && (
          // No button needed here since it will auto-transition after audio ends
          <Text style={{ color: 'gray', textAlign: 'center' }}>Phase 3</Text>
        )}
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
  video: {
    width: 300,
    height: 300,
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
