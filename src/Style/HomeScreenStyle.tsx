import { StyleSheet } from "react-native";
import { Colours } from "../Theme/Colours/Color";
import { verticalScale, scale } from "../Theme/Normalization";
import { FontSize, Fonts } from "../Theme/FontsSize";

export const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colours.BoneWhite
    },
    bgim: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: verticalScale(450),
    },
    linearGradient: {
        flex: 1,
        borderRadius: scale(5)
    },
    lebel: {
        paddingLeft: scale(16),
        marginTop: verticalScale(10),
        fontFamily: Fonts.MontserrateSemiBold,
        fontSize: FontSize.lg,
    },
    searchHeader: {
        width: "100%",
      
        marginTop: verticalScale(20),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        zIndex: 99,
    },
    serviceCard: {
        gap: scale(10),
        paddingHorizontal: scale(16),
        marginTop: verticalScale(10),
    },
    Banner: {
        marginTop: verticalScale(10),
    }
})