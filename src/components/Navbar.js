import React from 'react'
import Logo from "../images/logo.png"
import Profile from "../images/profile.png";
import "./Navbar.css";

function Navbar() {
    return (
        <div className='nav-container'>
            <div className='left--container'>
                <div>
                    <img src={Logo} alt="Logo" className='logo-image' />
                </div>
                <div>
                    <div className='nav-item'>
                        Home
                    </div>
                </div>
            </div>
            <div className='right--container'>
                <div className='nav-item'>
                    Help
                </div>
                <div>
                    <img src={Profile} alt="Logo" className='profile-image' />
                </div>
            </div>
        </div>
    )
}

export default Navbar
