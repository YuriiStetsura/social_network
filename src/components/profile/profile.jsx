import s from './profile.module.css'
import React from 'react';

import ProfileInfo from './profileInfo/profileInfo';
import MyPostContainer from './myPosts/myPostContainer';


const Profile = (props) => {
    
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPostContainer store={props.store} />
        </div>
    )
}

export default Profile;