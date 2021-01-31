import React from 'react';
import './profileInfo.module.css';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';
import s from './profileInfo.module.css';
import ProfileStatus from './profileStatus';

const ProfileInfo = (props) => {
    
    if(!props.profileUser) {
        return <Skeleton active />
    } 
    
    return (
        <div className={s.userInfo}>
            <div className={s.profileAvatar}>
                <Avatar size={150} src={props.profileUser.photos.large} />
            </div>
            <div>
                <h1>{props.profileUser.fullName}</h1>
                <ProfileStatus status={props.status}
                               updateStatusUserThunk={props.updateStatusUserThunk}/>
            </div>
            
        </div>
    )
    
}

export default ProfileInfo;