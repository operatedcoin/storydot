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



const GhostStack = createStackNavigator();

const GhostNavigator = () => {
  return (
    <GhostStack.Navigator >
      <GhostStack.Screen name="Welcome" component={GhostWelcomeScreen} />
      <GhostStack.Screen name="Begin" component={GhostStartScreen} />
      <GhostStack.Screen name="ChapterOne" component={GhostChapterOne} />
      {/* <GhostStack.Screen name="ChapterTwo" component={GhostChapterTwo} /> */}
      <GhostStack.Screen name="GHOST" component={GhostChapterThree} />
      <GhostStack.Screen name="ChapterFour" component={GhostChapterFour} />
      <GhostStack.Screen name="ChapterThree" component={GhostChapterFour} />
      <GhostStack.Screen name="ChapterFive" component={GhostChapterFive} />
      <GhostStack.Screen name="Dashboard" component={GhostDashboard} />
      <GhostStack.Screen name="BeaconTest" component={GhostBeaconTest} />


      {/* Add other screens in the Demo experience as needed */}
    </GhostStack.Navigator>
  );
};

export default GhostNavigator;
