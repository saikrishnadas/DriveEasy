import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: false,
    reducers: {
        openProfile: (state) => {
            return true
        },
        closeProfile: (state) => {
            return false
        }
    }
});

export const { openProfile, closeProfile } = profileSlice.actions;
export default profileSlice.reducer;