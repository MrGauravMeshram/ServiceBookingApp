import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screens/Auth/SplashScreen/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen';
import OnboardingScreen from '../Screens/Auth/OnboardingScreen/OnboardingScreen'

import React from 'react'
const Stack = createStackNavigator();
const StuckNavigation = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
         <Stack.Screen name='SplashScreen' component={SplashScreen}/>
         <Stack.Screen name = 'OnboardingScreen' component={OnboardingScreen}/>
         <Stack.Screen name="Login" component={LoginScreen}/>
     </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StuckNavigation