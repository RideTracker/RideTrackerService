import { GeocodingAddressComponent } from "./GeocodingAddressComponent";
import { GeocodingStatus } from "./GeocodingStatus";

export type PlacesGeocodingResponse = {
    status: GeocodingStatus;
    error_message?: string;
    results: {
        address_components: GeocodingAddressComponent[];
        formatted_address: string;
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
            location_type: "ROOFTOP" | "RANGE_INTERPOLATED" | "GEOMETRIC_CENTER" | "APPROXIMATE";
            place_id: string;
            plus_code: {
                compound_code: string;
                global_code: string;
            };
            types: string[];
        }
    }[];
};
