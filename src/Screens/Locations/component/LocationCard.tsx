import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colours } from '../../../Theme/Colours/Color';
import { Fonts } from '../../../Theme/FontsSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type props = {
    icon: string;
    title: string;
    address: string;
    distance?: string;
    phoneNumber?: string;
    onDelete?: () => void;
    onShare?: () => void;
    onMore?: () => void;
    showActions?: boolean;
}

const LocationCard = ({
    icon, title, address, distance, phoneNumber, onDelete, onShare, onMore,
    showActions = false,
}: props) => {
    return (
        <View style={style.container}>
            <View style={style.leftColumn}>
                <View style={style.iconContainer}>
                    <MaterialIcons name={icon} color={Colours.btnColours} size={24} />
                </View>
                {distance && (
                    <Text style={style.distanceText}>{distance}</Text>
                )}
            </View>

            <View style={style.rightColumn}>
                <Text style={style.titleText}>{title}</Text>
                <Text style={style.addressText} numberOfLines={3}>
                    {address}
                </Text>
                {phoneNumber ? (
                    <Text style={style.phoneText}>
                        Phone number: {phoneNumber}
                    </Text>
                ) : null}

                {showActions && (
                    <View style={style.actionsContainer}>
                        <TouchableOpacity style={style.actionButton} onPress={onMore} activeOpacity={0.7}>
                            <MaterialIcons name="more-horiz" size={16} color={Colours.btnColours} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.actionButton} onPress={onShare} activeOpacity={0.7}>
                            <MaterialIcons name="reply" size={16} color={Colours.btnColours} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.actionButton} onPress={onDelete} activeOpacity={0.7}>
                            <MaterialIcons name="delete-outline" size={16} color={Colours.btnColours} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default LocationCard

const style = StyleSheet.create({
    container: {
        backgroundColor: Colours.white,
        borderRadius: 20,
        padding: 16,
        marginTop: 10,
        flexDirection: 'row',
        shadowColor: Colours.Black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    leftColumn: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colours.BoneWhite,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    distanceText: {
        fontSize: 10,
        fontFamily: Fonts.MontserrateRegular,
        color: Colours.mediumGray,
        textAlign: 'center',
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 15,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.Black,
        marginBottom: 4,
    },
    addressText: {
        fontSize: 13,
        fontFamily: Fonts.MontserrateRegular,
        color: Colours.mediumGray,
        lineHeight: 18,
    },
    phoneText: {
        fontSize: 12,
        fontFamily: Fonts.MontserrateRegular,
        color: Colours.gray,
        marginTop: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    actionButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(235, 76, 76, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})