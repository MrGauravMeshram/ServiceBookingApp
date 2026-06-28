import { StyleSheet } from "react-native";
import { Colours } from "../Theme/Colours/Color";
import { verticalScale, scale } from "../Theme/Normalization";
import { FontSize, Fonts } from "../Theme/FontsSize";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(30),
    },
    iconContainer: {
        width: scale(130),
        height: scale(130),
        borderRadius: scale(65),
        backgroundColor: Colours.lightLavender,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(40),
        shadowColor: Colours.btnColours,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    title: {
        fontFamily: Fonts.MonserratExtraBold,
        fontSize: FontSize.vrlg,
        color: Colours.charcoal,
        marginBottom: verticalScale(16),
        textAlign: 'center',
    },
    description: {
        fontFamily: Fonts.MonsterratMedium,
        fontSize: FontSize.md,
        color: Colours.mediumGray,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: verticalScale(40),
        paddingHorizontal: scale(10),
    },
    button: {

        height: verticalScale(52),

        borderRadius: scale(26),
        justifyContent: 'center',
        alignItems: 'center',
        color: Colours.Black,

    },
    buttonText: {
        fontFamily: Fonts.MontserrateSemiBold,
        fontSize: FontSize.lr,
        color: Colours.Black,
    },
});


