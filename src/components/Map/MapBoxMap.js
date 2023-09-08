import React from 'react'
import Map from 'react-map-gl';
import "./MapBoxMap.css";

function MapBoxMap() {
    // let windowWidth = window.innerWidth * 0.52;
    return (
        <div className='mapbox-container'>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: 900, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </div>
    )
}

export default MapBoxMap
