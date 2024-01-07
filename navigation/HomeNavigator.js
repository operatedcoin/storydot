// navigation/HomeNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/common/HomeScreen';
import DemoNavigator from './DemoNavigator';
import TownHallNavigator from './TownHallNavigator';


const Stack = createStackNavigator();

const HomeNavigator = () => (
    
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="DemoWelcomeScreen" component={DemoNavigator} />
    <Stack.Screen name="TownHallWelcomeScreen" component={TownHallNavigator}
     />
  </Stack.Navigator>
);

export default HomeNavigator;
