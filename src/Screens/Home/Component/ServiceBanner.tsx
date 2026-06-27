import React from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { scale, verticalScale } from '../../../Theme/Normalization';

const ServiceBanner = ({
    image,
    badge,
    title,
    subtitle,
    buttonText,
}: any) => {
    return (
        <ImageBackground
            source={{ uri: image }}
            style={styles.container}
            imageStyle={styles.image}>
            <View style={styles.content}>
                <View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ServiceBanner;

const styles = StyleSheet.create({
    container: {
        height: verticalScale(320),
        marginHorizontal: scale(16),
    },

    image: {
        borderRadius: scale(20),
    },

    content: {
        flex: 1,
        padding: scale(20),
        justifyContent: 'space-between',
    },

    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: scale(20),
    },

    badgeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },

    title: {
        marginTop: verticalScale(16),
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
    },

    subtitle: {
        marginTop: verticalScale(8),
        width: '60%',
        color: '#fff',
        fontSize: 18,
        lineHeight: 24,
    },

    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: scale(22),
        paddingVertical: verticalScale(12),
        borderRadius: scale(12),
    },

    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
});