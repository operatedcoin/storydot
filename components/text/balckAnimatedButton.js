import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BlackAnimatedButton = ({ text, onPress, delay = 3000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, delay]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent', // Transparent background
    borderColor: 'black', // White border
    borderWidth: 1, // Border width
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    marginVertical: 5, // Vertical margin
    // Add additional styles for a "haunted" or "ghostly" look
  },
  buttonText: {
    color: 'black', // White text color
    textAlign: 'center', // Center text
    fontSize: 18, // Larger font size
    // Add additional styles for a "haunted" or "ghostly" look
  },
});

export default BlackAnimatedButton;
