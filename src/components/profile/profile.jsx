import s from './profile.module.css'
import React from 'react';

import ProfileInfo from './profileInfo/profileInfo';
import MyPostContainer from './myPosts/myPostContainer';


const Profile = () => {
    
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPostContainer />
        </div>
    )
}

export default Profile;