import React from 'react';

import s from './avatar.module.css'

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const AvatarProfile = () => {
    return (
        <div className={s.avatar}>
            <Avatar className={s.big} size={160} style={{ backgroundColor: 'white' }}/>
            <Avatar className={s.small} size={140} icon={<UserOutlined />} />
        </div>
    )
}

export default AvatarProfile;