import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GhostHeader = () => {
  const [timer, setTimer] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.header}>
      <Text style={styles.timer}>{formatTime()}</Text>
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
});

export default GhostHeader;
