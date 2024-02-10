// navigation/DemoNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GhostStartScreen from '../screens/experiences/ghost/GhostStartScreen';
import GhostWelcomeScreen from '../screens/experiences/ghost/GhostWelcomeScreen';
import GhostChapterFive from '../screens/experiences/ghost/GhostChapterFive';
import GhostChapterFour from '../screens/experiences/ghost/GhostChapterFour';
import GhostChapterThree from '../screens/experiences/ghost/GhostChapterThree';
import GhostChapterTwo from '../screens/experiences/ghost/GhostChapterTwo';
import GhostChapterOne from '../screens/experiences/ghost/GhostChapterOne';
import GhostDashboard from '../screens/experiences/ghost/GhostDashboard';
import GhostBeaconTest from '../screens/experiences/ghost/GhostBeaconTest';

import GhostChapterSix from '../screens/experiences/ghost/GhostChapterSix';



const GhostStack = createStackNavigator();

const GhostNavigator = () => {
  return (
    <GhostStack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <GhostStack.Screen name="Welcome" component={GhostWelcomeScreen} />
      <GhostStack.Screen name="Begin" component={GhostStartScreen} />
      <GhostStack.Screen name="ChapterOne" component={GhostChapterOne} />
      {/* <GhostStack.Screen name="ChapterTwo" component={GhostChapterTwo} /> */}
      <GhostStack.Screen name="GHOST" component={GhostChapterThree} />
      <GhostStack.Screen name="ChapterFour" component={GhostChapterFour} />
      <GhostStack.Screen name="ChapterThree" component={GhostChapterThree} />
      <GhostStack.Screen name="ChapterFive" component={GhostChapterFive} />
      <GhostStack.Screen name="Dashboard" component={GhostDashboard} />
      <GhostStack.Screen name="BeaconTest" component={GhostBeaconTest} />
      <GhostStack.Screen name="ChapterTwo" component={GhostChapterTwo} />
      <GhostStack.Screen name="ChapterSix" component={GhostChapterSix} />


      {/* Add other screens in the Demo experience as needed */}
    </GhostStack.Navigator>
  );
};

export default GhostNavigator;
