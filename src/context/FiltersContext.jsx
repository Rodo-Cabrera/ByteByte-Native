import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { filtersReducer } from "../reducers/filtersReducer";
import { useMemo } from "react";


const SET_CATEGORY = 'SET_CATEGORY';
const SET_MIN_PRICE = 'SET_MIN_PRICE';




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