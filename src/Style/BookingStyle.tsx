
import { StyleSheet } from "react-native"
import { Fonts, FontSize } from "../Theme/FontsSize"
import { scale, verticalScale } from "../Theme/Normalization"
import { Colours } from "../Theme/Colours/Color"


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.BoneWhite,
    },
    header: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(16),
    },
    headerTitle: {
        fontSize: FontSize.vrlg,
        fontFamily: Fonts.MonserratExtraBold || 'System',
        fontWeight: '700',
        color: Colours.charcoal,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(16),
        gap: scale(10),
    },
    tabButton: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        borderRadius: scale(20),
        backgroundColor: Colours.white,
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    activeTabButton: {
        backgroundColor: Colours.btnColours,
        borderColor: Colours.btnColours,
    },
    tabText: {
        fontFamily: Fonts.MontserrateSemiBold || 'System',
        fontSize: FontSize.small,
        fontWeight: '600',
        color: Colours.gray,
    },
    activeTabText: {
        color: Colours.white,
    },
    listContent: {
        paddingHorizontal: scale(15),
        paddingBottom: verticalScale(100),
    },
    cardContainer: {
        marginHorizontal: scale(5),
        marginVertical: verticalScale(8),
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: verticalScale(100),
    },
    emptyText: {
        fontFamily: Fonts.MontserrateRegular || 'System',
        fontSize: FontSize.small,
        color: Colours.gray,
        textAlign: 'center',
    },
});