import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import twentyMinutes from '../../../components/timers/twentyMinutes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ExitExperienceButton from '../../../components/visual/exitExperienceButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { StatusBar } from 'react-native';

const GhostChapterSix = () => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const videoRef = useRef(null); // Create a ref for the video component

  const handleSkip = async () => {
    navigation.navigate('Details', { experienceId: 'ghost' });
  };

  const navigateToStart = () => {
    navigation.navigate('Details', { experienceId: 'ghost' });
  };

  const handleVideoEnd = (status) => {
    if (status.didJustFinish) {
      navigation.navigate('Details', { experienceId: 'ghost' });
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
  

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: '',
  //     headerStyle: { backgroundColor: 'black' },
  //     headerTintColor: 'white',
  //     headerBackTitleVisible: false,
  //   });

  //   return () => {
  //     twentyMinutes.pauseTimer();
  //     clearTimeout(timer);
  //   };
  // }, []);

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

    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="black" barStyle="light-content" />

    <View>
        <View style={{flex: 1}}/>
        
        <Video
                ref={videoRef}
                source={require('../../../assets/video/ghost/peopleTake2.mp4')}
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

        <TouchableOpacity onPress={handleSkip} style={{backgroundColor: 'transparent',}}>
        {/* <Text style={{ color: 'gray', textAlign: 'center', }}>Skip</Text> */}
        </TouchableOpacity>

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

export default GhostChapterSix;