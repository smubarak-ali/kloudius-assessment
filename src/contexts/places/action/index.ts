import { GooglePlaces } from "../../../utils/model/GooglePlaces";

export enum PlacesActions {
    ADD_PLACE = 'ADD_PLACE',
    SELECT_PLACE = 'SELECT_PLACE'
}

export type AddPlaceAction = {
    type: PlacesActions.ADD_PLACE;
    payload: GooglePlaces;
};

export type SetSelectedPlaceAction = {
    type: PlacesActions.SELECT_PLACE;
    payload?: GooglePlaces;
};

export type PlacesActionsType = AddPlaceAction | SetSelectedPlaceAction;
