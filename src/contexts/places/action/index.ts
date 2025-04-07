export enum PlacesActions {
    ADD_PLACE = 'ADD_PLACE',
    SELECT_PLACE = 'SELECT_PLACE'
}

// Define type for each action type to enforce type safety
export type AddPlaceAction = {
    type: PlacesActions.ADD_PLACE;
    payload: unknown[];
};

export type SetSelectedPlaceAction = {
    type: PlacesActions.SELECT_PLACE;
    payload: unknown;
};

// Define a union type Actions to represent all possible action types
export type PlacesActionsType = AddPlaceAction | SetSelectedPlaceAction;
