import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colours} from '../../../Theme/Colours/Color';

const OtpInputs = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <View style={styles.inputContainer} key={index}>
          <TextInput
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.inputbox}
            textAlign="center"
          />
        </View>
      ))}
    </View>
  );
};

export default OtpInputs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 35,
  },
  inputContainer: {
    height: 50,
    width: 50,
    borderWidth: 0.8,
    borderRadius: 10,
  
    borderColor: 'grey',
    backgroundColor: Colours.white,
    justifyContent: 'center',
  },
  inputbox: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: Colours.Black,
  },
});
