import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Text } from 'react-native';

const ScanIndicator = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const fadeInOut = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ])
      );
  
      fadeInOut.start();
  
      // This will stop the animation when the component unmounts
      return () => fadeInOut.stop();
    }, []);

    return (
                  <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
                  <Animated.View className="bg-green-500 w-2 h-2 rounded-full mr-1"
          style={[
            {
              opacity: fadeAnim
            }
          ]}
        />
                    <Text className="text-black text-[10px]">Scanning</Text>
            </View>

      );
    };
    
    export default ScanIndicator;
    