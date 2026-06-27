import { View, Text, StyleSheet } from 'react-native'
import { Fonts, FontSize } from '../../../Theme/FontsSize'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

type props = {
    title: string;
    icon: string;
}


const HeaderLocation = ({ title, icon }: props) => {
    return (
        <View style={Style.container}>
            <AntDesign name={icon} color="#000" size={24} />
            <Text style={Style.text}>{title}</Text>
        </View>
    )
}

export default HeaderLocation
const Style = StyleSheet.create({
    text: {
        fontSize: FontSize.lg,
        fontFamily: Fonts.MonserratExtraBold,

    },
    container: {
        flexDirection: "row",

        alignItems: "center",
        gap: 10,

    }
})