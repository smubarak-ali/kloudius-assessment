import { PlacesActions, PlacesActionsType } from "../action";

export type PlacesState = {
    places: unknown[];
    selectedPlace?: unknown;
};

function placesReducer(state: PlacesState, action: PlacesActionsType) {
    switch (action.type) {
        case PlacesActions.ADD_PLACE:
            return {
                ...state,
                places: action.payload,
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