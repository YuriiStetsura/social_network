import s from './profile.module.css'
import React from 'react';
import ProfileInfo from './profileInfo/profileInfo';
import MyPostContainer from './myPosts/myPostContainer';
import { profileUserType } from '../../redux/profile-reducer'


type PropsType = {
    profileUser: profileUserType 
    status: string
    updateStatusUserThunk: (status: string) => void
    owner: boolean
    setProfileAvatarThunk: (photoFile: File) => void
    updateProfileInfoThunk: (profileData: profileUserType) => Promise<any>
}

const Profile: React.FC<PropsType>= ({profileUser, status, updateStatusUserThunk, owner, setProfileAvatarThunk, updateProfileInfoThunk}) => {

    return (
        <div className={s.profile}>
            <ProfileInfo profileUser={profileUser} 
                         status={status}
                         updateStatusUserThunk={updateStatusUserThunk}
                         owner={owner}
                         setProfileAvatarThunk={setProfileAvatarThunk}
                         updateProfileInfoThunk={updateProfileInfoThunk}
            />            
            <MyPostContainer />
        </div>
    )
}

export default Profile;