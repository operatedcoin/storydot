import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Ionicons } from '@expo/vector-icons';

const ExitExperienceButton = ({ onPress }) => {
  return (
    <SafeAreaView style={{ paddingTop: 10, paddingLeft: 10, zIndex: 50 }}>
      <TouchableOpacity onPress={onPress}>
        <BlurView
          style={{
            top: 10,
            left: 10,
            borderRadius: 15,
            width: 30,
            height: 30,
            opacity: 5,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          blurType="light"
          blurAmount={10}
          overlayColor="#00000000"

        >
          <Ionicons name="close-sharp" size={26} color="white" style={{ paddingLeft: 2 }} />
        </BlurView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExitExperienceButton;
