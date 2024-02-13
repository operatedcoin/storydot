import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import HauntedText from '../../../components/text/HauntedText';
import AnimatedButton from '../../../components/text/AnimatedButton';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { Audio, Video } from 'expo-av';

const GhostChapterTwo = () => {
  const [phase, setPhase] = useState(1); // Initial phase
  const videoRef = useRef(null);
  const audioRef = useRef(new Audio.Sound());
  const navigation = useNavigation();
  const route = useRoute();
  const { userSelection } = route.params;

  const handleVideoEnd = useCallback((status) => {
    if (status.didJustFinish) {
      switch (phase) {
        case 1:
          setPhase(1.5);
          break;
        case 2:
          setPhase(2.5);
          break;
        case 3:
          navigation.navigate('ChapterThree');
          break;
        default:
          // Handle unexpected phase
          console.error('Unexpected phase:', phase);
          break;
      }
    }
  }, [phase, navigation]);

  useEffect(() => {
    // Load audio file
    const loadAudio = async () => {
      try {
        await audioRef.current.unloadAsync(); // Ensure no previous audio is loaded
        await audioRef.current.loadAsync(require('../../../assets/audio/ghost/presenceLoop.mp3'));
        // Don't play immediately, wait for phase check
      } catch (error) {
        console.error('Error loading audio', error);
      }
    };

    loadAudio();

    return () => {
      audioRef.current.unloadAsync(); // Cleanup audio on component unmount
    };
  }, []);

  useEffect(() => {
    // Play audio in specific phases and stop when leaving those phases
    const manageAudioPlayback = async () => {
      if (phase === 1.5 || phase === 2.5) {
        await audioRef.current.playAsync();
      } else {
        await audioRef.current.stopAsync();
      }
    };

    manageAudioPlayback();
  }, [phase]); // Depend on phase

  useFocusEffect(
    useCallback(() => {
      const blurListener = navigation.addListener('blur', async () => {
        // Stop both video and audio when navigating away
        if (videoRef.current) {
          videoRef.current.stopAsync();
        }
        await audioRef.current.stopAsync();
      });

      return blurListener;
    }, [navigation])
  );

  // Debugging video source loading
  useEffect(() => {
    if (phase === 1 || phase === 2 || phase === 3) {
      // Optionally, you can force video to play here if not auto-playing
      // if (videoRef.current) videoRef.current.playAsync();
    }
  }, [phase]);

  const renderSVideo = () => {
    if (userSelection === 'Still') {
      return (
        <Video
          source={require('../../../assets/video/ghost/TheBriefingPartTwoStill.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={styles.video}
          onPlaybackStatusUpdate={handleVideoEnd}
        />
      );
    } else if (userSelection === 'Stuck') {
      return (
        <Video
          source={require('../../../assets/video/ghost/TheBriefingPartTwoStuck.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={styles.video}
          onPlaybackStatusUpdate={handleVideoEnd}
        />
      );
    }
  };

  return (
    <View style={{flex:1, backgroundColor: 'black'}}>
      <ExitExperienceButton onPress={() => {
        Alert.alert(
          'Leave performance?',
          'Leaving will end the performance.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Leave', onPress: () => navigation.navigate('Details', { experienceId: 'ghost' }) },
          ],
          { cancelable: true }
        );
      }} />

      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <View style={styles.content}>
        {phase === 1 && (
            <View>
              <View style={{flex: 1}}/>
              <Video
              ref={videoRef}
              source={require('../../../assets/video/ghost/TheBriefPartOne.mp4')}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping={false}
              style={styles.video}
              onPlaybackStatusUpdate={handleVideoEnd}
            />
            <View style={{flex: 1}}/>

            <TouchableOpacity onPress={() => setPhase(1.5)} style={{backgroundColor: 'transparent',}}>
            <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
            </TouchableOpacity>
            </View>
          )}

{/* Phase 1.5 */}
{phase === 1.5 && (
  <View style={styles.phaseContainer}>
    <View style={{flex: 1}}/>
    <HauntedText 
      text="There are two booths in the foyer. Take a seat in them... or nearby if someone else is haunting them." 
      startDelay={0} 
      blockStyle={styles.blockStyle} 
      letterStyle={styles.letterStyle} 
    />
    <AnimatedButton 
      text="I'm in position" 
      onPress={() => setPhase(2)} 
      delay={3000} // Button becomes interactive after 3 seconds
    />
    <View style={{flex: 1}}/>

    <TouchableOpacity onPress={() => setPhase(2)} style={{backgroundColor: 'transparent',}}>
    <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
    </TouchableOpacity>
  </View>
  
)}

{/* Phase 2.5 */}
{phase === 2.5 && (
  <View style={styles.phaseContainer}>
    <View style={{flex: 1}}/>
    <HauntedText 
      text="Now find somewhere in the foyer that makes you feel a little uneasy." 
      startDelay={0} 
      blockStyle={styles.blockStyle} 
      letterStyle={styles.letterStyle} 
    />
    <AnimatedButton 
      text="I'm here but I don't like it" 
      onPress={() => setPhase(3)} 
      delay={3000} // Button becomes interactive after 3 seconds
    />
    <View style={{flex: 1}}/>

    <TouchableOpacity onPress={() => setPhase(3)} style={{backgroundColor: 'transparent',}}>
    <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
    </TouchableOpacity>
  </View>
)}


          {phase === 2 && (
            <View>
            <View style={{flex: 1}}/>
            {renderSVideo()}
            <View style={{flex: 1}}/>

            <TouchableOpacity onPress={() => setPhase(2.5)} style={{backgroundColor: 'transparent',}}>
            <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
            </TouchableOpacity>            
            </View>
          )}

          {phase === 3 && (
            <View>
            <View style={{flex: 1}}/>
            <Video
              ref={videoRef}
              source={require('../../../assets/video/ghost/TheBriefingPartThree.mp4')}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping={false}
              style={styles.video}
              onPlaybackStatusUpdate={handleVideoEnd}
            />
            <View style={{flex: 1}}/>
            <TouchableOpacity onPress={() => navigation.navigate('ChapterThree')} style={{backgroundColor: 'transparent',}}>
              <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text>
            </TouchableOpacity>
 
            </View>
          )}
        </View>
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
  content: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
  },
  letterStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 24,
    color: 'white',
    lineHeight: 30,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default GhostChapterTwo;
