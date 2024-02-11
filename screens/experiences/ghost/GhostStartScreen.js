import { Animated, View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform, Alert} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import HauntedText from '../../../components/text/HauntedText';
import { useNavigation } from '@react-navigation/native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import BackgroundAudioPlayer from '../../../components/audioPlayers/BackgroundAudioPlayer';
import AnimatedButton from '../../../components/text/AnimatedButton';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';


const GhostStartScreen = () => {
  const [audioKey, setAudioKey] = useState('introLoop'); // Use 'introLoop' or 'trace' as the key
  const [playAudio, setPlayAudio] = useState(true);
  const [phase, setPhase] = useState(1); 
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [showContinue, setShowContinue] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
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
    clearAllTimers(); // Clear all active timers if necessary

  
    // Check if not in the last phase before skipping to prevent going beyond your defined phases
    if (phase < 10) {
      setPhase(8);
    } else {
      // Optionally handle the scenario when the skip button is pressed in the last phase
      // For example, navigate to the next chapter or restart the experience
      // navigation.navigate('ChapterOne'); // This line can be adjusted or removed based on the desired behavior
    }
  
    // Optionally, if you want to stop the audio playback when skipping (depending on your app's design),
    // you can include the setPlayAudio(false) call here. 
    // If the audio should continue playing across different phases, you might not need to call it.
  };
  
  const [fadeOut, setFadeOut] = useState(false);
  const introLoop = require("../../../assets/audio/ghost/introLoop.mp3");
  const trace = require("../../../assets/audio/ghost/trace.mp3");

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
    }, 0); 
    
    // Set this to the desired time in milliseconds (22000ms = 22 seconds)
    return () => clearAllTimers();
  }, []);
  

  useEffect(() => {
    // Phase 1 Timer: Show "Hello" and "Take a minute..." for 20 seconds
    const phase1Timer = setTimeout(() => {
      setPhase(2);
    }, 45000); // Change phase after 20 seconds // temp change 

    // Phase 2 Timer: Switch to the second phase after 60 seconds in total
    const phase2Timer = setTimeout(() => {
      setPhase(3);
    }, 50000); // 60 seconds after component mounts temp change
    

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
      setFadeOut(true);
      setTimeout(() => {
            navigation.navigate('ChapterOne'); // Continue with navigation
        }, 10000); // Adjust the delay as needed, ensuring it's enough time for the audio to stop
    }
}, [phase, navigation]);


  return (
    
    <View style={{flex:1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

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
          onPress: navigation.goBack,
        },
      ],
      { cancelable: true }
    );
  }} />


<BackgroundAudioPlayer audioFile={audioKey === 'introLoop' ? introLoop : trace} play={playAudio} fadeOut={fadeOut} />
      <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}/>
        <View>
        {phase === 1 && (
          <>
            <HauntedText
              text="Hello."
              startDelay={5000}
              blockStyle={styles.blockStyle}
              letterStyle={styles.letterStyle}
            />
            <HauntedText
              text="Take a minute to find a place in the foyer you feel comfortable."
              startDelay={10000}
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
            startDelay={1000}
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
            startDelay={1000}
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
            text="Are there things you wish you'd done differently?"
            startDelay={1000}
            blockStyle={styles.blockStyle}
            letterStyle={styles.letterStyle}
          />
          <AnimatedButton text="Yes." onPress={() => handleAnswer(8)}delay={5000} />
          <AnimatedButton text="Everyone wishes they'd done something differently." onPress={() => handleAnswer(8)} delay={6000}/>
          <AnimatedButton text="I don't think about that stuff." onPress={() => handleAnswer(8)} delay={7000}/>
          <AnimatedButton text="No." onPress={() => handleAnswer(8)} delay={8000}/>
          </>
        )}

        {phase === 8 && (
           <>
           <HauntedText
                     text="Would you descibe yourself as still or stuck?"
                     startDelay={1000}
                     blockStyle={styles.blockStyle}
                     letterStyle={styles.letterStyle}
                   />
                   <AnimatedButton text="Still." onPress={() => handleAnswer(9)}delay={5000} />
                   <AnimatedButton text="Stuck." onPress={() => handleAnswer(9)} delay={6000}/>

                   </>

        )}

{phase === 9 && (
          <>
        <HauntedText
                     text="Interesting..."
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
    zIndex: 40,
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