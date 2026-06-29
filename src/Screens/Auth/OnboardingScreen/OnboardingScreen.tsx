import React, { useState,useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { OnboadingData } from '../../../Data/OnboadingScreenData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Style } from '../../../Style/OnboardingScreenStyle';
import Animated , { FadeInLeft, FadeOut, SlideInDown, useAnimatedStyle,useSharedValue, withTiming } from 'react-native-reanimated';
const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = OnboadingData[currentIndex];
const scale = useSharedValue(0)

useEffect(()=>{
  scale.value = 0;
   scale.value = withTiming(1,{duration:1000})
},[currentIndex])
  const handleNext = async () => {

    setCurrentIndex(prev => (prev + 1 < OnboadingData.length ? prev + 1 : prev));
    if (currentIndex === OnboadingData.length - 1) {
      try {
        await AsyncStorage.setItem('useronboarded', 'true');
      } catch (error) {
        console.log("Error", error);
      }
      navigation.navigate("Login");
    }
  };
  
  const AnimatedImageStyle = useAnimatedStyle(() => {
  
  
  return {
    transform: [
      {
        scale: scale.value,
      },
    ],
  };
});
  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('useronboarded', 'true');
    } catch (error) {
      console.log("Error", error);
    }
    navigation.navigate("Login");
  };

  return (
    <View style={Style.container}>
      <View style={Style.content}>
        <Animated.Image source={currentData.image} style={[Style.image,AnimatedImageStyle]} key={`image-${currentIndex}`}  />
        <View style={{height:70,overflow:"hidden"}}>
        <Animated.Text 
  key={`title-${currentIndex}`} testID="onboarding-title" style={[Style.title,{overflow:"hidden"}]} entering={SlideInDown.springify().damping(80).stiffness(200)} exiting={FadeOut.springify().damping(80).stiffness(200)}>
          {currentData.title}
        </Animated.Text>
        </View>
        <View style={{height:50,overflow:"hidden"}}>
        <Animated.Text key={`subtitle-${currentIndex}`}  testID="onboarding-subtitle" style={Style.subtitle} entering={SlideInDown.springify().damping(80).stiffness(200).delay(300)}  exiting={FadeOut.springify().damping(80).stiffness(200)}>
          {currentData.subtitle}
         
        </Animated.Text>
         </View>
      </View>
      <View style={{ gap: 10, flexDirection: "row", alignSelf: "center", marginRight: 20 }}>

        {OnboadingData.map((_, index) => {
          const active = index === currentIndex;
          return (
            <View key={index} style={[Style.dot, { backgroundColor: active ? "green" : "grey" }]}>

            </View>
          )
        })}
      </View>

      <View style={Style.footer}>
        <TouchableOpacity
          style={Style.button}
          onPress={handleSkip}
          disabled={currentIndex === 0}>
          <Text style={Style.buttonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.button}
          onPress={handleNext}
        >
          <Text style={Style.buttonText}>
            {currentIndex === OnboadingData.length - 1 ? 'GetStarted' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

