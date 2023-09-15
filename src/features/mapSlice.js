import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GeoSearchURL, DrivingURL } from "../components/Map/MapBoxMap";

export const getCoords = createAsyncThunk(
    'map/getCoords',
    async ({ mapbox_id, type }) => {
        const response = await fetch(GeoSearchURL + `${mapbox_id}?session_token=${process.env.REACT_APP_MAPBOX_SESSION_TOKEN}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
            { headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        console.log("DATA", data)
        const latCoord = data?.features[0]?.geometry?.coordinates[1]
        const lngCoord = data?.features[0]?.geometry?.coordinates[0]
        const coords = { lat: latCoord, lng: lngCoord }
        return { coords: coords, type: type };
    }
)

export const getDrivingRoute = createAsyncThunk(
    'map/getDrivingRoute',
    async ({ sourceCoords, destinationCoords }) => {
        const response = await fetch(DrivingURL + `${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
            { headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        console.log("DRIVING", data)
        if (data.routes) {
            return data;
        }
        return "noCabFoundError";
    }
)


const mapSlice = createSlice({
    name: 'map',
    initialState: { source: null, destination: null, loading: false, error: false, distance: 0, route: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoords.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCoords.fulfilled, (state, action) => {
                if (action.payload.type === 'source') {
                    state.source = action.payload.coords;
                }
                if (action.payload.type === 'dest') {
                    state.destination = action.payload.coords;
                }
                state.loading = false;
            })
            .addCase(getCoords.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(getDrivingRoute.fulfilled, (state, action) => {
                if (action.payload === "noCabFoundError") {
                    state.error = true;
                    state.distance = 0;
                } else {
                    state.error = false;
                    state.distance = action.payload?.routes[0]?.distance;
                    state.route = action.payload?.routes[0];
                }

            })
    }
});

export default mapSlice.reducer;