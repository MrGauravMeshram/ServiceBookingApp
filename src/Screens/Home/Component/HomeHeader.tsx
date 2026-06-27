import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { FontSize, Fonts } from '../../../Theme/FontsSize';
import { Colours } from '../../../Theme/Colours/Color';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../State/Store';

const HomeHeader = () => {
  const navigation = useNavigation<any>();
  const selectedLocation = useSelector((state: RootState) => state.address.selectedLocation);

  const headerTitle = selectedLocation
    ? (selectedLocation.landmark || selectedLocation.address.split(',')[0].trim() || selectedLocation.title)
    : "Capital Park";

  const headerSubtitle = selectedLocation
    ? (selectedLocation.landmark
      ? `${selectedLocation.houseNumber ? `${selectedLocation.houseNumber}, ` : ''}${selectedLocation.address}`
      : (selectedLocation.address.split(',').slice(1).map(p => p.trim()).filter(Boolean).join(', ') || selectedLocation.address)
    )
    : "Capital Pk, Road";

  return (
    <View style={Style.container}>
      <View style={{ flex: 1, paddingRight: 80 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchLocation")}
          style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "flex-start" }}
          activeOpacity={0.7}
        >
          <Ionicons name="location" color="#FFF" size={20} />
          <Text style={Style.headerText} numberOfLines={1}>{headerTitle}</Text>
          <AntDesign name="down" color="#FFF" size={14} />
        </TouchableOpacity>
        <Text style={Style.subtitle} numberOfLines={1}>{headerSubtitle}</Text>
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
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    paddingTop: 42,
    width: "100%",
    backgroundColor: "transparent"
  },
  headerText: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.MontserrateSemiBold,
    color: Colours.white
  },
  subtitle: {
    color: Colours.white,
    maxWidth: 365,
  },
  money: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(242, 242, 242, 0.5)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBox: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    right: 20,
    top: 45,
    alignSelf: "flex-end",
  },
  Profile: {
    backgroundColor: Colours.white,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  }
})