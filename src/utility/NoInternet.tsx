
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useInternet = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected =
                state.isConnected === true && state.isInternetReachable !== false;

            setIsConnected(connected);
        });

        return unsubscribe;
    }, []);

    return isConnected;
};

export default useInternet;