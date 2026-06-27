import { View, StyleSheet, Image } from 'react-native'
import {Colours} from '../../../Theme/Colours/Color'
import React ,{useEffect}from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}:any) => {

  useEffect(() => {
    const checkNavigation = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const onboarded = await AsyncStorage.getItem('useronboarded');
        setTimeout(() => {
          if (isLoggedIn === 'true') {
            navigation.replace("Home");
          } else if (onboarded === 'true') {
            navigation.replace("Login");
          } else {
            navigation.replace("OnboardingScreen");
          }
        }, 4000);
      } catch (error) {
        console.log("Error reading navigation status:", error);
        setTimeout(() => {
          navigation.replace("OnboardingScreen");
        }, 4000);
      }
    };
    checkNavigation();
  }, [])
  return (
    <View style={Style.container}>
      <View style={Style.ImageContainer}>
     <Image source={require('../../../assets/Images/appLogo.jpg')}  style={{height:"100%", width:"100%", borderRadius:50,}} resizeMode='contain'/>
     </View>
    </View>
  )
}

export default SplashScreen


const Style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colours.orangelight,
    justifyContent:"center",
    alignItems:"center",
  },
  ImageContainer:{
    height:200,
    width:200,
    
  }
})