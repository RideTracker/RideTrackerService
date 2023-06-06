import { PlaceAutocompleteMatchedSubstring } from "./PlaceAutocompleteMatchedSubstring";
import { PlaceAutocompleteStructuredFormat } from "./PlaceAutocompleteStructuredFormat";
import { PlaceAutocompleteTerm } from "./PlaceAutocompleteTerm";

export type PlaceAutocompletePrediction = {
    description: string;
    matched_substrings: PlaceAutocompleteMatchedSubstring[];
    structured_formatting: PlaceAutocompleteStructuredFormat;
    terms: PlaceAutocompleteTerm[];
    distance_meters: number;
    place_id: string;
    types: string[];
};
