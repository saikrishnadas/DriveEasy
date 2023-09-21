import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import { GeoSearchURL, DrivingURL } from "../components/Map/MapBoxMap";

type Coordinates = {
    lat: string,
    lng: string
}
type getCoordsPayload = {
    mapbox_id :string;
    type:'source' | 'dest';
}

type GetDrivingRoutePayload = {
    sourceCoords: Coordinates;
    destinationCoords: Coordinates
}

type MapState = {
    source: Coordinates | null; 
    destination: Coordinates | null; 
    loading: boolean; 
    error: boolean; 
    distance: number;
    route: any
}

interface GetCoordsPayload {
    coords: Coordinates;
    type: 'source' | 'dest';
  }

export const getCoords = createAsyncThunk(
    'map/getCoords',
    async ({ mapbox_id, type }:getCoordsPayload, { rejectWithValue }) => {
        try {
        const response = await fetch(GeoSearchURL + `${mapbox_id}?session_token=${process.env.REACT_APP_MAPBOX_SESSION_TOKEN}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
            { headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        console.log("DATA", data)
        const latCoord = data?.features[0]?.geometry?.coordinates[1]
        const lngCoord = data?.features[0]?.geometry?.coordinates[0]
        const coords:Coordinates = { lat: latCoord, lng: lngCoord }
        return { coords: coords, type: type };
        } catch(error:any){
            return rejectWithValue(error?.message);
        }
    }
)

export const getDrivingRoute = createAsyncThunk(
    'map/getDrivingRoute',
    async ({ sourceCoords, destinationCoords }:GetDrivingRoutePayload, { rejectWithValue }) => {
        try{

            const response = await fetch(DrivingURL + `${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
                { headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            console.log("DRIVING", data)
            if (data.routes) {
                return data;
            }
            return "noCabFoundError";
        }catch(error:any){
            return rejectWithValue(error?.message);
        }
    }
)


const mapSlice = createSlice({
    name: 'map',
    initialState: { source: null, destination: null, loading: false, error: false, distance: 0, route: null } as MapState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoords.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCoords.fulfilled, (state, action: PayloadAction<GetCoordsPayload>) => {
                if (action.payload.type === 'source') {
                    state.source = action.payload.coords;
                }
                if (action.payload.type === 'dest') {
                    state.destination = action.payload.coords;
                }
                state.loading = false;
            })
            .addCase(getCoords.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getDrivingRoute.fulfilled, (state, action: PayloadAction<any>) => {
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