import React from 'react'
import "./ProfileMenu.css"

function ProfileMenu({ user }) {
    console.log(user)
    return (
        <div className='profile-menu'>
            <div className='profile-items'>Trip History</div>
            <div className='profile-items'>Wallet</div>
            <div className='profile-items'>Promotions</div>
            <div className='profile-items'>Support Messages</div>
            <div className='profile-items'>Manage Accounts</div>
            <div className='profile-items'>Settings</div>
            <div className='profile-items'>Help</div>
        </div>
    )
}

export default ProfileMenu
