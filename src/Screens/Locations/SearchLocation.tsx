import { View, Text, StyleSheet, StatusBar, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderLocation from './component/HeaderLocation'
import { Colours } from '../../Theme/Colours/Color'
import { Fonts } from '../../Theme/FontsSize'
import SearchBar from '../../Component/SearchBar'
import Geolocation from 'react-native-geolocation-service';
import { reverseGeocode } from "../../helpers/geoapify";
import LocationCard from './component/LocationCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../State/Store'
import { loadSavedData, deleteAddress, setSelectedLocation } from '../../State/AddressSlice'
import { getStorage, saveStorage } from '../../Storage/AddressStore'
import { Address } from '../../utility/Address'
import { useToast } from '../../Component/Toast'
import { scale, verticalScale } from '../../Theme/Normalization'
import ScalePressable from '../../Component/ScalePressable'

const SearchLocation = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const addressState = useSelector((state: RootState) => state.address)
    const savedAddresses = addressState.savedAddresses
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const { showToast } = useToast();

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const storedData = await getStorage();
                if (storedData) {
                    dispatch(loadSavedData(storedData));
                }
            } catch (err) {
                console.log("Error:", err);
            }
        };
        loadInitialData();

        Geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

                const location = await reverseGeocode(latitude, longitude);

                console.log(location);

                console.log("Address:", location?.properties?.formatted);
                setCurrentLocation(location?.properties?.formatted || '')
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    }, []);

    const handleDeleteAddress = (id: string) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            dispatch(deleteAddress(id));
                            const updatedSavedAddresses = savedAddresses.filter(item => item.id !== id);
                            const updatedState = {
                                ...addressState,
                                savedAddresses: updatedSavedAddresses,
                            };
                            await saveStorage(updatedState);
                        } catch (err) {
                            console.log("Error deleting address:", err);
                        }
                    }
                }
            ]
        );
    };

    const handleSelectCurrentLocation = () => {
        if (!currentLocation) return;
        const currentAddr: Address = {
            id: 'current',
            title: 'Other',
            address: currentLocation,
            latitude: 0,
            longitude: 0,
            houseNumber: '',
        };
        dispatch(setSelectedLocation(currentAddr));
        navigation.goBack();
    };

    const handleSelectSavedLocation = (item: Address) => {
        dispatch(setSelectedLocation(item));
        navigation.goBack();
    };

    return (
        <SafeAreaView style={Style.container}>
            <StatusBar barStyle={"dark-content"} />
            <View style={Style.containerBox}>
                <HeaderLocation title={"Select a Location"} icon={"down"} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(24) }} showsVerticalScrollIndicator={false}>
                <View style={Style.searchBox}>
                    <SearchBar title={'Seach a Location'} />
                </View>

                <ScalePressable
                    style={{
                        paddingHorizontal: scale(16),
                        overflow: 'hidden'
                    }}
                    onPress={handleSelectCurrentLocation}
                >
                    <LocationCard icon="my-location" title="Use current location" address={currentLocation} />
                </ScalePressable>

                <ScalePressable style={{
                    paddingHorizontal: scale(16),
                    overflow: 'hidden'
                }}
                    onPress={() => navigation.navigate("AddMapScreen")}>
                    <LocationCard icon="add-location" title="Add New Address" address={''} />
                </ScalePressable>

                {savedAddresses && savedAddresses.length > 0 && (
                    <View style={{ marginTop: verticalScale(24), paddingHorizontal: scale(16) }}>
                        <Text style={Style.sectionTitle}>Saved Addresses</Text>
                        {savedAddresses.map((item) => {
                            const iconName = item.title === 'Home' ? 'home' : item.title === 'Work' ? 'work' : 'place';
                            const displayAddress = `${item.houseNumber}${item.landmark ? `, ${item.landmark}` : ''}, ${item.address}`;
                            const distance = item.title === 'Home' ? '11 m' : item.title === 'Work' ? '2.6 km' : '4.5 km';
                            return (
                                <ScalePressable
                                    key={item.id}
                                    style={{ marginVertical: verticalScale(4) }}
                                    onPress={() => handleSelectSavedLocation(item)}
                                >
                                    <LocationCard
                                        icon={iconName}
                                        title={item.title}
                                        address={displayAddress}
                                        distance={distance}
                                        phoneNumber="+91-9834504856"
                                        showActions={true}
                                        onDelete={() => handleDeleteAddress(item.id)}
                                        onShare={() => console.log('Share pressed for', item.id)}
                                        onMore={() => console.log('More pressed for', item.id)}
                                    />
                                </ScalePressable>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchLocation

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.BoneWhite,
    },
    containerBox: {
        paddingHorizontal: scale(16),
    },
    searchBox: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(20)
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.mediumGray,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: verticalScale(8),
        marginLeft: scale(4),
    }
})