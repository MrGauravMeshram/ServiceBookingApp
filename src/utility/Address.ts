export interface Address {

    id: string;

    title: "Home" | "Work" | "Other";

    address: string;

    latitude: number;

    longitude: number;

    houseNumber: string;

    landmark?: string;

}