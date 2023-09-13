import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name: 'map',
    initialState: { source: null, destination: null },
    reducers: {
        setSourceCoords: (state, action) => {
            state.source = action.payload
        },
        setDestCoords: (state, action) => {
            state.destination = action.payload
        }
    }
});

export const { setSourceCoords, setDestCoords } = mapSlice.actions;
export default mapSlice.reducer;