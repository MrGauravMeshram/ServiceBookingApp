import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colours } from '../../../Theme/Colours/Color';
import { OnboadingData } from '../../../Data/OnboadingScreenData';
import { FontSize, Fonts } from '../../../Theme/FontsSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from '../../../Theme/Normalization';

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

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.LightWhite,
    justifyContent: 'center',
    padding: scale(24),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(220),
    height: scale(220),
    resizeMode: 'contain',
    marginBottom: verticalScale(24),
  },
  title: {
    fontSize: FontSize.vrlg,
    fontFamily: Fonts.MontserrateSemiBold,
    color: Colours.Black,
    width: scale(250),
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(24),
  },
  button: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(18),
    borderRadius: scale(8),
    backgroundColor: Colours.Orange,
  },
  buttonText: {
    color: Colours.white,
    fontWeight: '600',
  },
  dot: {
    height: scale(10),
    width: scale(10),
    gap: scale(25),
    flexDirection: "row",
    borderRadius: scale(50),
  },
  subtitle: {
    fontSize: FontSize.lr,
    fontFamily: Fonts.MontserrateSemiBold,
    color: Colours.Black,
    textAlign: 'center',
  }
});
