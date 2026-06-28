import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screens/Auth/SplashScreen/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen';
import BottomNavigation from './BottomNavigation';
import OnboardingScreen from '../Screens/Auth/OnboardingScreen/OnboardingScreen'
import SearchLocation from '../Screens/Locations/SearchLocation';
import AddMapScreen from '../Screens/Locations/AddMapScreen';
import React from 'react'
const Stack = createNativeStackNavigator();
const StuckNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Home' component={BottomNavigation} />
        <Stack.Screen name='SearchLocation' component={SearchLocation} options={{
          animation: 'slide_from_bottom',
        }} />
        <Stack.Screen name='AddMapScreen' component={AddMapScreen} options={{
          animation: 'slide_from_right',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StuckNavigation