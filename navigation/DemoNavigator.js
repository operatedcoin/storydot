// navigation/DemoNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DemoWelcomeScreen from '../screens/experiences/demo/DemoWelcomeScreen';
import DemoDashboardScreen from '../screens/experiences/demo/DemoDashboardScreen';
import DemoStartScreen from '../screens/experiences/demo/DemoStartScreen';

const DemoStack = createStackNavigator();

const DemoNavigator = () => {
  return (
    <DemoStack.Navigator >
      <DemoStack.Screen name="DemoWelcome" component={DemoWelcomeScreen} />
      <DemoStack.Screen name="DemoStartScreen" component={DemoStartScreen} />
      <DemoStack.Screen name="DemoDashboardScreen" component={DemoDashboardScreen} />
      {/* Add other screens in the Demo experience as needed */}
    </DemoStack.Navigator>
  );
};

export default DemoNavigator;
