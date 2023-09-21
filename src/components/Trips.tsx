import React from 'react'
import "./Trips.css";
import { useLocation, useNavigate } from "react-router-dom";

function Trips() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='trips-container'>
            <div className='my-menu'>
                <div onClick={() => navigate("/")} className={location.pathname === '/ride-now' ? 'menu-item-selected' : 'menu-item'}>
                    Ride Now
                </div>
                <div className={location.pathname === '/trip-history' ? 'menu-item-selected' : 'menu-item'}>
                    Trip History
                </div>
                <div className={location.pathname === '/wallet' ? 'menu-item-selected' : 'menu-item'}>
                    Wallet
                </div>
                <div onClick={() => navigate("/settings")} className={location.pathname === '/settings' ? 'menu-item-selected' : 'menu-item'}>
                    Profile Settings
                </div>
            </div>
            <div className='trip-history'>
                <div>Trip History</div>
                <div className='trip-box'>
                    <div>1.</div>
                    <div>
                        <div>Source: Somekjndksjfnans</div>
                        <div>Destination: Somekjndksjfnans</div>
                    </div>
                    <div>
                        <div>selected car: Economy</div>
                        <div>Cost: INR 200</div>
                    </div>
                </div>
                <div className='trip-box'>
                    <div>2.</div>
                    <div>
                        <div>Source: Somekjndksjfnans</div>
                        <div>Destination: Somekjndksjfnans</div>
                    </div>
                    <div>
                        <div>selected car: Economy</div>
                        <div>Cost: INR 200</div>
                    </div>
                </div>

            </div>
            <div>
                <div>Get a Ride in minutes</div>
            </div>
        </div >
    )
}

export default Trips
