import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';

const AnimatedLetter = ({ letter, delay, style }) => {
    const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity of 0
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim, delay]);
  
    return (
      <Animated.Text style={{ ...style, opacity: fadeAnim }}>
        {letter}
      </Animated.Text>
    );
  };

const AnimatedWord = ({ word, delay, letterStyle }) => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {word.split('').map((letter, index) => (
          <AnimatedLetter
            key={`${letter}-${index}`}
            letter={letter}
            delay={delay + index * 500} // Adjust the delay for each letter
            style={letterStyle}
          />
        ))}
      </View>
    );
  };
  
  const HauntedText = ({ text, startDelay, blockStyle, letterStyle }) => {
    // Split the text into an array of words
    const words = text.split(' ');
  
    return (
        <View style={[{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }, blockStyle]}>
          {words.map((word, index) => (
            <AnimatedWord
              key={`${word}-${index}`}
              word={word + (index < words.length - 1 ? ' ' : '')} // Add space after each word except the last
              delay={startDelay + Math.random() * 1500}
              letterStyle={letterStyle}
            />
          ))}
        </View>
      );
    };
    
  
  export default HauntedText;
  