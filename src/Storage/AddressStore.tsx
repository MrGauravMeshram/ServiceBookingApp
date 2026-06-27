import AsyncStorage from "@react-native-async-storage/async-storage";

const ADDRESS_KEY = "ADDRESS_DATA";

export const saveStorage = async (data: any) => {

    await AsyncStorage.setItem(

        ADDRESS_KEY,

        JSON.stringify(data)

    );

};

export const getStorage = async () => {

    const data = await AsyncStorage.getItem(ADDRESS_KEY);

    return data ? JSON.parse(data) : null;

};

export const clearStorage = async () => {

    await AsyncStorage.removeItem(ADDRESS_KEY);

};