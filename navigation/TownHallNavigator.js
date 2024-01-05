// navigation/DemoNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TownHallDashboardScreen from '../screens/experiences/townHall/TownHallDashboardScreen';

const TownHallStack = createStackNavigator();

const TownHallNavigator = () => {
  return (
    <TownHallStack.Navigator >
      <TownHallStack.Screen name="TownHallDashboard" component={TownHallDashboardScreen} />
      {/* Add other screens in the Demo experience as needed */}
    </TownHallStack.Navigator>
  );
};

export default TownHallNavigator;
