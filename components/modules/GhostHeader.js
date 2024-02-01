import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TimerContext } from '../timers/timerContext';




  const GhostHeader = ({ content }) => {
    const { timer, setTimer } = useContext(TimerContext);
    
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null); // State to hold modal content
  const route = useRoute();
  const currentScreen = route.name;


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Logic to set modal content based on current screen
    if (currentScreen === 'Begin') {
      setModalContent(<Text>Content for Screen 1</Text>);
    } else if (currentScreen === 'ScreenName2') {
      setModalContent(<Text>Content for Screen 2</Text>);
    }
    // Add more conditions as needed
  }, [currentScreen]);

  return (
    <View style={styles.header}>
      {/* <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.skipButton}>Skip Forward</Text>
      </TouchableOpacity> */}
      <Text style={styles.timer}>{formatTime()}</Text>
{/* 
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={toggleModal}
>
  <View style={styles.modalContainer}>
    {modalContent}
    <TouchableOpacity onPress={toggleModal}>
      <Text style={styles.closeButton}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Add top padding for iOS
    padding: 10,
    // ... other styles
  },
  countdownCircle: {
    width: 40,  // Adjust size as needed
    height: 40,  // Adjust size as needed
    borderRadius: 20,  // Half of width and height
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 16,
    color: 'grey',
    // ... other styles
  },
  skipButton: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'underline',
    // ... other styles
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    fontSize: 18,
    color: 'white',
    margin: 20,
  },
});

export default GhostHeader;
