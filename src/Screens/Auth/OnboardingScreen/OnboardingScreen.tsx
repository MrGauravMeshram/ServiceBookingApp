import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { OnboadingData } from '../../../Data/OnboadingScreenData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Style } from '../../../Style/OnboardingScreenStyle';

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = OnboadingData[currentIndex];

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
        <Image source={currentData.image} style={Style.image} />
        <Text testID="onboarding-title" style={Style.title}>
          {currentData.title}
        </Text>
        <Text testID="onboarding-subtitle" style={Style.subtitle}>
          {currentData.subtitle}
        </Text>
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

