import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, TextInput, Alert } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import HeaderLocation from './component/HeaderLocation'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../../Component/SearchBar'
import Button from '../../Component/Button'
import { Colours } from '../../Theme/Colours/Color'
import { Fonts } from '../../Theme/FontsSize'
import { Map, Camera, Marker, CameraRef } from "@maplibre/maplibre-react-native";
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { searchPlaces, reverseGeocode } from "../../helpers/geoapify";
import { MAP_STYLE_URL } from "../../utility/contant";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/Store';
import { saveAddress, loadSavedData } from '../../State/AddressSlice';
import { saveStorage, getStorage } from '../../Storage/AddressStore';
import LocationCard from './component/LocationCard';
import { Address } from '../../utility/Address';
import { useToast } from '../../Component/Toast';

export function ExampleMap() {
    return <Map mapStyle="https://demotiles.maplibre.org/style.json" />;
}

const AddMapScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const addressState = useSelector((state: RootState) => state.address);
    const { showToast } = useToast();

    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    // Form inputs state
    const [houseNumber, setHouseNumber] = useState('');
    const [landmark, setLandmark] = useState('');
    const [selectedType, setSelectedType] = useState<'Home' | 'Work' | 'Other'>('Home');
    const [isSavingMode, setIsSavingMode] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%', '70%'], []);
    const skipNextReverseGeocode = useRef(false);
    const cameraRef = useRef<CameraRef>(null);

    const pinTranslateY = useRef(new Animated.Value(-40)).current;

    const shadowScale = pinTranslateY.interpolate({
        inputRange: [-40, 0],
        outputRange: [0.4, 1.0],
        extrapolate: 'clamp',
    });

    const shadowOpacity = pinTranslateY.interpolate({
        inputRange: [-40, 0],
        outputRange: [0.15, 0.6],
        extrapolate: 'clamp',
    });


    const fetchAddress = async (lat: number, lon: number) => {
        const res = await reverseGeocode(lat, lon);
        if (res && res.properties) {
            setSelectedAddress(res.properties.formatted);
        }
    };


    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await getStorage();
                if (storedData) {
                    dispatch(loadSavedData(storedData));
                }
            } catch (err) {
                console.log("Error loading address data:", err);
            }
        };
        loadData();

        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log("Current coordinates:", latitude, longitude);
                setLocation({ latitude, longitude });
                cameraRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 14,
                    duration: 1500,
                });
            },
            error => {
                console.log("Error getting coordinates: ", error);

                setLocation({
                    latitude: 17.385,
                    longitude: 78.486,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
            }
        );
    }, []);


    useEffect(() => {
        if (!location) return;

        pinTranslateY.setValue(-40);
        Animated.spring(pinTranslateY, {
            toValue: 0,
            tension: 60,
            friction: 5,
            useNativeDriver: true,
        }).start();

        if (skipNextReverseGeocode.current) {
            skipNextReverseGeocode.current = false;
            return;
        }
        fetchAddress(location.latitude, location.longitude);
    }, [location]);

    const handleGoToCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                cameraRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 14,
                    duration: 1500,
                });
            },
            error => {
                console.log("Error getting current location: ", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
            }
        );
    };

    const handleSaveAddress = async () => {
        if (!houseNumber.trim()) {
            Alert.alert("Required Field", "Please enter your House/Flat/Block number.");
            return;
        }

        if (!location) {
            Alert.alert("Error", "Location coordinates are missing.");
            return;
        }

        const newAddress: Address = {
            id: Date.now().toString(),
            title: selectedType,
            address: selectedAddress,
            latitude: location.latitude,
            longitude: location.longitude,
            houseNumber: houseNumber.trim(),
            landmark: landmark.trim() || undefined,
        };

        try {

            dispatch(saveAddress(newAddress));


            const updatedSavedAddresses = [...(addressState.savedAddresses || []), newAddress];
            const updatedState = {
                ...addressState,
                savedAddresses: updatedSavedAddresses,
            };


            await saveStorage(updatedState);

            showToast("Address saved successfully!", "success");
            if (navigation && navigation.goBack) {
                navigation.goBack();
            }
        } catch (err) {
            console.log("Error saving address:", err);
            Alert.alert("Error", "Could not save the address. Please try again.");
        }
    };


    useEffect(() => {
        if (!searchText.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            const results = await searchPlaces(searchText);
            setSearchResults(results || []);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    if (!location) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colours.BoneWhite, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.MontserrateRegular, color: Colours.Black }}>Loading location...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colours.BoneWhite }}>
            <View style={{ paddingHorizontal: 16 }}>
                <HeaderLocation title={"Select a Location"} icon={"left"} />
            </View>

            <View style={{ paddingHorizontal: 16, marginTop: 20, zIndex: 10 }}>
                <SearchBar
                    title={'Search a Location'}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {searchResults.length > 0 && (
                    <View style={styles.searchResultsContainer}>
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item, index) => item.properties.place_id || index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.searchResultItem}
                                    onPress={() => {
                                        const [lon, lat] = item.geometry.coordinates;
                                        skipNextReverseGeocode.current = true;
                                        setLocation({ latitude: lat, longitude: lon });
                                        setSelectedAddress(item.properties.formatted);
                                        setSearchText('');
                                        setSearchResults([]);
                                        cameraRef.current?.flyTo({
                                            center: [lon, lat],
                                            zoom: 14,
                                            duration: 1500,
                                        });
                                    }}
                                >
                                    <MaterialIcons name="location-on" size={20} color={Colours.gray} />
                                    <Text style={styles.searchResultText} numberOfLines={2}>
                                        {item.properties.formatted}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyboardShouldPersistTaps="handled"
                        />
                    </View>
                )}
            </View>

            <View style={{ flex: 1, marginTop: 20 }}>
                {/*MAP USE MAPLIBRE*/}
                <Map
                    style={styles.map}
                    mapStyle={MAP_STYLE_URL}
                >
                    <Camera
                        ref={cameraRef}
                        zoom={14}
                        center={[
                            location.longitude,
                            location.latitude,
                        ]}
                        easing={"fly"}
                        duration={1500}
                    />
                    <Marker
                        id="user-current-location"
                        lngLat={[
                            location.longitude,
                            location.latitude,
                        ]}
                    >
                        <View style={styles.markerWrapper}>

                            <Animated.View
                                style={[
                                    styles.pinShadow,
                                    {
                                        transform: [{ scale: shadowScale }],
                                        opacity: shadowOpacity,
                                    }
                                ]}
                            />

                            <Animated.View style={[
                                styles.pinContainer,
                                { transform: [{ translateY: pinTranslateY }] }
                            ]}>
                                <MaterialIcons name="location-on" size={38} color={Colours.btnColours} />
                            </Animated.View>
                        </View>
                    </Marker>
                </Map>
                <TouchableOpacity
                    style={[styles.myLocationButton, { bottom: isSavingMode ? '72%' : 280 }]}
                    onPress={handleGoToCurrentLocation}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="my-location" size={24} color={Colours.btnColours} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSheet}>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    enableOverDrag={false}
                    index={0}
                    enableContentPanningGesture={true}
                    handleIndicatorStyle={{ backgroundColor: Colours.gray, width: 64, height: 4 }}
                    onChange={(index) => {
                        if (index === 0) {
                            setIsSavingMode(false);
                        } else if (index === 1) {
                            setIsSavingMode(true);
                        }
                    }}
                >
                    <BottomSheetView style={styles.bottomSheetContent}>
                        {!isSavingMode ? (
                            <View>
                                <LocationCard
                                    icon="my-location"
                                    title="Selected Location"
                                    address={selectedAddress || 'Fetching address...'}
                                />
                                <View style={{ marginTop: 20 }}>
                                    <Button
                                        title="Proceed to Save"
                                        onPress={() => {
                                            setIsSavingMode(true);
                                            bottomSheetRef.current?.expand();
                                        }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={{ gap: 14 }}>
                                <LocationCard
                                    icon="my-location"
                                    title="Selected Location"
                                    address={selectedAddress || 'Fetching address...'}
                                />

                                <View>
                                    <Text style={styles.inputLabel}>House / Flat / Block No.</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter House or Flat Number"
                                        placeholderTextColor={Colours.gray}
                                        value={houseNumber}
                                        onChangeText={setHouseNumber}
                                    />
                                </View>

                                <View>
                                    <Text style={styles.inputLabel}>Landmark (Optional)</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Landmark"
                                        placeholderTextColor={Colours.gray}
                                        value={landmark}
                                        onChangeText={setLandmark}
                                    />
                                </View>

                                <View>
                                    <Text style={styles.inputLabel}>Save Address As</Text>
                                    <View style={styles.tagContainer}>
                                        {(['Home', 'Work', 'Other'] as const).map(type => {
                                            const isSelected = selectedType === type;
                                            const iconName = type === 'Home' ? 'home' : type === 'Work' ? 'work' : 'place';
                                            return (
                                                <TouchableOpacity
                                                    key={type}
                                                    style={[
                                                        styles.tagButton,
                                                        isSelected && styles.tagButtonSelected,
                                                    ]}
                                                    onPress={() => setSelectedType(type)}
                                                    activeOpacity={0.8}
                                                >
                                                    <MaterialIcons
                                                        name={iconName}
                                                        size={20}
                                                        color={isSelected ? Colours.white : Colours.mediumGray}
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.tagText,
                                                            isSelected && styles.tagTextSelected,
                                                        ]}
                                                    >
                                                        {type}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>

                                <View style={{ marginTop: 10, gap: 10 }}>
                                    <Button title="Save Address" onPress={handleSaveAddress} />
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => {
                                            setIsSavingMode(false);
                                            bottomSheetRef.current?.collapse();
                                        }}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </SafeAreaView>
    )
}

export default AddMapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    myLocationButton: {
        position: 'absolute',
        bottom: 280,
        right: 16,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colours.white,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colours.Black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 5,
    },
    markerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 40,
    },
    pinContainer: {
        position: 'absolute',
        bottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinShadow: {
        width: 14,
        height: 4,
        borderRadius: 7,
        backgroundColor: Colours.Black,
        position: 'absolute',
        bottom: 10,
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomSheetContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    addressTitle: {
        fontSize: 18,
        fontFamily: Fonts.MontserrateRegular,
        color: Colours.Black,
    },
    addressText: {
        fontSize: 15,
        fontFamily: Fonts.MontserrateRegular,
        color: Colours.mediumGray,
        lineHeight: 22,
    },
    searchResultsContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: Colours.white,
        borderRadius: 10,
        maxHeight: 250,
        zIndex: 9999,

        shadowColor: Colours.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    searchResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: Colours.BoneWhite,
        gap: 10,
    },
    searchResultText: {
        fontSize: 14,
        color: Colours.charcoal,
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.Black,
        marginBottom: 6,
    },
    textInput: {
        height: 48,
        borderWidth: 1,
        borderColor: Colours.BoneWhite,
        backgroundColor: Colours.BoneWhite,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: Colours.Black,
        fontFamily: Fonts.MontserrateRegular,
    },
    tagContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
    },
    tagButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colours.BoneWhite,
        backgroundColor: Colours.white,
    },
    tagButtonSelected: {
        borderColor: Colours.btnColours,
        backgroundColor: Colours.btnColours,
    },
    tagText: {
        fontSize: 14,
        fontFamily: Fonts.MontserrateSemiBold,
        color: Colours.mediumGray,
    },
    tagTextSelected: {
        color: Colours.white,
    },
    cancelButton: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontFamily: Fonts.MontserrateSemiBold,
        fontSize: 15,
        color: Colours.mediumGray,
    },
});