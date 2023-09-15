import React from 'react'
import Logo from "../images/logo.png"
import Profile from "../images/profile.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { closeProfile, openProfile } from "../features/profileSlice"
import ProfileMenu from './ProfileMenu';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const { user, isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();
    const isProfileOpen = useSelector((state) => state.profile)

    //     email
    // : 
    // "saikrishnadas666@gmail.com"
    // email_verified
    // : 
    // true
    // family_name
    // : 
    // "Krishnadas"
    // given_name
    // : 
    // "Sai"
    // locale
    // : 
    // "en"
    // name
    // : 
    // "Sai Krishnadas"
    // nickname
    // : 
    // "saikrishnadas666"
    // picture
    // : 
    // "https://lh3.googleusercontent.com/a/ACg8ocJIXbK8-YF7KnlMAwjQVr_TzzYfqMGtngSnxdEpyF6DkpfG=s96-c"
    // sub
    // : 
    // "google-oauth2|110359443485787622492"
    // updated_at
    // : 
    // "2023-09-14T05:17:38.880Z"

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

                {user ? <div className='nav-item'>
                    {user?.email}
                </div> : <div className='nav-item'>
                    Help
                </div>}

                {!isAuthenticated ? <div onClick={() => loginWithRedirect()}>Login</div> : <>
                    {isLoading && !error ? <div>Loading...</div> : <>
                        <div onClick={() => isProfileOpen === false ? dispatch(openProfile()) : dispatch(closeProfile())}>
                            <img src={user ? user?.picture : Profile} alt="Logo" className='profile-image' />
                        </div>
                        {isProfileOpen && <div className='profile-menu-container'>
                            <ProfileMenu user={user} />
                        </div>}
                    </>}

                </>}


            </div>
        </div>
    )
}

export default Navbar
