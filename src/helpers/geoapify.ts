// api/geoapify.ts

import axios from "axios";
import { GEOAPIFY_API_KEY } from "../utility/contant";

export const searchPlaces = async (text: string) => {
    try {
        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/autocomplete",
            {
                params: {
                    text,
                    limit: 8,
                    apiKey: GEOAPIFY_API_KEY,
                },
            }
        );

        return response.data.features;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const reverseGeocode = async (
    latitude: number,
    longitude: number
) => {
    try {
        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/reverse",
            {
                params: {
                    lat: latitude,
                    lon: longitude,
                    apiKey: GEOAPIFY_API_KEY,
                },
            }
        );

        return response.data.features[0];
    } catch (error) {
        console.log("Reverse Geocode Error:", error);
        return null;
    }
};