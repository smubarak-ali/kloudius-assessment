export enum PlacesActions {
    ADD_PLACE = 'ADD_PLACE',
    SELECT_PLACE = 'SELECT_PLACE'
}

export type AddPlaceAction = {
    type: PlacesActions.ADD_PLACE;
    payload: unknown[];
};

export type SetSelectedPlaceAction = {
    type: PlacesActions.SELECT_PLACE;
    payload?: unknown;
};

export type PlacesActionsType = AddPlaceAction | SetSelectedPlaceAction;
