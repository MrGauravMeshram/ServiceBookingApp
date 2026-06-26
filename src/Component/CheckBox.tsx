import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React ,{useState}from 'react'
import { Colours } from '../Theme/Colours/Color';
import Entypo from 'react-native-vector-icons/Entypo';
const CheckBox = () => {
    const [checked,setChecked] = useState(false)
  return (
    <TouchableOpacity style={Style.Container} onPress={()=>setChecked(!checked)}>
      {checked && <Entypo name="check" color="orange" size={18} />}
    </TouchableOpacity>
  )
}

export default CheckBox

const Style = StyleSheet.create({
    Container:{
        height:25,
        width:25,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colours.white,
        borderWidth:0.8,
        borderColor:"grey"
    }
})