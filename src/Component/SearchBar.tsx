import { View, Text,StyleSheet,TextInput,Switch} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Colours } from '../Theme/Colours/Color';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = () => {
const [input,setInput] = useState('');
  return (
    <View style={Style.SearchBar}>
        <View style={Style.SearchIcon}>
      <Feather name="search" color={Colours.btnColours} size={24} />
      </View>
      <TextInput value={input} onChangeText={(val)=>setInput(val)}
        style={{flex:1}}
        placeholder='Search Food What You Want'
        placeholderTextColor='grey'/>
    </View>
  )
}

export default SearchBar


const Style = StyleSheet.create({
    SearchBar:{
        height:50,
        width:"95%",
        flexDirection:"row",
        backgroundColor:Colours.white,
        borderRadius:10,
    },
    SearchIcon:{
        height:"100%",
        width:"15%",
        alignItems:"center",
        justifyContent:"center",
    }
})
