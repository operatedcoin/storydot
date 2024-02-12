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
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const secondaryAudioRef = useRef(new Audio.Sound()); // Ref for the secondary audio component


  const audioRef = useRef(new Audio.Sound()); // Ref for the audio component

  const audioFiles = [
    require('../../../assets/audio/ghost/TheBriefPartOne.mp3'),
    require('../../../assets/audio/ghost/presenceLoop.mp3'),
    require('../../../assets/audio/ghost/TheBriefPartTwo.mp3'),
    require('../../../assets/audio/ghost/presenceLoop.mp3'),
    require('../../../assets/audio/ghost/TheBriefPartThree.mp3'),
  ];

  useEffect(() => {
    const loadAndPlayAudio = async (index) => {
      try {
        await audioRef.current.unloadAsync(); // Ensure any previous audio is stopped and unloaded
        const source = audioFiles[index];
        await audioRef.current.loadAsync(source);
        await audioRef.current.playAsync();
      } catch (error) {
        console.error("Couldn't load audio", error);
      }
    };
  
    // Logic to handle phase-specific audio playback
    if (currentPhase === 1) {
      loadAndPlayAudio(0); // Play audio for phase 1
    } else if (currentPhase === 1.5) {
      setShowTextAndButtons(true); // Show text for intermediate phase 1.5
      loadAndPlayAudio(1); // Correctly play audio for phase 1.5
    } else if (currentPhase === 2) {
      loadAndPlayAudio(2); // Play audio for phase 2, after 1.5's audio has been played
    } else if (currentPhase === 2.5) {
      setShowTextAndButtons(true); // Show text for intermediate phase 2.5
      loadAndPlayAudio(3); // Play audio for phase 2.5
    } else if (currentPhase === 3) {
      loadAndPlayAudio(4); // Play audio for phase 3, after 2.5's audio has been played
    }
  
    // Listener for audio playback status update
    audioRef.current.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        if (currentPhase === 1) {
          setCurrentPhase(1.5); // Transition to intermediate phase 1.5 after phase 1 audio
        } else if (currentPhase === 1.5) {
          setShowTextAndButtons(false);
          setCurrentPhase(2); // Transition to phase 2 after intermediate 1.5's audio
        } else if (currentPhase === 2) {
          setCurrentPhase(2.5); // Transition to intermediate phase 2.5 after phase 2 audio
        } else if (currentPhase === 2.5) {
          setShowTextAndButtons(false);
          setCurrentPhase(3); // Transition to phase 3 after intermediate 2.5's audio
        }
      }
    });
  
    return () => {
      audioRef.current.setOnPlaybackStatusUpdate(null);
      audioRef.current.stopAsync();
    };
  }, [currentPhase]);


  const goToPhaseTwo = () => {
    setShowTextAndButtons(false); // Ensure text/buttons are hidden when phase starts
    setCurrentPhase(2);
    // It's a good practice to start audio playback here if not already started
    loadAndPlayAudio(1); // Assuming index 1 is for phase 2's audio
  };
  
  const goToPhaseThree = () => {
    setShowTextAndButtons(false);
    setCurrentPhase(3);
    // Start audio playback for phase 3, if applicable
  };
  
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

    return () => {
  
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ExitExperienceButton onPress={() => Alert.alert('Leave performance?', 'Leaving will end the performance.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Leave', onPress: () => navigation.goBack() }], { cancelable: true })} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {showTextAndButtons && (
          <>
            {currentPhase === 1.5 && (
              <>
                <HauntedText text="Find the next spot." startDelay={0} blockStyle={styles.blockStyle} letterStyle={styles.letterStyle} />
                <AnimatedButton text="Ready." onPress={() => setCurrentPhase(2)} delay={3000} />
              </>
            )}
            {currentPhase === 2.5 && (
              <>
                <HauntedText text="Prepare for the final phase." startDelay={0} blockStyle={styles.blockStyle} letterStyle={styles.letterStyle} />
                <AnimatedButton text="Proceed." onPress={() => setCurrentPhase(3)} delay={3000} />
              </>
            )}
          </>
        )}
        <TouchableOpacity style={{ backgroundColor: 'transparent', marginTop: 20 }} onPress={handleSkip}>
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
