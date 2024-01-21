import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import experiencesData from '../experiences/experiencesData';

const DetailsScreen = ({ route, navigation }) => {
  const { experienceId } = route.params;
  const experience = experiencesData[experienceId];

  const navigateToExperience = () => {
    // Navigate to the specific navigator
    navigation.navigate(experience.navigator, { screen: 'Begin' });
  };

  return (
    <View>
      {/* <Image source={experience.image} style={{ width: 100, height: 100 }} /> */}
      <Text>{experience.title}</Text>
      <Text>{experience.description}</Text>
      <Text>{experience.credits}</Text>
      <Button
        title="Start Experience"
        onPress={navigateToExperience}
      />
    </View>
  );
};

export default DetailsScreen;
