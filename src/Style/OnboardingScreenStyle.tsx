import { StyleSheet } from "react-native";
import { Fonts, FontSize } from "../Theme/FontsSize";
import { scale, verticalScale } from "../Theme/Normalization";
import { Colours } from "../Theme/Colours/Color";

export const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.LightWhite,
        justifyContent: 'center',
        padding: scale(24),
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: scale(220),
        height: scale(220),
        resizeMode: 'contain',
        marginBottom: verticalScale(24),
    },
    title: {
        fontSize: FontSize.vrlg,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.Black,
        overflow:"hidden",
        width: scale(250),
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(24),
    },
    button: {
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(18),
        borderRadius: scale(8),
        backgroundColor: Colours.Orange,
    },
    buttonText: {
        color: Colours.white,
        fontWeight: '600',
    },
    dot: {
        height: scale(10),
        width: scale(10),
        gap: scale(25),
        flexDirection: "row",
        borderRadius: scale(50),
    },
    subtitle: {
        fontSize: FontSize.lr,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.Black,
        textAlign: 'center',
    }
});
