import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colours } from '../../../Theme/Colours/Color';
import { scale, verticalScale } from '../../../Theme/Normalization';
import ScalePressable from '../../../Component/ScalePressable';

type Props = {
    image: string;
    title: string;
    provider: string;
    bookedOn: string;
    status: string;
    price: number;
    rating: number;
    onPress?: () => void;
};

const getStatusColors = (status: string) => {
    switch (status) {
        case 'Completed':
            return { text: '#1B8F4D' };
        case 'Upcoming':
            return { text: '#E59A00' };
        default:
            return { text: '#E53935' };
    }
};

const RecentBookingCard = ({
    image,
    title,
    provider,
    bookedOn,
    status,
    price,
    rating,
    onPress,
}: Props) => {
    const statusColors = getStatusColors(status);

    return (
        <ScalePressable style={styles.card} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>

                <Text style={styles.provider}>{provider}</Text>

                <View style={styles.ratingRow}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.rating}>{rating}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.date}>{bookedOn}</Text>
                </View>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>₹{price}</Text>

                    <View style={[styles.statusContainer,]}>
                        <Text style={[styles.status, { color: statusColors.text }]}>
                            {status}
                        </Text>
                    </View>
                </View>
            </View>
        </ScalePressable>
    );
};

export default RecentBookingCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colours.white,
        borderRadius: scale(14),
        padding: scale(12),
        marginHorizontal: scale(5),
        marginVertical: verticalScale(8),
        elevation: 2,
    },
    image: {
        width: scale(90),
        height: scale(90),
        borderRadius: scale(10),
    },
    content: {
        flex: 1,
        marginLeft: scale(12),
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colours.charcoal,
    },
    provider: {
        fontSize: 13,
        color: Colours.gray,
        marginTop: verticalScale(2),
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(6),
    },
    star: {
        color: Colours.Black,
        marginRight: scale(4),
    },
    rating: {
        fontSize: 13,
        color: Colours.mediumGray,
        fontWeight: '500',
    },
    dot: {
        width: scale(4),
        height: scale(4),
        borderRadius: 2,
        backgroundColor: '#999',
        marginHorizontal: scale(8),
    },
    date: {
        fontSize: 12,
        color: '#777',
    },
    bottomRow: {
        marginTop: verticalScale(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: Colours.charcoal,
    },
    statusContainer: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        borderRadius: scale(20),
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
    },
});