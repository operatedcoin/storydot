import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Magnetometer } from 'expo-sensors';


const CompassAudioPlayer = ({ isFocused }: { isFocused: boolean }) => {
        const [audioFiles, setAudioFiles] = useState([
          { uri: require('../../assets/audio/ghost/audienceLoop.mp3'), volume: 0.3 },
          { uri: require('../../assets/audio/ghost/heart.mp3'), volume: 0.3 },
          { uri: require('../../assets/audio/ghost/whisperLoop.mp3'), volume: 0.7 },
          { uri: require('../../assets/audio/ghost/presenceLoop.mp3'), volume: 0.3 },
      ]);      
      const [soundObjects, setSoundObjects] = useState<Audio.Sound[]>([]);
      const [compassHeading, setCompassHeading] = useState<number | null>(null);

      const handleVolumeChange = useCallback(async (index: number, volume: number) => {
        const updatedAudioFiles = [...audioFiles];
        updatedAudioFiles[index].volume = volume;
        setAudioFiles(updatedAudioFiles);
    
        if (soundObjects[index]) {
          await soundObjects[index].setVolumeAsync(volume);
        }
      }, [audioFiles, soundObjects]);

      useEffect(() => {
        console.log(`CompassAudioPlayer isFocused: ${isFocused}`);
        if (isFocused) {
          loadAudio();
        } else {
          unloadAudio();
        }
        return () => {
          unloadAudio();
        };
      }, [isFocused]);

      useEffect(() => {
        Magnetometer.setUpdateInterval(1000); // Adjust as needed
    
        const subscription = Magnetometer.addListener(data => {
          let { x, y } = data;
          let heading = Math.atan2(y, x) * (180 / Math.PI);
          heading = (heading + 360) % 360; // Normalize to 0-360 degrees
          setCompassHeading(heading);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

      const adjustAudioVolumes = useCallback((heading: number) => {
        // Initialize all volumes to 0
        let volumes = [0, 0, 0, 0]; // North, East, South, West
      
        // North (0 - 90 degrees)
        if (heading >= 0 && heading < 90) {
          volumes[0] = 1 - (heading / 90); // North volume decreases as we move towards East
          volumes[1] = heading / 90;       // East volume increases as we move towards East
        } 
        // East (90 - 180 degrees)
        else if (heading >= 90 && heading < 180) {
          volumes[1] = 1 - ((heading - 90) / 90); // East volume decreases as we move towards South
          volumes[2] = (heading - 90) / 90;       // South volume increases as we move towards South
        } 
        // South (180 - 270 degrees)
        else if (heading >= 180 && heading < 270) {
          volumes[2] = 1 - ((heading - 180) / 90); // South volume decreases as we move towards West
          volumes[3] = (heading - 180) / 90;       // West volume increases as we move towards West
        } 
        // West (270 - 360 degrees)
        else if (heading >= 270 && heading < 360) {
          volumes[3] = 1 - ((heading - 270) / 90); // West volume decreases as we move back towards North
          volumes[0] = (heading - 270) / 90;       // North volume increases as we move back towards North
        }
      
        console.log("Adjusted Volumes based on heading: ", volumes);

        volumes.forEach((volume, index) => {
          handleVolumeChange(index, volume);
        });
      }, [handleVolumeChange]);

        useEffect(() => {
            if (compassHeading !== null) {
              adjustAudioVolumes(compassHeading);
            }
          }, [compassHeading]); // Only re-run when compassHeading changes

  
          const loadAudio = async () => {
            const soundPromises = audioFiles.map(async (file, index) => {
              try {
                const { sound } = await Audio.Sound.createAsync(
                  file.uri
                );
                await sound.setIsLoopingAsync(true);
                await sound.playAsync(); // Start playing the audio
                return sound;
              } catch (error) {
                console.error(`Error loading audio file at index ${index}: ${error}`);
                return null;
              }
            });
          
            const sounds = await Promise.all(soundPromises);
            console.log("Loaded audio files: ", sounds);
            const validSounds = sounds.filter((sound): sound is Audio.Sound => sound !== null);
            setSoundObjects(validSounds);
          };
          
      
      const unloadAudio = async () => {
        await Promise.all(soundObjects.map(sound => sound.unloadAsync()));
      };
        
  
          return (
            <View>
              {/* UI elements if needed */}
            </View>
          );
        };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderContainer: {
      width: '80%',
      margin: 20,
      backgroundColor: 'white',
    },
    slider: {
      width: '100%',
    },
  });
  
  export default CompassAudioPlayer;
  