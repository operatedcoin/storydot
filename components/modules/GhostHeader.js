// GhostHeader.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GhostHeader = () => {
  const [timer, setTimer] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
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
      <View style={styles.blueDot} />
      <Text style={styles.title}>Ghost</Text>
      <Text style={styles.timer}>{formatTime()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // ... other styles
  },
  blueDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    // ... other styles
  },
  title: {
    fontSize: 20,
    // ... other styles
  },
  timer: {
    fontSize: 16,
    // ... other styles
  },
});

export default GhostHeader;
