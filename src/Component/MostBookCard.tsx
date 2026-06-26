import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { Colours } from '../Theme/Colours/Color';

type Props = {
    image: string;
    title: string;
    rating: number;
    reviews: string;
    price: number;

    onPress?: () => void;
};

const ServiceCard = ({
    image,
    title,
    rating,
    reviews,
    price,

    onPress,
}: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
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
        </TouchableOpacity>
    );
};

export default ServiceCard;

const styles = StyleSheet.create({
    card: {
        width: 150,
        backgroundColor: Colours.white,
        borderRadius: 12,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: 130,
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        marginHorizontal: 10,
        color: Colours.charcoal,
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
    },

    star: {
        color: Colours.Black,
        fontSize: 12,
        marginRight: 4,
    },

    rating: {
        fontSize: 12,
        color: Colours.mediumGray,
    },

    bottomRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 15,

        marginHorizontal: 10,
        marginBottom: 10,
    },

    startText: {
        fontSize: 11,
        color: Colours.gray,
    },

    price: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '700',
        color: Colours.charcoal,
    },

    addBtn: {
        borderWidth: 1,
        borderColor: Colours.lightLavender,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 6,
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