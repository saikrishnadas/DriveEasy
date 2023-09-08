import React from 'react'
import Logo from "../images/logo.png"
import Profile from "../images/profile.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { closeProfile, openProfile } from "../features/profileSlice"
import ProfileMenu from './ProfileMenu';

function Navbar() {
    const dispatch = useDispatch();
    const isProfileOpen = useSelector((state) => state.profile)

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
                <div onClick={() => isProfileOpen === false ? dispatch(openProfile()) : dispatch(closeProfile())}>
                    <img src={Profile} alt="Logo" className='profile-image' />
                </div>
                {isProfileOpen && <div className='profile-menu-container'>
                    <ProfileMenu />
                </div>}

            </div>
        </div>
    )
}

export default Navbar
