import { PlacesActions, PlacesActionsType } from "../action";

export type PlacesState = {
    places: unknown[];
    selectedPlace?: unknown;
};

function placesReducer(state: PlacesState, action: PlacesActionsType) {
    switch (action.type) {
        case PlacesActions.ADD_PLACE:
            // Return a new state with the characters array updated
            return {
                ...state,
                characters: action.payload,
            };

        case PlacesActions.SELECT_PLACE: {
        }

        default:
            return state;
    }
}

export default placesReducer;