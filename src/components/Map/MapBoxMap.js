import { useState, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl';
import "./MapBoxMap.css";
import MarkerLogo from "../../images/apple-pay.png"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';

function MapBoxMap() {
    // let windowWidth = window.innerWidth * 0.52;
    const [userLocation, setUserLocation] = useState();
    const sourceCoords = useSelector((state) => state.map.source)
    const destinationCoords = useSelector((state) => state.map.destination)

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
    }

    useEffect(() => {
        getUserLocation();
    }, [])

    return (
        <div className='mapbox-container'>
            {userLocation ? <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: userLocation?.lng,
                    latitude: userLocation?.lat,
                    zoom: 14
                }}
                style={{ width: 900, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom" >
                    <img src={MarkerLogo} className='marker-image' />
                </Marker>
                {sourceCoords && <Marker longitude={sourceCoords?.lng} latitude={sourceCoords?.lat} anchor="bottom" >
                    <img src={MarkerLogo} className='marker-image' />
                </Marker>}

                {destinationCoords && <Marker longitude={destinationCoords?.lng} latitude={destinationCoords?.lat} anchor="bottom" >
                    <img src={MarkerLogo} className='marker-image' />
                </Marker>}
            </Map> : null}

        </div>
    )
}

export default MapBoxMap
