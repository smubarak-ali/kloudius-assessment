import { GooglePlaces } from "../../../utils/model/GooglePlaces";
import { PlacesActions, PlacesActionsType } from "../action";

export type PlacesState = {
    places: GooglePlaces[];
    selectedPlace?: GooglePlaces;
};

function placesReducer(state: PlacesState, action: PlacesActionsType) {
    switch (action.type) {
        case PlacesActions.ADD_PLACE:
            if (state.places.some(val => val.place_id === action.payload.place_id)) {
                return {
                    ...state,
                    selectedPlace: action.payload
                }
            }
            
            return {
                ...state,
                places: [...state.places, action.payload],
                selectedPlace: action.payload,
            };

        case PlacesActions.SELECT_PLACE:
            return {
                ...state,
                selectedPlace: action.payload ? action.payload : undefined,
            }

        default:
            return state;
    }
}

export default placesReducer;