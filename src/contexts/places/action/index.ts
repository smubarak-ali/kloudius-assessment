import { GooglePlaces } from "../../../utils/model/GooglePlaces";
import { PlacesState } from "../reducer";

export enum PlacesActions {
    LOAD_STATE = 'LOAD_STATE',
    ADD_PLACE = 'ADD_PLACE',
    SELECT_PLACE = 'SELECT_PLACE'
}

export type LoadStateAction = { 
    type: PlacesActions.LOAD_STATE, 
    payload: PlacesState
};

export type AddPlaceAction = {
    type: PlacesActions.ADD_PLACE;
    payload: GooglePlaces;
};

export type SetSelectedPlaceAction = {
    type: PlacesActions.SELECT_PLACE;
    payload?: GooglePlaces;
};

export type PlacesActionsType = LoadStateAction | AddPlaceAction | SetSelectedPlaceAction;
