import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colours } from '../../../Theme/Colours/Color';
import { OnboadingData } from '../../../Data/OnboadingScreenData';
import { FontSize, Fonts } from '../../../Theme/FontsSize'

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = OnboadingData[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1 < OnboadingData.length ? prev + 1 : prev));
    if (currentIndex === OnboadingData.length - 1) {
      navigation.navigate("Login")
    }
  };

  const handleSkip = () => {
    navigation.navigate("Login")
  };

  return (
    <View style={Style.container}>
      <View style={Style.content}>
        <Image source={currentData.image} style={Style.image} />
        <Text testID="onboarding-title" style={Style.title}>
          {currentData.title}
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
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: FontSize.vrlg,
    fontFamily: Fonts.MontserrateSemiBold,
    color: Colours.Black,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: Colours.Orange,
  },
  buttonText: {
    color: Colours.white,
    fontWeight: '600',
  },
  dot: {
    height: 10,
    width: 10,
    gap: 25,
    flexDirection: "row",
    borderRadius: 50,



  }
});
