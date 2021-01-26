import React from 'react';
import './profileInfo.module.css';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';
import { Descriptions } from 'antd';
import s from './profileInfo.module.css';

const ProfileInfo = (props) => {
    
    if(!props.profileUser) {
        return <Skeleton active />
    } 

    return (
        <div className={s.userInfo}>
            <div className={s.profileAvatar}>
                <Avatar size={150} src={props.profileUser.photos.large} />
            </div>
            <Descriptions title={props.profileUser.fullName}>
                <Descriptions.Item label="UserName">{props.profileUser.fullName}</Descriptions.Item>
                <Descriptions.Item label="Telephone">123455</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
    
}

export default ProfileInfo;