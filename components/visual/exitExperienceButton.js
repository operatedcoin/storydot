import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Ionicons } from '@expo/vector-icons';

const ExitExperienceButton = ({ onPress }) => {
  return (
    <SafeAreaView style={{ paddingTop: 10, paddingLeft: 10, zIndex: 100 }}>
      <TouchableOpacity onPress={onPress}>
        <BlurView
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            borderRadius: 15,
            width: 30,
            height: 30,
            overlayColor: 'white',
            opacity: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          blurType="light"
          blurAmount={10}
        >
          <Ionicons name="close-sharp" size={26} color="white" style={{ paddingLeft: 2 }} />
        </BlurView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExitExperienceButton;
