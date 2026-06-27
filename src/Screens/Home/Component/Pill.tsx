import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { Colours } from '../../../Theme/Colours/Color'
import { ServiceCategories } from '../../../Data/PillSectionData'
import { scale } from '../../../Theme/Normalization'

const Pill = () => {

  const renderIitem = ({item}:any)=>{
  return (
    <View style={Style.
    Container}>
        <View style={Style.ImageContainer}>
      <Image source={{uri:item.image}} style={{height:"100%",width:"100%"}}  resizeMode='contain'/>
      </View>
      <Text style={{textAlign:"center",color:Colours.Black,}}>{item.name}</Text>
    </View>
  )
}
return(
  <View>
    <FlatList 
    data={ServiceCategories}
    renderItem={renderIitem}
    keyExtractor={(item)=>item.id.toString()}
    horizontal
    nestedScrollEnabled
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: scale(16) }}/>
  </View>
)
}

export default Pill

const Style = StyleSheet.create({
    ImageContainer:{
        height: scale(60),
        width: scale(60),
    },
    Container:{
      height: scale(100),
      width: scale(100),
      alignItems:"center",
      justifyContent:"center",
    }
})