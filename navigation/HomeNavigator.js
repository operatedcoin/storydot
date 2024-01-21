// navigation/HomeNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/common/HomeScreen';
import DetailsScreen from '../screens/common/detailsSreen';
import DemoNavigator from './DemoNavigator';
import TownHallNavigator from './TownHallNavigator';
import GhostNavigator from './GhostNavigator';

const Stack = createStackNavigator();

const HomeNavigator = () => (
    
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="GhostNavigator" component={GhostNavigator} />
    <Stack.Screen name="TownHallNavigator" component={TownHallNavigator} />
    <Stack.Screen name="DemoNavigator" component={DemoNavigator} />
  </Stack.Navigator>
);

export default HomeNavigator;
