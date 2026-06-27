import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontSize, Fonts } from '../Theme/FontsSize'
import { Colours } from '../Theme/Colours/Color'
import { scale, verticalScale } from '../Theme/Normalization'

type props = {
  title: String,
  onPress?: () => void,
  disabled?: boolean
}

const Button = ({ title, onPress, disabled }: props) => {
  return (
    <TouchableOpacity style={Style.btnContainer} onPress={onPress} disabled={disabled}>
      <Text style={Style.btntext}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const Style = StyleSheet.create({
  btnContainer: {
    height: verticalScale(50),
    alignItems: "center",
    borderRadius: scale(10),
    justifyContent: "center",
    backgroundColor: Colours.btnColours
  },
  btntext: {
    fontFamily: Fonts.MontserrateSemiBold,
    fontSize: FontSize.lg,
    color: Colours.white
  }
})