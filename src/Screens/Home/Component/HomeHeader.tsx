import { View, Text,StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { FontSize,Fonts } from '../../../Theme/FontsSize';
import { Colours } from '../../../Theme/Colours/Color';

const HomeHeader = () => {
  return (
    <View style={Style.container}>
        <View>
           <View style={{flexDirection:"row",gap:5,alignItems:"center",justifyContent:"center"}}>
              <Ionicons name="location" color="#FFF" size={20} />
              <Text style={Style.headerText}>Capital Park</Text>
     <AntDesign name="down" color="#FFF" size={20} />
           </View>
           <Text style={Style.subtitle}>Capital Pk,Road </Text>
           </View>
           <View style={Style.containerBox}>
            <View style={Style.money}>
                  <FontAwesome name="money" color="#FFF" size={24} />
            </View>
            <View style={Style.Profile}>
                  <MaterialCommunityIcons name="account-circle-outline" color="#000" size={40} />
            </View>
           </View>
         </View>
   
  )
}

export default HomeHeader

const Style = StyleSheet.create({
     container:{
        paddingHorizontal:16,
        flexDirection:"row",
        paddingTop:42,
        width:"100%",
        backgroundColor:"transparent"
    },
    headerText:{
        fontSize:FontSize.lg,
        fontFamily:Fonts.MontserrateSemiBold,
        color:Colours.white
    },
    subtitle:{
        color:Colours.white,
        maxWidth:365,
    },
    money:{
        height:40,
        width:40,
        backgroundColor:"rgba(242, 242, 242, 0.5)",
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
    },
    containerBox:{
        flexDirection:"row",
        gap:10,
        position:"absolute",
        right:20,
        top:45,
        alignSelf:"flex-end",
    },
    Profile:{
      backgroundColor:Colours.white,
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center",
      height:40,
      width:40,
    }
})