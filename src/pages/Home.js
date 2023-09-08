import React from 'react'
import Booking from '../components/Booking'
import MapBoxMap from '../components/Map/MapBoxMap'
import "./Home.css"

export default function Home() {
    return (
        <div className='home-container'>
            <Booking />
            <MapBoxMap />
        </div>
    )
}
