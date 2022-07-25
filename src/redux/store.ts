import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import  characterReducer  from "./reducer";
import { breakingBadApi } from './services/breakingBadApi';

export const store = configureStore({
    reducer:{
        characterReducer,
        [breakingBadApi.reducerPath]: breakingBadApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(breakingBadApi.middleware) 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
