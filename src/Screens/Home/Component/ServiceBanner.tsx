import React from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';

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
        height: 320,
        marginHorizontal: 16,
    },

    image: {
        borderRadius: 20,
    },

    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },

    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },

    title: {
        marginTop: 16,
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
    },

    subtitle: {
        marginTop: 8,
        width: '60%',
        color: '#fff',
        fontSize: 18,
        lineHeight: 24,
    },

    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 12,
    },

    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
});