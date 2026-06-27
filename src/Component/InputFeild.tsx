import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colours } from '../Theme/Colours/Color';
import { scale, verticalScale } from '../Theme/Normalization';
import { FontSize, Fonts } from '../Theme/FontsSize';

type props = {
  placeHolder: string,
  length?: number,
  editable?: boolean;
}

const InputFeild = ({ placeHolder, length, editable = true }: props) => {
  const [value, setValue] = useState("")
  const [showError, setShowError] = useState(false)
  useEffect(() => {
    if (value.length > 0 && value.length < 10) {
      setShowError(true);
    } else {
      setShowError(false)
    }
  }, [value])

  return (
    <View>
      <View style={[Style.inputContainer, { borderColor: showError ? Colours.error : "grey" }]}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 600, }}>+91</Text>
        </View>
        <TextInput
          placeholder={placeHolder}
          value={value}
          placeholderTextColor="grey"
          editable={editable}
          onChangeText={(val) => setValue(val)}
          maxLength={length}
          style={{ fontSize: 16, width: "100%" }}
          keyboardType='number-pad'
        />
      </View>
      {showError && (
        <View style={Style.errorContainer}>
          <Text style={Style.errorText}>Please Enter Valid Number</Text>
        </View>
      )}
    </View>
  )
}

export default InputFeild

const Style = StyleSheet.create({
  inputContainer: {
    height: verticalScale(50),
    width: '100%',

    borderWidth: 0.5,
    borderColor: "grey",
    elevation: 5,
    alignItems: "center",
    paddingHorizontal: scale(16),
    gap: scale(15),
    flexDirection: "row",
    backgroundColor: Colours.white,
    borderRadius: scale(10),
  },
  errorContainer: {
    marginTop: verticalScale(6),
    paddingHorizontal: scale(4),
  },
  errorText: {
    color: Colours.error,
    fontSize: FontSize.small + 2, // 12
    fontFamily: Fonts.MontserrateRegular,
  }
})