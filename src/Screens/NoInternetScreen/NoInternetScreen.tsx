import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import NetInfo from '@react-native-community/netinfo';
import { Colours } from '../../Theme/Colours/Color';
import { Fonts, FontSize } from '../../Theme/FontsSize';
import { scale, verticalScale } from '../../Theme/Normalization';

const NoInternetScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.BoneWhite} />
      <View style={styles.content}>
        <View style={{ height: verticalScale(300), width: scale(300) }}>
          <Image source={{ uri: "https://res.cloudinary.com/dw5wrcvgk/image/upload/v1782554575/ChatGPT_Image_Jun_27_2026_12_08_34_PM_xlijdu.png" }}
            style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
          />
        </View>

        <Text style={styles.title}>Connection Lost</Text>
        <Text style={styles.description}>
          Oops! Your device is not connected to the internet. Please check your network connection and try again.
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Try Again</Text>
        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(30),
  },
  iconContainer: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(65),
    backgroundColor: Colours.lightLavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
    shadowColor: Colours.btnColours,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontFamily: Fonts.MonserratExtraBold,
    fontSize: FontSize.vrlg,
    color: Colours.charcoal,
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.MonsterratMedium,
    fontSize: FontSize.md,
    color: Colours.mediumGray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: verticalScale(40),
    paddingHorizontal: scale(10),
  },
  button: {

    height: verticalScale(52),

    borderRadius: scale(26),
    justifyContent: 'center',
    alignItems: 'center',
    color: Colours.Black,

  },
  buttonText: {
    fontFamily: Fonts.MontserrateSemiBold,
    fontSize: FontSize.lr,
    color: Colours.Black,
  },
});

export default NoInternetScreen;
