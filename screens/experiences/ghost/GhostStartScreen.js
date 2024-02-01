import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import GhostHeader from '../../../components/modules/GhostHeader';
import React, { useState, useEffect, useRef } from 'react';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import BackgroundAudioPlayer from '../../../components/audioPlayers/BackgroundAudioPlayer';
import AnimatedButton from '../../../components/text/AnimatedButton';


const GhostStartScreen = () => {
  const [playAudio, setPlayAudio] = useState(true);
  const [phase, setPhase] = useState(1); // 1 for first text, 2 for second text and button
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const hauntedTextFadeAnim = useState(new Animated.Value(1))[0]; // Initial value is 1 (fully visible)
  const navigation = useNavigation();
  const textOpacity = useState(new Animated.Value(0))[0];
  const [buttonVisible, setButtonVisible] = useState(false); // State to control button visibility
  const [buttonsFadeAnim] = useState(new Animated.Value(0)); // For fading in the buttons
  const handleAnswer = (nextPhase) => {
    setPhase(nextPhase);
  };
  const timersRef = useRef([]);
  const setSafeTimeout = (callback, delay) => {
    const id = setTimeout(() => {
      callback();
      // Optional: Remove timer from array after it fires
      timersRef.current = timersRef.current.filter(timerId => timerId !== id);
    }, delay);
    timersRef.current.push(id);
    return id; // In case you need the ID for any reason
  };
  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = []; // Reset the timers array
  };
  const handleSkip = () => {
    clearAllTimers(); // Clear all active timers
    setPlayAudio(false); // Stop audio playback
    navigation.navigate('ChapterOne');
  };
  useEffect(() => {
    return () => {
      setPlayAudio(false); // Ensure audio is stopped when component unmounts
    };
  }, []);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Play or resume audio
    });
    const setSafeTimeout = (callback, delay) => {
      const id = setTimeout(callback, delay);
      timersRef.current.push(id);
      return id;
    };
  
    const unsubscribeBlur = navigation.addListener('blur', () => {
      // Stop audio playback
    });
  
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

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
    const timer = setSafeTimeout(() => {
      setShowContinue(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 10000); 
    
    // Set this to the desired time in milliseconds (22000ms = 22 seconds)
    return () => clearAllTimers();
  }, []);

  useEffect(() => {
    // Phase 1 Timer: Show "Hello" and "Take a minute..." for 20 seconds
    const phase1Timer = setTimeout(() => {
      setPhase(2);
    }, 9000); // Change phase after 20 seconds // temp change 

    // Phase 2 Timer: Switch to the second phase after 60 seconds in total
    const phase2Timer = setTimeout(() => {
      setPhase(3);
    }, 10000); // 60 seconds after component mounts temp change
    

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);

      
    };
  }, []);

  useEffect(() => {
    let phase2Timer, phase3Timer;

    if (phase === 2) {
      phase3Timer = setTimeout(() => {
        setPhase(3);
      }, 10000); // Transition to phase 3 after 10 seconds
    }

    if (phase === 3) {
      phase2Timer = setTimeout(() => {
        setPhase(4);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }).start();
      }, 6000); // Transition to phase 4 after 3 seconds
    }

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
    };
  }, [phase, fadeAnim]);

  useEffect(() => {
    if (phase >= 5 && phase <= 8) {
      console.log(`Starting animation for phase: ${phase}`);
      Animated.timing(buttonsFadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 3000,
        useNativeDriver: true,
      }).start();
    }
  }, [phase, buttonsFadeAnim]);

  useEffect(() => {
    if (phase === 9) {
      const timer = setTimeout(() => {
        setPhase(10);
      }, 10000); // 10 seconds delay
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 10) {
      const timer = setTimeout(() => {
        setPlayAudio(false); // Stop audio playback
        navigation.navigate('ChapterOne'); // Replace with your actual screen name
      }, 10000); // 10 seconds delay
      return () => clearTimeout(timer);
    }
  }, [phase, navigation]);


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
      <View style={styles.content}>
        {phase === 1 && (
          <>
            <HauntedText
              text="Hello."
              startDelay={0}
              blockStyle={styles.blockStyle}
              letterStyle={styles.letterStyle}
            />
            <HauntedText
              text="Take a minute to find a place in the foyer you feel comfortable."
              startDelay={0}
              blockStyle={styles.blockStyle}
              letterStyle={styles.letterStyle}
            />
            <Text style={styles.timerStyle}>{timerSeconds}</Text>
          </>
        )}

        {phase === 2 && (
          <Text style={styles.timerStyle}>{timerSeconds}</Text>
        )}

{(phase === 3 || phase === 4) && (
          <HauntedText
            text="Have you found your spot?"
            startDelay={1000}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
        )}

        {phase === 4 && (
          
            <AnimatedButton text="I found my spot." onPress={() => handleAnswer(5)}delay={1000} />
        )}
    {phase === 5 && (
        <>
          <HauntedText
            text="Do you believe in Ghosts?"
            startDelay={0}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
          <AnimatedButton text="Yes." onPress={() => handleAnswer(6)}delay={7000} />
          <AnimatedButton text="Yeah ... I think I do." onPress={() => handleAnswer(6)}delay={5000} />
          <AnimatedButton text="Maybe? Probably not." onPress={() => handleAnswer(6)}delay={6000} />
          <AnimatedButton text="No." onPress={() => handleAnswer(6)} delay={4000} />
        </>
      )}
          {phase === 6 && (
          <>
  <HauntedText
            text="If you were a Ghost, would you haunt people?"
            startDelay={0}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
          <AnimatedButton text="Constantly." onPress={() => handleAnswer(7)}delay={4000} />
          <AnimatedButton text="Only a few, but I'd get them good." onPress={() => handleAnswer(7)}delay={6000} />
          <AnimatedButton text="I don't think that's for me. But never say never." onPress={() => handleAnswer(7)}delay={7000} />
          <AnimatedButton text="No." onPress={() => handleAnswer(7)}delay={5000} />
          </>
        )}
       {phase === 7 && (
          <>
  <HauntedText
            text="Do you have regrets?"
            startDelay={0}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
          <AnimatedButton text="Yes." onPress={() => handleAnswer(8)}delay={3000} />
          <AnimatedButton text="Everyone wishes they'd done something differently." onPress={() => handleAnswer(8)} delay={4000}/>
          <AnimatedButton text="I don't think about that stuff." onPress={() => handleAnswer(8)} delay={5000}/>
          <AnimatedButton text="No." onPress={() => handleAnswer(8)} delay={6000}/>
          </>
        )}

        {phase === 8 && (
           <>
           <HauntedText
                     text="Would you descibe yourself as still or stuck?"
                     startDelay={0}
                     blockStyle={styles.blockStyle}
                     letterStyle={styles.letterStyle}
                   />
                   <AnimatedButton text="Still." onPress={() => handleAnswer(9)}delay={6000} />
                   <AnimatedButton text="Stuck." onPress={() => handleAnswer(9)} delay={6000}/>

                   </>

        )}

{phase === 9 && (
          <>
        <HauntedText
                     text="Interesting."
                     startDelay={0}
                     blockStyle={styles.blockStyle}
                     letterStyle={styles.letterStyle}
                   />
              

                   </>

        )}
        {phase === 10 && (
          <>
    <HauntedText
                     text="Welcome to Ghost."
                     startDelay={0}
                     blockStyle={styles.blockStyle}
                     letterStyle={styles.letterStyle}
                   />
              

                   </>
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