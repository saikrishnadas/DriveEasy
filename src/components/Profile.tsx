import React from 'react'
import "./Profile.css"
import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    return (
        <div className='trips-container'>
            <div className='my-menu'>
                <div className={location.pathname === '/ride-now' ? 'menu-item-selected' : 'menu-item'}>
                    Ride Now
                </div>
                <div className={location.pathname === '/trip-history' ? 'menu-item-selected' : 'menu-item'}>
                    Trip History
                </div>
                <div className={location.pathname === '/wallet' ? 'menu-item-selected' : 'menu-item'}>
                    Wallet
                </div>
                <div className={location.pathname === '/settings' ? 'menu-item-selected' : 'menu-item'}>
                    Profile Settings
                </div>
            </div>
            <div className='settings'>
                <div>
                    Location
                </div>
                <select>
                    <option value="IN">India</option>
                    <option value="US">United States of America</option>
                    <option value="UK">United Kingdom</option>
                </select>

                <div>
                    Language
                </div>
                <select>
                    <option value="ENG">English(UK)</option>
                </select>
                <div className='button-save'>Save</div>
            </div>
            <div>
                <div>Get a Ride in minutes</div>
            </div>
        </div>
    )
}

export default Profile
