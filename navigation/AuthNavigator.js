// navigation/AuthNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/common/LoginScreen';
import RegisterScreen from '../screens/common/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="LOGIN" component={LoginScreen} />
    <Stack.Screen name="REGISTER" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
