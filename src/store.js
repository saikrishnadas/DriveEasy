import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./features/profileSlice";

const store = configureStore({
    reducer: {
        profile: profileSlice
    }
})

export default store;