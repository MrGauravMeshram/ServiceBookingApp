import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../utility/Address";

interface AddressState {

    selectedLocation: Address | null;

    recentLocations: Address[];

    savedAddresses: Address[];

}

const initialState: AddressState = {

    selectedLocation: null,

    recentLocations: [],

    savedAddresses: [],

};

const addressSlice = createSlice({

    name: "address",

    initialState,

    reducers: {

        setSelectedLocation: (state, action: PayloadAction<Address>) => {

            state.selectedLocation = action.payload;

        },

        addRecentLocation: (state, action: PayloadAction<Address>) => {

            const exists = state.recentLocations.find(

                item => item.id === action.payload.id
            );

            if (!exists) {

                state.recentLocations.unshift(action.payload);

            }

        },

        saveAddress: (state, action: PayloadAction<Address>) => {

            state.savedAddresses.push(action.payload);

        },

        deleteAddress: (state, action: PayloadAction<string>) => {

            state.savedAddresses = state.savedAddresses.filter(

                item => item.id !== action.payload

            );

        },

        loadSavedData: (state, action: PayloadAction<AddressState>) => {

            state.selectedLocation = action.payload.selectedLocation;

            state.savedAddresses = action.payload.savedAddresses;

            state.recentLocations = action.payload.recentLocations;

        }

    }

});

export const {

    setSelectedLocation,

    addRecentLocation,

    saveAddress,

    deleteAddress,

    loadSavedData

} = addressSlice.actions;

export default addressSlice.reducer;