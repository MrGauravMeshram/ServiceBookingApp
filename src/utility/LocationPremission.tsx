import { PermissionsAndroid, Alert } from 'react-native';

const requestLocationPermission = async () => {
    try {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs your location to show nearby places.',
                buttonPositive: 'Allow',
                buttonNegative: 'Cancel',
            }
        );

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location Permission Granted');
            return true;
        } else {
            Alert.alert('Permission Denied', 'Location permission is required.');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default requestLocationPermission;