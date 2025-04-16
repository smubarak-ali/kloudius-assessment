export interface GooglePlacesAutocompleteResponse {
    predictions: GooglePlaces[];
}

export interface GooglePlaces {
    description: string;
    matched_substrings: MatchedSubstring[];
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
    terms: Term[];
    types: string[];
    details?: GooglePlaceDetails;
}

interface MatchedSubstring {
    length: string;
    offset: string;
}

interface StructuredFormatting {
    main_text: string;
    main_text_matched_substrings: MatchedSubstring[];
    secondary_text: string;
}

interface Term {
    offset: string;
    value: string;
}

export interface GooglePlaceDetails {

    location: { lat: number, lng: number };
    viewport: {
        northeast: { lat: number, lng: number };
        southwest: { lat: number, lng: number };
    }

}