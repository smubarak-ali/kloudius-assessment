import { createContext, PropsWithChildren, useReducer } from 'react';
import { PlacesActionsType } from './action';
import placesReducer, { PlacesState } from './reducer';

type PlacesContextType = {
    state: PlacesState;
    dispatch: React.Dispatch<PlacesActionsType>;
};

const initialState: PlacesState = {
    places: [],
};

export const PlacesContext = createContext<PlacesContextType>({} as PlacesContextType);

const PlacesProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(placesReducer, initialState);

    return <PlacesContext.Provider value={{ state, dispatch }}>{children}</PlacesContext.Provider>;
};

export default PlacesProvider;
