// navigation/DemoNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TownHallWelcomeScreen from '../screens/experiences/townHall/TownHallWelcomeScreen';
import TownHallDashboardScreen from '../screens/experiences/townHall/TownHallDashboardScreen';
import TownHallStartScreen from '../screens/experiences/townHall/TownHallStartScreen';

const TownHallStack = createStackNavigator();

const TownHallNavigator = () => {
  return (
    <TownHallStack.Navigator screenOptions={{ headerShown: false }}>
      <TownHallStack.Screen name="Parramatta Town Hall" component={TownHallWelcomeScreen}  />
      <TownHallStack.Screen name="Begin" component={TownHallStartScreen} />
      <TownHallStack.Screen name="Dashboard" component={TownHallDashboardScreen} />
      {/* Add other screens in the Demo experience as needed */}
    </TownHallStack.Navigator>
  );
};

export default TownHallNavigator;
