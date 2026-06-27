
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import Toast from 'react-native-toast-message';

const useExitApp = () => {
    const lastBackPress = useRef(0);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                const now = Date.now();

                if (now - lastBackPress.current < 2000) {
                    BackHandler.exitApp();
                    return true;
                }

                lastBackPress.current = now;

                Toast.show({
                    type: 'info',
                    text1: 'Are you Want to Exit',
                    position: 'bottom',
                });

                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress,
            );

            return () => subscription.remove();
        }, []),
    );
};

export default useExitApp;