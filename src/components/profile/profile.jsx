import s from './profile.module.css'
import React from 'react';

import MyPost from './myPosts/myPost';
import ProfileInfo from './profileInfo/profileInfo';


const Profile = (props) => {
    
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPost posts={props.state.posts}
                    addPost={props.addPost}/>
        </div>
    )
}

export default Profile;