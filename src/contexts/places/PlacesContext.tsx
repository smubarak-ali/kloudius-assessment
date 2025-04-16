import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlacesActions, PlacesActionsType } from './action';
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

    useEffect(() => {
        // console.log('useEffect() PlacesProvider :: state: ', state);
        async function loadState() {
            const storageData = await AsyncStorage.getItem("app_state");
            if (storageData) {
                const data: PlacesState = JSON.parse(storageData);
                dispatch({ type: PlacesActions.LOAD_STATE, payload: data});
            }
        }

        loadState();
    }, []);

    useEffect(() => {
        // console.log('useEffect(state) PlacesProvider :: state: ', state);
        async function saveState() {
            const storageData = JSON.stringify(state);
            await AsyncStorage.setItem("app_state", storageData);
        }

        saveState();
    }, [state]);

    return <PlacesContext.Provider value={{ state, dispatch }}>{children}</PlacesContext.Provider>;
};

export default PlacesProvider;
