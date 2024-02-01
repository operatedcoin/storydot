import React from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
import HauntedText from './HauntedText';

const HauntedQuestion = ({ questionText, buttonText, onButtonPress, visible }) => {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <View>
      <HauntedText
        text={questionText}
        startDelay={0}
        // ... other props
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity onPress={onButtonPress} disabled={!visible}>
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HauntedQuestion;
