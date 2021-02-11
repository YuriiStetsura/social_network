import s from './profile.module.css'
import React from 'react';

import ProfileInfo from './profileInfo/profileInfo';
import MyPostContainer from './myPosts/myPostContainer';



const Profile = (props) => {

    return (
        <div className={s.profile}>
            <ProfileInfo profileUser={props.profileUser} 
                         status={props.status}
                         updateStatusUserThunk={props.updateStatusUserThunk}
                         owner={props.owner}
                         setProfileAvatarThunk={props.setProfileAvatarThunk}
                         updateProfileInfoThunk={props.updateProfileInfoThunk}
            />            
            <MyPostContainer />
        </div>
    )
}

export default Profile;