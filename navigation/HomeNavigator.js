// navigation/HomeNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/common/HomeScreen';
import AboutScreen from '../screens/common/AboutScreen';
import DetailsScreen from '../screens/common/detailsSreen';
import DemoNavigator from './DemoNavigator';
import TownHallNavigator from './TownHallNavigator';
import GhostNavigator from './GhostNavigator';
import { BlurView } from "@react-native-community/blur";
import Ionicons from '@expo/vector-icons/Ionicons';
import { globalStyles } from '../themes/globalStyles';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          position: 'absolute', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
        },
        tabBarBackground: () => (
          <BlurView
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
            blurType="dark"
            blurAmount={10}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarActiveTintColor:  globalStyles.primaryColor.color,
        tabBarInactiveTintColor: 'grey', 
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ), 
          }}/>
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" color={color} size={size} />
          ), 
          }}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const HomeNavigator = () => (
    
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Bottom Tabs" component={BottomTabs}/>
    <Stack.Screen name="Details" component={DetailsScreen}/>
    <Stack.Screen name="GhostNavigator" component={GhostNavigator}/>
    <Stack.Screen name="TownHallNavigator" component={TownHallNavigator} options={{gestureEnabled: false}}/>
    <Stack.Screen name="DemoNavigator" component={DemoNavigator}/>
  </Stack.Navigator>
);

export default HomeNavigator;
