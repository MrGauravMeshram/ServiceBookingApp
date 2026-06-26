import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import React ,{useState}from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OtpInput from '../Components/OtpInput';
import { FontSize, Fonts } from '../../../Theme/FontsSize';
import { Colours } from '../../../Theme/Colours/Color';
import CheckBox from '../../../Component/CheckBox';
import InputFeild from '../../../Component/InputFeild';
import Button from '../../../Component/Button';

const LoginScreen = () => {
  const [checked,setChecked] = useState(true)
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
        <Image
          source={{
            uri: 'https://i.pinimg.com/1200x/f7/81/5c/f7815c762345401f46409797946416f7.jpg',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View>
        <Text style={styles.LoginText}>Login or SignUp</Text>
      </View>
       <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:16,marginLeft:10}}>
        <View style={{height:50,width:50,backgroundColor:"white",marginTop:25,borderRadius:10,justifyContent:"center",alignItems:"center",borderWidth:0.8,borderColor:"grey",elevation:5}}>
         <Image source={require('../../../assets/Images/indianFlag.png')} style={{height:"70%",width:"70%"}} resizeMode='contain'/>
        </View>
      <View style={styles.inputStyle}>
     
        <InputFeild
          placeHolder="Enter your mobile number"
          length={10}
          
        />
      </View>
      <View>
      
      </View>
      </View>
      <View style={styles.checkbox}>
         <CheckBox/>
         <Text>Get OTP</Text>
      </View>
      
      <View style={styles.Otp}>
        <Text style={{marginBottom:10,marginLeft:25}}>Enter Your OTP</Text>
        <OtpInput/>
      </View>
        
        <View style={styles.btn}>
          <Button title="Login"/>
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
  Otp:{
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",

  },
  checkbox:{
    flexDirection:"row",
    gap:10,
    paddingHorizontal:20,
    marginTop:16,
    alignSelf:"flex-end"

  },
  btn:{
    marginTop:30,
    paddingHorizontal:16,
  
  }
});