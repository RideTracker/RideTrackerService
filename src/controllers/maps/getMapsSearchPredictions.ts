import { PlacesQueryAutocompleteResponse } from "../../models/PlacesQueryAutocompleteResponse";

export async function getMapsSearchPredictions(env: Env, search: string): Promise<PlacesQueryAutocompleteResponse> {
    const url = new URL("https://maps.googleapis.com/maps/api/place/queryautocomplete/json");
    url.searchParams.append("key", env.GOOGLE_MAPS_API_TOKEN);
    url.searchParams.append("input", search);
    url.searchParams.append("language", "en");

    const response = await fetch(url, {
        method: "GET"
    });

    const result = await response.json<PlacesQueryAutocompleteResponse>();

    return result;
};
