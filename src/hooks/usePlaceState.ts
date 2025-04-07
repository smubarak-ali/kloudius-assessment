import { useContext } from "react";

import { PlacesContext } from "../contexts/places/PlacesContext"

const usePlaceState = () => {
    return useContext(PlacesContext);
}

export { usePlaceState };
