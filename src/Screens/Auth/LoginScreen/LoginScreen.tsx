import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInput from './Components/OtpInput';
import { FontSize, Fonts } from '../../../Theme/FontsSize';
import { Colours } from '../../../Theme/Colours/Color';
import CheckBox from '../../../Component/CheckBox';
import InputFeild from '../../../Component/InputFeild';
import Button from '../../../Component/Button';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CarouselData } from '../../../Data/LottieData';
import { scale, verticalScale } from '../../../Theme/Normalization';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [checked, setChecked] = useState(false)




  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid={true}
        extraScrollHeight={verticalScale(150)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ImageContainer}>
          <Carousel
            width={width}
            height={verticalScale(550)}
            data={CarouselData}
            autoPlay
            loop
            autoPlayInterval={3000}
            pagingEnabled
            renderItem={({ item }) => (
              <LottieView
                source={item.animation}
                autoPlay
                loop
                resizeMode="cover"
                style={styles.lottie}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.LoginText}>Login or SignUp</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: scale(16), marginTop: verticalScale(25), gap: scale(10) }}>
          <View style={{ height: verticalScale(50), width: scale(50), backgroundColor: "white", borderRadius: scale(10), justifyContent: "center", alignItems: "center", borderWidth: 0.8, borderColor: "grey", elevation: 5 }}>
            <Image source={require('../../../assets/Images/indianFlag.png')} style={{ height: "70%", width: "70%" }} resizeMode='contain' />
          </View>
          <View style={{ flex: 1 }}>
            <InputFeild
              placeHolder="Enter your mobile number"
              length={10}
              editable={!checked}
            />
          </View>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            checked={checked}
            onPress={() => setChecked(!checked)} />
          <Text>Get OTP</Text>
        </View>

        <View style={styles.Otp}>
          <Text style={{ marginBottom: verticalScale(10), marginLeft: scale(25) }}>Enter Your OTP</Text>
          <OtpInput
            enabled={checked}
            onOtpComplete={setIsOtpComplete} />
        </View>

        <View style={styles.btn}>
          <Button title="Login" disabled={!isOtpComplete}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                Toast.show({
                  type: 'success',
                  text1: 'Login successful',
                  position: 'bottom',
                });
                navigation.replace("Home");
              } catch (err) {
                console.log("Error:", err);
              }
            }} />
        </View>


      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.BoneWhite,
  },
  contentContainer: {
    flexGrow: 1,
  },
  ImageContainer: {
    height: verticalScale(550),
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
  },
  LoginText: {
    fontSize: FontSize.lr,
    fontFamily: Fonts.MonserratExtraBold,
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  inputStyle: {
    marginTop: verticalScale(25),
    paddingHorizontal: scale(20),
  },
  Otp: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

  },
  checkbox: {
    flexDirection: "row",
    gap: scale(10),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(16),
    alignSelf: "flex-end"

  },
  btn: {
    marginTop: verticalScale(30),
    paddingHorizontal: scale(16),
    height: scale(20),
    marginBottom: verticalScale(30),
    backgroundColor: Colours.BoneWhite,
  },


  lottie: {
    width: "100%",
    height: "100%",
  },
});