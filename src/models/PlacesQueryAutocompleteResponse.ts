import { PlaceAutocompletePrediction } from "./PlaceAutocompletePrediction";
import { PlacesAutocompleteStatus } from "./PlacesAutocompleteStatus";

export type PlacesQueryAutocompleteResponse = {
    predictions: PlaceAutocompletePrediction[];
    status: PlacesAutocompleteStatus;
    error_message?: string;
    info_messages: string[];
};
