import { PlacesGeocodingResponse } from "../../models/PlacesGeocodingResponse";

export async function getPlaceGeocoding(key: string, placeId: string) {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.append("key", key);
    url.searchParams.append("place_id", placeId);
    url.searchParams.append("language", "en");

    const response = await fetch(url);
    
    return await response.json<PlacesGeocodingResponse>();
};
