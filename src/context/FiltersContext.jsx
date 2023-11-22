import { useReducer } from "react";
import { createContext } from "react";
import { filtersReducer } from "../reducers/filtersReducer";
import { useMemo } from "react";


export const FiltersContext = createContext();

export const FiltersProvider = ({children}) => {


    const [state, dispatch] = useReducer(filtersReducer, {
        category: 'all',
        minPrice: 0
    })

    const memoDispatch = useMemo(() => dispatch, []);

    const contextValue = {state, dispatch: memoDispatch}

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    )
}