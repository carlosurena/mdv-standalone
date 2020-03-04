import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import peopleReducer from "../components/people/peopleSlice";

const store = configureStore({
    reducer:{
        people: peopleReducer 
    },
    middleware: getDefaultMiddleware(),
    devTools: true
});

export default store