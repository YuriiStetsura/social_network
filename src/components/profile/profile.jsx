import s from './profile.module.css'
import React from 'react';

import MyPost from './myPosts/myPost';
import ProfileInfo from './profileInfo/profileInfo';


const Profile = () => {
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPost />
        </div>
    )
}

export default Profile;