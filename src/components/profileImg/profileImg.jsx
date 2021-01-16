import React from 'react';
import AvatarProfile from '../profile/avatar/avatar';

import s from './profileImg.module.css';

const ProfileImg = () => {
    return (
        <div className={s.profileImg}>
            <AvatarProfile />
            <div className={s.panel}>
            </div>
            <img src="https://490837.smushcdn.com/1583037/wp-content/uploads/2020/01/MOUNTAIN_header.jpg?lossy=1&strip=1&webp=1" alt="img" />
        </div>
    )
}

export default ProfileImg;