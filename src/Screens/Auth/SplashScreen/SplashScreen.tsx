import { View, Text ,StyleSheet,Image} from 'react-native'
import {Colours} from '../../../Theme/Colours/Color'
import React ,{useEffect}from 'react'

const SplashScreen = ({navigation}:any) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("OnboardingScreen")
    }, 4000);
  },[])
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