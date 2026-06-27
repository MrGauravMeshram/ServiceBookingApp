import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OtpInput from '../Components/OtpInput';
import { FontSize, Fonts } from '../../../Theme/FontsSize';
import { Colours } from '../../../Theme/Colours/Color';
import CheckBox from '../../../Component/CheckBox';
import InputFeild from '../../../Component/InputFeild';
import Button from '../../../Component/Button';
import { useToast } from '../../../Component/Toast';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CarouselData } from '../../../Data/LottieData';
const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [checked, setChecked] = useState(true)
  const [phone, setPhone] = useState("");
  const { showToast } = useToast();

  const isValidNumber = phone.length === 10;
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      extraScrollHeight={150}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.ImageContainer}>
        <Carousel
          width={width}
          height={550}
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
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: 16, marginLeft: 10 }}>
        <View style={{ height: 50, width: 50, backgroundColor: "white", marginTop: 25, borderRadius: 10, justifyContent: "center", alignItems: "center", borderWidth: 0.8, borderColor: "grey", elevation: 5 }}>
          <Image source={require('../../../assets/Images/indianFlag.png')} style={{ height: "70%", width: "70%" }} resizeMode='contain' />
        </View>
        <View style={styles.inputStyle}>

          <InputFeild
            placeHolder="Enter your mobile number"
            length={10}
            editable={!checked}

          />
        </View>
        <View>

        </View>
      </View>
      <View style={styles.checkbox}>
        <CheckBox
          checked={checked}
          onPress={() => setChecked(!checked)} />
        <Text>Get OTP</Text>
      </View>

      <View style={styles.Otp}>
        <Text style={{ marginBottom: 10, marginLeft: 25 }}>Enter Your OTP</Text>
        <OtpInput
          enabled={checked}
          onOtpComplete={setIsOtpComplete} />
      </View>

      <View style={styles.btn}>
        <Button title="Login" disabled={!isOtpComplete}
          onPress={() => {

            showToast("Login successful", "success");
            navigation.navigate("Home");
          }} />
      </View>
    </KeyboardAwareScrollView>
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
    height: 550,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  LoginText: {
    fontSize: FontSize.lr,
    fontFamily: Fonts.MonserratExtraBold,
    textAlign: 'center',
    marginTop: 20,
  },
  inputStyle: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  Otp: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

  },
  checkbox: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
    alignSelf: "flex-end"

  },
  btn: {
    marginTop: 30,
    paddingHorizontal: 16,

  },


  lottie: {
    width: "100%",
    height: "100%",
  },
});