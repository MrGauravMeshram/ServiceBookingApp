import { View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colours } from '../Theme/Colours/Color';
import Feather from 'react-native-vector-icons/Feather';
import { scale, verticalScale } from '../Theme/Normalization';

type props = {
  title?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const SearchBar = ({ title = 'Search Food What You Want', value, onChangeText, editable = true }: props) => {
  const [input, setInput] = useState('');

  const textValue = value !== undefined ? value : input;
  const handleTextChange = (val: string) => {
    if (onChangeText) {
      onChangeText(val);
    } else {
      setInput(val);
    }
  };

  return (
    <View style={Style.SearchBar}>
      <View style={Style.SearchIcon}>
        <Feather name="search" color={Colours.btnColours} size={24} />
      </View>
      <TextInput
        value={textValue}
        onChangeText={handleTextChange}
        style={{ flex: 1, color: Colours.Black }}
        placeholder={title}
        placeholderTextColor='grey'
        editable={editable}
      />
    </View>
  )
}

export default SearchBar


const Style = StyleSheet.create({
  SearchBar: {
    height: verticalScale(50),
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colours.white,
    borderRadius: scale(10),
  },
  SearchIcon: {
    height: "100%",
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  }
})
