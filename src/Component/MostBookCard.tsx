import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colours } from '../Theme/Colours/Color';
import { scale, verticalScale } from '../Theme/Normalization';
import ScalePressable from './ScalePressable';

type Props = {
    image: string;
    title: string;
    rating: number;
    reviews: string;
    price: number;

    onPress?: () => void;
};

const ServiceCard = ({image,title, rating,reviews,price, onPress,}: Props) => {
    return (
        <ScalePressable
            style={styles.card}
            onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            <View style={styles.ratingRow}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>
                    {rating} ({reviews})
                </Text>
            </View>

            <View style={styles.bottomRow}>
                <View>
                    <Text style={styles.startText}>Starts at</Text>
                    <Text style={styles.price}>₹{price}</Text>
                </View>

                <TouchableOpacity style={styles.addBtn}>
                    <Text style={styles.addText}>Add</Text>

                </TouchableOpacity>
            </View>
        </ScalePressable>
    );
};

export default ServiceCard;

const styles = StyleSheet.create({
    card: {
        width: scale(150),
        backgroundColor: Colours.white,
        borderRadius: scale(12),
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: verticalScale(130),
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: verticalScale(8),
        marginHorizontal: scale(10),
        color: Colours.charcoal,
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(5),
        marginHorizontal: scale(10),
    },

    star: {
        color: Colours.Black,
        fontSize: 12,
        marginRight: scale(4),
    },

    rating: {
        fontSize: 12,
        color: Colours.mediumGray,
    },

    bottomRow: {
        marginTop: verticalScale(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: scale(15),

        marginHorizontal: scale(10),
        marginBottom: verticalScale(10),
    },

    startText: {
        fontSize: 11,
        color: Colours.gray,
    },

    price: {
        marginTop: verticalScale(2),
        fontSize: 16,
        fontWeight: '700',
        color: Colours.charcoal,
    },

    addBtn: {
        borderWidth: 1,
        borderColor: Colours.lightLavender,
        borderRadius: scale(10),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(6),
        alignItems: 'center',
    },

    addText: {
        color: Colours.purple,
        fontWeight: '700',
        fontSize: 15,
    },

    optionText: {
        fontSize: 10,
        color: Colours.gray,
    },
});