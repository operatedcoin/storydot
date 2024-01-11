// navigation/DemoNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GhostStartScreen from '../screens/experiences/ghost/GhostStartScreen';
import GhostWelcomeScreen from '../screens/experiences/ghost/GhostWelcomeScreen';

const GhostStack = createStackNavigator();

const GhostNavigator = () => {
  return (
    <GhostStack.Navigator >
      <GhostStack.Screen name="Demo" component={GhostWelcomeScreen} />
      <GhostStack.Screen name="Begin" component={GhostStartScreen} />
      {/* Add other screens in the Demo experience as needed */}
    </GhostStack.Navigator>
  );
};

export default GhostNavigator;
