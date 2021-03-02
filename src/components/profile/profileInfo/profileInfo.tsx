import React, { useState } from 'react';
import './profileInfo.module.css';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';
import s from './profileInfo.module.css';
import ProfileStatusWithHook from './profileStatusWithHook';
import { Button } from 'antd';
import FormProfileInfoDataRedux from './FormProfileInfoData'
import { profileUserType } from '../../../redux/profile-reducer'

type ProfileInfoPropsType = {
    profileUser: profileUserType 
    status: string
    updateStatusUserThunk: (status: string) => void
    owner: boolean
    setProfileAvatarThunk: (photoFile: any) => void
    updateProfileInfoThunk: (profileData: profileUserType) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    const uploadImg = (event: any) => {
        if(event.target.files.length) {
            props.setProfileAvatarThunk(event.target.files[0]);
        }  
    }
    
    if(!props.profileUser) {
        return <Skeleton active />
    } 

    const onUpdateProfileInfo = (formData: profileUserType) => {
        props.updateProfileInfoThunk(formData)
            .then(() => {
                setEditMode(false);
            });
    }

    return (
        <div className={s.userInfo}>
            <div className={s.profileAvatar}>
                <Avatar size={150} src={props.profileUser.photos.large} />
            </div>

            {!props.owner
                ? <div className={s.uploadInput}>
                    <input type="file" name="upload" onChange={uploadImg}/>
                  </div>
                : undefined} 

            <div className={s.profile}>
                {editMode 
                    ?   <FormProfileInfoDataRedux    contacts={props.profileUser.contacts}
                                                onSubmit={onUpdateProfileInfo}
                                                initialValues={props.profileUser}
                        />
                    :   <ProfileInfoData    profileUser={props.profileUser} 
                                            owner={props.owner} 
                                            onFormProfileData={ () => setEditMode(true) }                   
                        /> }
                <b>Status: </b>
                <ProfileStatusWithHook  status={props.status}
                                        updateStatusUserThunk={props.updateStatusUserThunk}/> 
            </div>   
        </div>
    )  
}
type ProfileInfoDataPropsType = {
    profileUser: profileUserType
    owner: boolean
    onFormProfileData: () => void
}
const ProfileInfoData: React.FC<ProfileInfoDataPropsType> = (props) => {
    const contacts = Object.entries(props.profileUser.contacts);
  
    return (
        <>
        <h1>{props.profileUser.fullName}</h1>
        <div>
            <b>AboutMe: </b>{props.profileUser.aboutMe ? props.profileUser.aboutMe : "empty"}
        </div> 
        <div>
            <b>Looking for a job: </b>{props.profileUser.lookingForAJob ? "yes" : "no"}
        </div> 
        <div>
            <b>Soft skills: </b>{props.profileUser.lookingForAJobDescription ? props.profileUser.lookingForAJobDescription : "empty"}
        </div>
        <div>
            <b>Contacts: </b>
            <div>
                {contacts
                .filter(elem => elem[1])
                .map(elem => {
                    return  <div key={elem[0]} className={s.contact}>
                                {elem[0]} : {elem[1]} 
                            </div>})
                }
            </div>
        </div>
        <div>
            {!props.owner 
                ? <div> <Button type="primary" ghost onClick={props.onFormProfileData}>Edit</Button></div> 
                : undefined}
        </div>
        </>
    )
}


export default ProfileInfo;