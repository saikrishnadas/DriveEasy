import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./features/mapSlice";
import profileSlice from "./features/profileSlice";

const store = configureStore({
    reducer: {
        profile: profileSlice,
        map: mapSlice
    }
})

export default store;