import { PlaceAutocompleteMatchedSubstring } from "./PlaceAutocompleteMatchedSubstring";

export type PlaceAutocompleteStructuredFormat  = {
    main_text: string;
    main_text_matched_substrings: PlaceAutocompleteMatchedSubstring[];
    secondary_text?: string;
    secondary_text_matched_substrings?: PlaceAutocompleteMatchedSubstring[];
};
