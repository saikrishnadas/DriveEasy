import { useState, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import "./MapBoxMap.css";
import MarkerLogo from "../../images/mine.png"
import SourceLogo from "../../images/source.png"
import DestLogo from "../../images/dest.png"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import MapBoxRoute from './MapBoxRoute';

export const BaseSearchURL = `https://api.mapbox.com/search/searchbox/v1/suggest`
export const GeoSearchURL = `https://api.mapbox.com/search/searchbox/v1/retrieve/`
export const DrivingURL = `https://api.mapbox.com/directions/v5/mapbox/driving/`

function MapBoxMap() {
    let windowHeight = window.innerHeight * 0.78;
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState();
    const sourceCoords = useSelector((state) => state.map.source)
    const destinationCoords = useSelector((state) => state.map.destination)
    const loadingCoords = useSelector((state) => state.map.loading)
    const route = useSelector((state) => state.map.route)

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
    }

    useEffect(() => {
        getUserLocation();
    }, [])

    // useEffect(() => {
    //     if (sourceCoords) {
    //         console.log("Calling flyTo");
    //         mapRef?.current?.getMap().flyTo({
    //             center: [sourceCoords.lng, sourceCoords.lat],
    //             zoom: 14,
    //             duration: 2500
    //         })
    //     }
    // }, [sourceCoords])

    return (
        <div className='mapbox-container' style={{ maxHeight: windowHeight }}>
            {loadingCoords ? <p>Loading...</p> : userLocation ? <Map
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: userLocation?.lng,
                    latitude: userLocation?.lat,
                    zoom: 6
                }}
                style={{ width: 900, height: 700 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom" >
                    <img src={MarkerLogo} className='marker-image' />
                </Marker>

                {sourceCoords && <Marker longitude={sourceCoords?.lng} latitude={sourceCoords?.lat} anchor="bottom" >
                    <img src={SourceLogo} className='marker-image' />
                </Marker>}
                {destinationCoords && <Marker longitude={destinationCoords?.lng} latitude={destinationCoords?.lat} anchor="bottom" >
                    <img src={DestLogo} className='marker-image-dest' />
                </Marker>}
                {route && (<MapBoxRoute coordinates={route} />)}
            </Map> : null
            }

        </div >
    )
}

export default MapBoxMap
